"use client"

import React, { ChangeEvent, useState } from "react"

// const convertOptions: IConvertOption = [
//   {
//     label: "PNG",
//     value: "png",
//   },
//   {
//     label: "JPEG",
//     value: "jpeg",
//   },
//   {
//     label: "WEBP",
//     value: "webp",
//   },
// ]

export const FormUploadFile = () => {
  const [uploadedFiles, setUploadedFiles] = useState<IUploadedFile[]>([])

  const onChangeHandle = (event: ChangeEvent<HTMLInputElement>) => {
    const files = []

    for (let i = 0; i < event.target.files!.length; i++) {
      const file: IUploadedFile = {
        file: event.target.files![i],
        convertTo: "-",
      }

      const hasSameFile = uploadedFiles.some((f) => f.file.name === file.file.name)
      if (hasSameFile) {
        continue
      }

      files.push(file)
    }

    setUploadedFiles(files)
  }

  return (
    <div className={"max-w-[50rem] w-full m-auto p-10"}>
      <label className={"p-button"}>
        <span>Upload file</span>
        <input
          type="file"
          className={"hidden"}
          onChange={onChangeHandle}
          multiple={true}
        />
      </label>
    </div>
  )
}

export interface IUploadedFile {
  file: File
  convertTo: string
}

export interface IConvertOption {
  label: string
  value: string
}
