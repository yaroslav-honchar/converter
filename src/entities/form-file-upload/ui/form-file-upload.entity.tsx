"use client"

import React, { useState } from "react"
import { FileUpload, FileUploadRemoveEvent, FileUploadSelectEvent } from "primereact/fileupload"
import { ItemTemplate } from "../components"
import { IPUploadedFileInterface } from "@/shared/types"

export const FormUploadFile = () => {
  const [files, setFiles] = useState<IPUploadedFileInterface[]>([])

  const onSelectHandle = (event: FileUploadSelectEvent) => {
    setFiles(event.files as IPUploadedFileInterface[])
  }

  const onRemoveHandle = (event: FileUploadRemoveEvent) => {
    setFiles((prevFiles: IPUploadedFileInterface[]) => {
      return prevFiles.filter(
        (prevFile: IPUploadedFileInterface) => prevFile.name !== event.file.name,
      )
    })
  }

  const onClearHandle = () => {
    setFiles([])
  }

  console.log(files)

  return (
    <div className={"max-w-[50rem] w-full m-auto p-10"}>
      <FileUpload
        itemTemplate={ItemTemplate}
        name="file"
        multiple
        accept="image/*"
        maxFileSize={10240000}
        onSelect={onSelectHandle}
        onClear={onClearHandle}
        onRemove={onRemoveHandle}
      />
    </div>
  )
}
