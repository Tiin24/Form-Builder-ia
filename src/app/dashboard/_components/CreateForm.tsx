'use client'
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AiChatSession } from "@/db/AiModal";
import { useUser } from "@clerk/nextjs";
import { db } from "@/db";
import { JsonForms } from "@/db/schema";

const PROMPT = ',On Basis of description create JSON form with formTitle, formHeading along with fieldName, FieldTitle,FieldType, Placeholder, label , required fields, and checkbox and select field type options will be in array only and in JSON format'

function CreateForm() {

    const [openDialog,setOpenDailog]=useState<boolean>(false)
    const [userInput, setUserInput]=useState<string|undefined>()
    const [loading,setLoading] = useState<boolean | undefined>()
    const {user}=useUser()

    const onCreateForm= async()=>{
        console.log(userInput)
        setLoading(true)
      const result =  await AiChatSession.sendMessage("Description:"+userInput+PROMPT)
        console.log(result.response.text())
        if(result.response.text()){
            const resp= await db.insert(JsonForms).values({
                jsonform: result.response.text(),
                createdBy: user?.primaryEmailAddress?.emailAddress,
                createdAt: new Date().toISOString().slice(0, 10)
            }).returning({ id: JsonForms.id })
            console.log('New Form ID',resp)
            setLoading(false)
        }
        setLoading(false)
    }

  return (
    <>
            <Button onClick={()=>setOpenDailog(true)}>+ Create Form</Button>
            <Dialog open={openDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create new form </DialogTitle>
                        <DialogDescription>
                        <Textarea className="my-2" 
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Write descrition of your form"/>
                            <Button 
                            onClick={()=>setOpenDailog(false)}
                            variant="destructive">Cancel</Button>
                            <Button 
                            disabled={loading}
                            onClick={()=> onCreateForm()}>Create</Button>
                        
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </>
  );
}

export default CreateForm;
