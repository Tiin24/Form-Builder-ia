"use client";

import FormUi from "@/app/edit-form/_components/FormUi";
import { db } from "@/db";
import { JsonForms } from "@/db/schema";
import { Form } from "@/types";
import { and, eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback, use } from "react";

export default function AiFormPage({
  params,
}: {
  params: Promise<{ formId: string }>;
}) {
  const actualParams = use(params);
  const [jsonForms, setJsonForms] = useState<Form | undefined>();
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [selectedBackground, setSelectedBackground] = useState("");
  const [selectedStyle, setSelectedStyle] = useState<
    { key: string; value: string } | undefined
  >();

  const GetFormData = useCallback(async () => {
    if (!actualParams?.formId) return;

    try {
      const result = await db
        .select()
        .from(JsonForms)
        .where(and(eq(JsonForms.id, actualParams.formId)));

      if (result.length > 0) {
        const formData = JSON.parse(result[0]?.jsonform || "[]")[0];

        setJsonForms(formData);
        setSelectedTheme(result[0]?.theme || "light");
        setSelectedBackground(result[0]?.background || "");
        setSelectedStyle(
          result[0]?.style ? JSON.parse(result[0].style) : undefined
        );
      }
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  }, [actualParams?.formId]);

  useEffect(() => {
    if (actualParams?.formId) {
      GetFormData();
    }
  }, [GetFormData, actualParams]);

  return (
    <div
      className="p-10 flex justify-center items-center min-h-screen"
      style={{ backgroundImage: selectedBackground }}
    >
      {jsonForms ? (
        <FormUi
          jsonForm={jsonForms}
          onFieldUpdate={(index, updatedField) =>
            console.log("Field updated:", index, updatedField)
          }
          deleteField={(index) => console.log("Field deleted:", index)}
          selectedTheme={selectedTheme}
          selectedStyle={selectedStyle}
          formId={actualParams.formId}
          editable={false}
        />
      ) : (
        <p className="text-gray-500">Cargando formulario...</p>
      )}

      <Link
        className="flex gap-2 items-center bg-black text-white px-3 py-1 rounded-full fixed bottom-5 left-5 cursor-pointer"
        href={"/"}
      >
        <Image src={"/logo.png"} width={26} height={26} alt="Logo" />
        Build your Own AI Form
      </Link>
    </div>
  );
}
