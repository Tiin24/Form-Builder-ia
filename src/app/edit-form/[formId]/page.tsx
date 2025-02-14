"use client";
import { db } from "@/db";
import { JsonForms } from "@/db/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { ArrowLeft, Share2, SquareArrowOutUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { use, useCallback, useEffect, useState } from "react";
import FormUi from "../_components/FormUi";
import { Field, Form } from "@/types";
import { useToast } from "@/hooks/use-toast";
import Controller from "../_components/Controller";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function EditForm({ params }: { params: Promise<{ formId: string }> }) {
  const { toast } = useToast();

  const { user } = useUser();
  const actualParams = use(params);
  const router = useRouter();
  const [jsonForms, setJsonForms] = useState<Form | undefined>();
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [selectedBackground, setSelectedBackground] = useState("");
  const [selectedStyle, setSelectedStyle] = useState<{
    key: string;
    value: string;
  }>();

  const GetFormData = useCallback(async () => {
    if (!user || !actualParams?.formId) {
      return;
    }

    try {
      const result = await db
        .select()
        .from(JsonForms)
        .where(
          and(
            eq(JsonForms.id, actualParams.formId),
            eq(
              JsonForms.createdBy,
              user.primaryEmailAddress?.emailAddress || ""
            )
          )
        );
      setJsonForms(JSON.parse(result[0].jsonform)[0]);
      setSelectedTheme(result[0].theme || "");
      setSelectedBackground(result[0].background || "");
      setSelectedStyle(JSON.parse(result[0].style || ""));
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  }, [user, actualParams?.formId]);

  const handleFieldUpdate = (index: number, updatedField: Field) => {
    if (!jsonForms) return;

    const updatedFields = [...jsonForms.fields];
    updatedFields[index] = updatedField;

    setJsonForms({
      ...jsonForms,
      fields: updatedFields,
    });
    toast({ description: "Updated!!!" });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateJsonFormInDB = async () => {
    if (!user || !actualParams?.formId || !jsonForms) {
      console.error("User, formId, or jsonForms is missing.");
      return;
    }

    try {
      const updatedJsonForm = JSON.stringify([jsonForms]);
      await db
        .update(JsonForms)
        .set({
          jsonform: updatedJsonForm,
        })
        .where(
          and(
            eq(JsonForms.id, actualParams.formId),
            eq(
              JsonForms.createdBy,
              user.primaryEmailAddress?.emailAddress || ""
            )
          )
        );

      console.log("Form updated successfully in the database.");
    } catch (error) {
      console.error("Error updating form in the database:", error);
    }
  };

  useEffect(() => {
    if (jsonForms) {
      updateJsonFormInDB();
    }
  }, [jsonForms, updateJsonFormInDB]);

  useEffect(() => {
    if (user) {
      GetFormData();
    }
  }, [user, GetFormData]);

  const deleteField = (indexToRemove: number) => {
    if (!jsonForms) return;

    const updatedFields = jsonForms.fields.filter(
      (_, index) => index !== indexToRemove
    );

    setJsonForms({
      ...jsonForms,
      fields: updatedFields,
    });
    toast({ variant: "destructive", description: "field eliminado" });
  };

  const updateControllerFields = async (value: string, columnName: string) => {
    const result = await db
      .update(JsonForms)
      .set({
        [columnName]: value,
      })
      .where(
        and(
          eq(JsonForms.id, actualParams.formId),
          eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress || "")
        )
      )
      .returning({ id: JsonForms.id });

    if (result)
      toast({
        description: "Actualizado correctamente",
      });
  };

  const updateStyle = async (style: { key: string; value: string }) => {
    const result = await db
      .update(JsonForms)
      .set({
        style: JSON.stringify(style),
      })
      .where(
        and(
          eq(JsonForms.id, actualParams.formId),
          eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress || "")
        )
      )
      .returning({ id: JsonForms.id });

    if (result) {
      toast({
        description: "Estilo actualizado correctamente",
      });
    }
  };

  console.log(selectedStyle);
  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <h2
          className="flex gap-2 items-center my-5 cursor-pointer hover:font-bold"
          onClick={() => router.back()}
        >
          <ArrowLeft /> Back
        </h2>
        <div className="flex gap-2">
          <Link href={`/aiform/${actualParams.formId}`} target="_blank">
            <Button className="flex gap-2">
              {" "}
              <SquareArrowOutUpRight className="h-5 w-5" /> Live Preciew
            </Button>
          </Link>
          <Button className="flex gap-2">
            {" "}
            <Share2 className="h-5 w-5" /> Share
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 border rounded-lg shadow-md">
          <Controller
            selectedTheme={(value) => {
              updateControllerFields(value, "theme");
              setSelectedTheme(value);
            }}
            selectedBackground={(value) => {
              updateControllerFields(value, "background");
              setSelectedBackground(value);
            }}
            selectedStyle={(value) => {
              updateStyle(value);
              setSelectedStyle(value);
            }}
          />
        </div>
        <div
          className="md:col-span-2 border rounded-lg p-5 
             flex items-center justify-center"
          style={{
            backgroundImage: selectedBackground,
          }}
        >
          <FormUi
            jsonForm={jsonForms}
            selectedTheme={selectedTheme}
            selectedStyle={selectedStyle}
            onFieldUpdate={handleFieldUpdate}
            deleteField={(index) => deleteField(index)}
            editable={true}
            formId={jsonForms?.id || ""}
            enabledSignIn={jsonForms?.enabledSignIn ?? false}
          />
        </div>
      </div>
    </div>
  );
}

export default EditForm;
