"use client"

import React, { ChangeEvent, useState } from "react"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { useLocale } from "use-intl"
import prettyBytes from "pretty-bytes"
import { Button } from "primereact/button"
import { TableHeader, ConvertSelect } from "../components"
import { IUploadedFile } from "../types"
import { useTranslations } from "next-intl"

export const FileUpload = () => {
  const tFileUpload = useTranslations("FileUpload")
  const locale = useLocale()
  const [uploadedFiles, setUploadedFiles] = useState<IUploadedFile[]>([])

  const onConvertToChangeHandle = (uploadedFile: IUploadedFile) => {
    setUploadedFiles((prevFiles) => {
      const index = prevFiles.findIndex(
        (f) => f.file.name === uploadedFile.file.name && f.file.size === uploadedFile.file.size,
      )
      prevFiles[index].convertTo = uploadedFile.convertTo

      return [...prevFiles]
    })
  }

  const onFileUploadHandle = (event: ChangeEvent<HTMLInputElement>) => {
    const files: IUploadedFile[] = []

    for (let i = 0; i < event.target.files!.length; i++) {
      const file: IUploadedFile = {
        file: event.target.files![i],
        convertTo: null,
      }

      const hasSameFile = uploadedFiles.some((f) => {
        return f.file.name === file.file.name && f.file.size === file.file.size
      })
      if (hasSameFile) {
        continue
      }

      files.push(file)
    }

    setUploadedFiles((prevFiles) => [...prevFiles, ...files])
  }

  const onUploadedFileRemoveHandle = (uploadedFile: IUploadedFile) => {
    setUploadedFiles((prevFiles) => [...prevFiles.filter((f) => f !== uploadedFile)])
  }

  const onFilesClearHandle = () => {
    setUploadedFiles([])
  }

  return (
    <div className={"lg:max-w-[80vw] w-full m-auto p-10"}>
      <DataTable
        value={uploadedFiles}
        tableStyle={{ width: "100%" }}
        stripedRows
        header={
          <TableHeader
            onFileUpload={onFileUploadHandle}
            onFilesClear={onFilesClearHandle}
          />
        }
      >
        <Column
          field="file.name"
          className={"max-w-[40vw]"}
          header={tFileUpload("file_name")}
          body={({ file }) => {
            return (
              <p className={"w-full text-ellipsis overflow-hidden white-space-nowrap"}>
                {file.name}
              </p>
            )
          }}
        />
        <Column
          field="file.size"
          header={tFileUpload("file_size")}
          body={({ file }) => prettyBytes(file.size, { locale })}
        />
        <Column
          field="file.type"
          header={tFileUpload("file_type")}
        />
        <Column
          field="convertTo"
          header={tFileUpload("convert_to")}
          body={(uploadedFile) => (
            <ConvertSelect
              uploadedFile={uploadedFile}
              onConvertToChange={onConvertToChangeHandle}
            />
          )}
        />
        <Column
          body={(uploadedFile) => (
            <Button
              type="button"
              icon="pi pi-times"
              className="p-button-outlined p-button-rounded p-button-danger w-8 h-8 m-auto hover:bg-red-500 hover:text-white"
              onClick={() => onUploadedFileRemoveHandle(uploadedFile)}
            />
          )}
        />
      </DataTable>
    </div>
  )
}
