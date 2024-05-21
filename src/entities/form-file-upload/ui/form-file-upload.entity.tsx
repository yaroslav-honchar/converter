"use client"

import React from "react"
import { FileUpload } from "primereact/fileupload"

export const FormUploadFile = () => {
  return (
    <div className={"max-w-[50rem] w-full mx-auto p-10"}>
      <FileUpload
        name="demo[]"
        url={"/api/upload"}
        multiple
        accept="image/*"
        maxFileSize={10240000}
      />
    </div>
  )
}
