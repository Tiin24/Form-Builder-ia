"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { Field, FormUiProps } from "@/types";
import FieldEdit from "./FieldEdit";

function FormUi({
  jsonForm,
  onFieldUpdate,
  deleteField,
  selectedTheme,
  selectedStyle
}: FormUiProps) {
  const form = jsonForm;

  return (
    <div
      className="border p-5 md:w-[600px] rounded-lg"
      data-theme={selectedTheme}
      style={{
        boxShadow: selectedStyle?.key === 'boxshadow' ? selectedStyle.value : undefined,
        border: selectedStyle?.key === 'border' ? selectedStyle.value : undefined,
      }}
      >
      <h2 className="font-bold text-center text-2xl">{form?.formTitle}</h2>
      <h2 className="text-sm text-gray-400 text-center">{form?.formHeading}</h2>
      {form?.fields?.map((field: Field, index: number) => (
        <div key={index} className="flex items-center gap-2">
          {field.fieldType == "select" ? (
            <div className="my-3 w-full">
              <label className="text-xs text-gray-500">{field.label}</label>
              <Select required={field?.required}>
                <SelectTrigger className="w-full bg-transparent">
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map((item, idx) => {
                    const itemLabel =
                      typeof item === "string" ? item : item.label;
                    return (
                      <SelectItem key={idx} value={itemLabel}>
                        {itemLabel}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          ) : field.fieldType == "radio" ? (
            <div className="w-full my-3">
              <label className="text-xs text-gray-500">{field.label}</label>
              <RadioGroup required={field?.required}>
                {field.options?.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <RadioGroupItem value={item.label} id={item.label} />
                    <Label htmlFor={item.label}>{item.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ) : field.fieldType == "checkbox" ? (
            <div className="my-3 w-full">
              <label className="text-xs text-gray-500">{field?.label}</label>
              {field?.options ? (
                field?.options?.map((item, idx) => {
                  const itemLabel =
                    typeof item === "string" ? item : item.label;
                  return (
                    <div key={idx} className="flex gap-2 items-center">
                      <Checkbox />
                      <h2>{itemLabel}</h2>
                    </div>
                  );
                })
              ) : (
                <div className="flex gap-2 items-center">
                  <Checkbox required={field.required} />
                  <h2>{field.label}</h2>
                </div>
              )}
            </div>
          ) : (
            <div className="my-3 w-full">
              <label className="text-xs text-gray-500">{field.label}</label>
              <Input
                type={field?.type}
                placeholder={field.placeholder}
                name={field.fieldName}
                className="bg-transparent"
                required={field?.required}
              />
            </div>
          )}
          <div>
            <FieldEdit
              defaultValue={field}
              onUpdate={(updatedField) => onFieldUpdate(index, updatedField)}
              deleteField={() => deleteField(index)}
            />
          </div>
        </div>
      ))}
      <button className="btn btn-primary">Submit</button>
    </div>
  );
}

export default FormUi;
