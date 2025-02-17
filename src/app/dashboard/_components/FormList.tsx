"use client";
import React, { useCallback, useEffect, useState } from "react";
import { db } from "@/db";
import { JsonForms } from "@/db/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import FormListItem from "./FormListItem";
import { FormUiProps } from "@/types";

function FormList() {
  const { user } = useUser();
  const [formList, setFormList] = useState<FormUiProps[]>([]); // Tipo FormUiProps[]

  const GetFormList = useCallback(async () => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      console.error("User email address is undefined");
      return;
    }

    const result = await db
      .select()
      .from(JsonForms)
      .where(eq(JsonForms.createdBy, user.primaryEmailAddress.emailAddress))
      .orderBy(desc(JsonForms.id));

    if (result.length > 0) {
      const parsedForms: FormUiProps[] = result.map((item) => {
        const parsedJson = JSON.parse(item.jsonform);

        return {
          id: item.id,
          jsonForm: Array.isArray(parsedJson) ? parsedJson : [parsedJson], // Asegurar que sea un array
          selectedTheme: item.theme || undefined,
          selectedStyle: item.style
            ? { key: "custom", value: item.style }
            : undefined,
          enabledSignIn: item.enabledSignIn,
        };
      });

      setFormList(parsedForms);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      GetFormList();
    }
  }, [GetFormList, user]);

  return (
    <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-5">
      {formList.slice(0, 6).map((form, index) => (
        <div key={index}>
          <FormListItem
            jsonForm={
              Array.isArray(form.jsonForm)
                ? form.jsonForm
                : form.jsonForm
                ? [form.jsonForm]
                : []
            }
            formRecord={form}
            refreshData={GetFormList}
          />
        </div>
      ))}
    </div>
  );
}

export default FormList;
