"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { userResponses } from "@/db/schema";
import { Form, FormListItemProps } from "@/types";
import { eq } from "drizzle-orm";
import { Loader2 } from "lucide-react";
import * as XLSX from "xlsx"; // Importa xlsx
import React, { useState } from "react";

function FormListItemResp({ jsonForm, formRecord }: FormListItemProps) {
  const [loading, setLoading] = useState(false);

  const formData = jsonForm[0]

  const exportData = async () => {
    if (!formRecord?.id) {
      console.warn("No formRecord ID found.");
      return;
    }

    try {
      setLoading(true);
      const result = await db
        .select()
        .from(userResponses)
        .where(eq(userResponses.formRef, formRecord.id));

      if (!result.length) {
        console.warn("No data found to export.");
        return;
      }

      const jsonData: Form[] = result.map((item) => JSON.parse(item.jsonResponse));

      exportToExcel(jsonData);
    } catch (error) {
      console.error("Error exporting data:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Convert JSON to Excel and then download it
   */
  const exportToExcel = (jsonData: Form[]) => {
    if (!jsonData.length) {
      console.warn("No data available for export.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Responses");

    XLSX.writeFile(workbook, `${formData?.formTitle || "Export"}.xlsx`);
  };

  return (
    <div className="border shadow-sm rounded-lg p-4 my-5">
      <h2 className="text-lg text-black">{formData?.formTitle || "Untitled Form"}</h2>
      <h2 className="text-sm text-gray-500">{formData?.formHeading || "No description"}</h2>
      <hr className="my-4"></hr>
      <div className="flex justify-between items-center">
        <h2 className="text-sm">
          <strong>45</strong> Responses
        </h2>
        <Button size="sm" onClick={exportData} disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : "Export"}
        </Button>
      </div>
    </div>
  );
}

export default FormListItemResp;
