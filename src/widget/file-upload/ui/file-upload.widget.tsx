"use client"

import React, { ChangeEvent, useRef, useState } from "react"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { useLocale } from "use-intl"
import prettyBytes from "pretty-bytes"
import { Button } from "primereact/button"
import { TableHeader, ConvertSelect, EmptyTemplate } from "../components"
import { useTranslations } from "next-intl"
import { useSendSelectedFiles } from "../hooks"
import { Toast } from "primereact/toast"
import { UploadFile } from "@/shared/lib"
import { FormatEnum } from "sharp"

const MAX_FILES_LENGTH = 5

export const FileUpload = () => {
  const toast = useRef<Toast>(null)
  const tFileUpload = useTranslations("FileUpload")
  const locale = useLocale()
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([])
  const { isLoading, downloadUrl, sendFiles, resetDownloadUrl } = useSendSelectedFiles()

  const onConvertHandle = () => {
    const isSomeFileHasNoConvertTarget = uploadedFiles.some((f) => f.convertTarget === null)

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

  const onConvertTargetChangeHandle = (
    uploadedFile: UploadFile,
    formatTarget: keyof FormatEnum,
  ) => {
    setUploadedFiles((prevFiles) => {
      const index = prevFiles.findIndex(
        (f) =>
          f.fileData.name === uploadedFile.fileData.name &&
          f.fileData.size === uploadedFile.fileData.size,
      )
      prevFiles[index].setConvertTarget(formatTarget)

      return [...prevFiles]
    })
  }

  const onFileUploadHandle = ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
    if (!files!.length) {
      return
    }
    const filesTransformed: UploadFile[] = []
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
      const newFile = selectedFiles[i]

      const hasSameFile = uploadedFiles.some((f) => {
        return f.fileData.name === newFile.name && f.fileData.size === newFile.size
      })
      if (hasSameFile) {
        continue
      }

      filesTransformed.push(new UploadFile(newFile))
    }

    setUploadedFiles((prevFiles) => [...prevFiles, ...filesTransformed])
  }

  const onUploadedFileRemoveHandle = (uploadedFile: UploadFile) => {
    setUploadedFiles((prevFiles) => {
      const newState = [...prevFiles.filter((f) => f !== uploadedFile)]

      if (newState.length === 0) {
        resetDownloadUrl()
      }

      return newState
    })
  }

  const onFilesClearHandle = () => {
    setUploadedFiles([])
    resetDownloadUrl()
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
            isLoading={isLoading}
            downloadUrl={downloadUrl}
            hasFiles={uploadedFiles.length > 0}
            isSelectFilesLocked={uploadedFiles.length >= MAX_FILES_LENGTH}
            onFileUpload={onFileUploadHandle}
            onFilesClear={onFilesClearHandle}
            onConvert={onConvertHandle}
          />
        }
        emptyMessage={<EmptyTemplate />}
      >
        <Column
          field="fileData.name"
          className={"max-w-[40vw]"}
          header={tFileUpload("file_name")}
          body={({ fileData }) => {
            return (
              <p className={"w-full text-ellipsis overflow-hidden white-space-nowrap"}>
                {fileData.name}
              </p>
            )
          }}
        />
        <Column
          field="fileData.size"
          header={tFileUpload("file_size")}
          body={({ fileData }) => prettyBytes(fileData.size, { locale })}
        />
        <Column
          field="fileData.type"
          header={tFileUpload("file_type")}
        />
        <Column
          field="convertTo"
          header={tFileUpload("convert_to")}
          body={(uploadedFile: UploadFile) => (
            <ConvertSelect
              uploadedFile={uploadedFile}
              onConvertTargetChange={onConvertTargetChangeHandle}
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
