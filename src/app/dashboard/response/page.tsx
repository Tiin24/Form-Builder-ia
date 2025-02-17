"use client";
import { db } from "@/db";
import { JsonForms } from "@/db/schema";
import { FormUiProps } from "@/types";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useCallback, useEffect, useState } from "react";
import FormListItemResp from "./_components/FormListItemResp";

function Responses() {
  const { user } = useUser();
  const [formList, setFormList] = useState<FormUiProps[]>([]);

  const getFormList = useCallback(async () => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      console.error("User email address is undefined");
      return;
    }

    const result = await db
      .select()
      .from(JsonForms)
      .where(eq(JsonForms.createdBy, user.primaryEmailAddress.emailAddress));

    if (result.length > 0) {
      const parsedForms: FormUiProps[] = result.map((item) => ({
        id: item.id,
        jsonForm: Array.isArray(JSON.parse(item.jsonform)) 
          ? JSON.parse(item.jsonform) 
          : [JSON.parse(item.jsonform)], // Asegurar que siempre sea un array
        selectedTheme: item.theme || undefined,
        selectedStyle: item.style ? { key: "custom", value: item.style } : undefined,
        enabledSignIn: item.enabledSignIn ?? false, // Manejar posibles valores null
      }));

      setFormList(parsedForms);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      getFormList();
    }
  }, [getFormList, user]);

  return (
    formList.length > 0 && (
      <div className="p-10">
        <h2 className="font-bold text-3xl flex items-center justify-between">
          Responses
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          {formList.slice(0, 6).map((form, index) => (
            <div key={index}>
              <FormListItemResp
                formRecord={form}
                jsonForm={form.jsonForm ?? []} // Asegurar siempre un array
              />
            </div>
          ))}
        </div>
      </div>
    )
  );
}

export default Responses;
