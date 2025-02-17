import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { JsonForms } from "@/db/schema";
import { useToast } from "@/hooks/use-toast";
import { FormListItemProps } from "@/types";
import { useUser } from "@clerk/nextjs";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { and, eq } from "drizzle-orm";
import { Edit, Share, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";
import { RWebShare } from "react-web-share";

function FormListItem({
  jsonForm,
  formRecord,
  refreshData = () => {},
}: FormListItemProps) {
  const { toast } = useToast();
  const { user } = useUser();

  const formData = jsonForm[0]

  const onDeleteForm = async () => {
    if (!user || !formRecord?.id) {
      return;
    }
    const result = await db
      .delete(JsonForms)
      .where(
        and(
          eq(JsonForms.id, formRecord.id),
          eq(JsonForms.createdBy, user.primaryEmailAddress?.emailAddress || "")
        )
      );

    if (result) {
      toast({
        description: "Borrado",
      });
      refreshData();
    }
  };

  return (
    <div className="border shadow-sm rounded-lg p-4">
      <div className="flex justify-between">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Trash
              className="h-5 w-5 text-red-600 
                    cursor-pointer hover:scale-105 transition-all"
            />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDeleteForm()}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      {/* Usar formData en lugar de jsonForm directamente */}
      <h2 className="text-lg text-black">{formData?.formTitle}</h2>
      <h2 className="text-sm text-gray-500">{formData?.formHeading}</h2>
      <hr className="my-4"></hr>
      <div className="flex justify-between">
        <RWebShare
          data={{
            text:
              formData?.formHeading +
              " , Build your form in seconds with AI form Builder ",
            url: process.env.NEXT_PUBLIC_BASE_URL + "/aiform/" + formRecord?.id,
            title: formData?.formTitle,
          }}
          onClick={() => console.log("shared successfully!")}
        >
          <Button variant="outline" size="sm" className="flex gap-2">
            {" "}
            <Share className="h-5 w-5" /> Share
          </Button>
        </RWebShare>
        <Link
          href={"/edit-form/" + formRecord?.id}
          onClick={() => console.log(formRecord?.id)}
        >
          <Button className="flex gap-2 bg-lime-950" size="sm">
            {" "}
            <Edit className="h-5 w-5" /> Edit
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default FormListItem;