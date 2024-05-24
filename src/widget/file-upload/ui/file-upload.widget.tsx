"use client"

import React, { ChangeEvent, useRef, useState } from "react"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { useLocale } from "use-intl"
import prettyBytes from "pretty-bytes"
import { Button } from "primereact/button"
import { TableHeader, ConvertSelect } from "../components"
import { IUploadedFile } from "../types"
import { useTranslations } from "next-intl"
import { useSendSelectedFiles } from "../hooks"
import { Toast } from "primereact/toast"
import { UploadedFile } from "../lib"

const MAX_FILES_LENGTH = 5

export const FileUpload = () => {
  const toast = useRef<Toast>(null)
  const tFileUpload = useTranslations("FileUpload")
  const locale = useLocale()
  const [uploadedFiles, setUploadedFiles] = useState<IUploadedFile[]>([])
  const { sendFiles } = useSendSelectedFiles()

  const onConvertHandle = () => {
    const isSomeFileHasNoConvertTarget = uploadedFiles.some((f) => f.convertTo === null)
    if (isSomeFileHasNoConvertTarget) {
      toast.current?.show({
        severity: "warn",
        summary: "Warning",
        detail: tFileUpload("toast-target-warn"),
        life: 3000,
      })
      return
    }

    sendFiles(uploadedFiles)
  }

  const onConvertToChangeHandle = (uploadedFile: IUploadedFile) => {
    setUploadedFiles((prevFiles) => {
      const index = prevFiles.findIndex(
        (f) => f.file.name === uploadedFile.file.name && f.file.size === uploadedFile.file.size,
      )
      prevFiles[index].convertTo = uploadedFile.convertTo

      return [...prevFiles]
    })
  }

  const onFileUploadHandle = ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
    if (!files!.length) {
      return
    }
    const filesTransformed: IUploadedFile[] = []
    let selectedFiles = Array.from(files!)

    if (
      selectedFiles.length > MAX_FILES_LENGTH ||
      uploadedFiles.length + selectedFiles.length > MAX_FILES_LENGTH
    ) {
      toast.current?.show({
        severity: "warn",
        summary: "Warning",
        detail: tFileUpload("toast-max-files-warn", { quantity: MAX_FILES_LENGTH }),
        life: 3000,
      })

      selectedFiles = selectedFiles.splice(0, MAX_FILES_LENGTH - uploadedFiles.length)
    }

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = new UploadedFile(files![i])

      const hasSameFile = uploadedFiles.some((f) => {
        return f.file.name === file.file.name && f.file.size === file.file.size
      })
      if (hasSameFile) {
        continue
      }

      filesTransformed.push(file)
    }

    setUploadedFiles((prevFiles) => [...prevFiles, ...filesTransformed])
  }

  const onUploadedFileRemoveHandle = (uploadedFile: IUploadedFile) => {
    setUploadedFiles((prevFiles) => [...prevFiles.filter((f) => f !== uploadedFile)])
  }

  const onFilesClearHandle = () => {
    setUploadedFiles([])
  }

  return (
    <div className={"lg:max-w-[80vw] w-full m-auto p-10"}>
      <Toast ref={toast} />
      <DataTable
        value={uploadedFiles}
        tableStyle={{ width: "100%" }}
        stripedRows
        header={
          <TableHeader
            hasFiles={uploadedFiles.length > 0}
            isSelectFilesLocked={uploadedFiles.length >= MAX_FILES_LENGTH}
            onFileUpload={onFileUploadHandle}
            onFilesClear={onFilesClearHandle}
            onConvert={onConvertHandle}
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
