"use client"

import React, { ChangeEvent, FormEvent, useRef, useState } from "react"
import prettyBytes from "pretty-bytes"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Button } from "primereact/button"
import { Toast } from "primereact/toast"
import { useTranslations, useLocale } from "next-intl"
import * as uuid from "uuid"
import { FormatEnum } from "sharp"
import { useToastNotify } from "@/shared/hooks"
import { IConvertHistoryItem, ISelectedFile } from "@/shared/types"
import { LinkRoot } from "@/shared/components"
import { createSelectedFiles } from "../helpers"
import { useSendSelectedFiles } from "../api"
import { ConvertSelect, EmptyTemplate, TableHeader } from "../components"
import { MAX_FILE_SIZE, MAX_FILES_LENGTH } from "../constants"

export const FileUpload = () => {
  const locale = useLocale()
  const tFileUpload = useTranslations("FileUpload")
  const toastRef = useRef<Toast>(null)
  const { notifyWarning } = useToastNotify(toastRef)
  const [selectedFiles, setSelectedFiles] = useState<ISelectedFile[]>([])
  const { isLoading, convertHistory, sendFilesToConvert } = useSendSelectedFiles()

  const onFileUploadHandle = ({ target: { files } }: ChangeEvent<HTMLInputElement>): void => {
    if (!files?.length) {
      return
    }

    let newFiles: File[] = Array.from(files!).filter((file: File) => {
      const isToLarge = file.size > MAX_FILE_SIZE

      if (isToLarge) {
        notifyWarning([
          "max_size_warn",
          {
            size: prettyBytes(MAX_FILE_SIZE, { locale }),
          },
        ])
      }

      return !isToLarge
    })

    if (
      selectedFiles.length > MAX_FILES_LENGTH ||
      newFiles.length + selectedFiles.length > MAX_FILES_LENGTH
    ) {
      notifyWarning(["max_files_warn", { quantity: MAX_FILES_LENGTH }])

      newFiles = newFiles.splice(0, MAX_FILES_LENGTH - selectedFiles.length)
    }

    setSelectedFiles((prevFiles: ISelectedFile[]): ISelectedFile[] => {
      return [...createSelectedFiles(prevFiles, newFiles), ...prevFiles]
    })
  }

  const onSubmitHandle = (event: FormEvent): void => {
    event.preventDefault()

    const hasNoTargetSomeFile: ISelectedFile | undefined = selectedFiles.find(
      ({ convertTarget }: ISelectedFile) => !convertTarget,
    )
    if (hasNoTargetSomeFile) {
      notifyWarning(["target_warn"])
      return
    }

    const formData: FormData = new FormData()

    selectedFiles.forEach(({ file, convertTarget }: ISelectedFile): void => {
      const id = uuid.v4()

      formData.append(`file_${id}`, file)
      formData.append(`target_${id}`, convertTarget as keyof FormatEnum)
    })

    sendFilesToConvert(formData)
  }

  const onConvertTargetChangeHandle = (
    selectedFile: ISelectedFile,
    convertTarget: keyof FormatEnum,
  ): void => {
    setSelectedFiles((prevSelectedFiles: ISelectedFile[]): ISelectedFile[] => {
      const currentSelectedFileIndex = prevSelectedFiles.findIndex(
        (prevSelectedFile: ISelectedFile): boolean => {
          return selectedFile === prevSelectedFile
        },
      )
      if (currentSelectedFileIndex < 0) {
        return prevSelectedFiles
      }

      prevSelectedFiles[currentSelectedFileIndex].convertTarget = convertTarget

      return [...prevSelectedFiles]
    })
  }

  const onFilesClearHandle = (): void => {
    setSelectedFiles([])
  }

  const onRemoveSelectedFileHandle = (selectedFile: ISelectedFile): void => {
    setSelectedFiles((prevSelectedFiles: ISelectedFile[]): ISelectedFile[] => {
      return prevSelectedFiles.filter((prevSelectedFile: ISelectedFile): boolean => {
        return prevSelectedFile !== selectedFile
      })
    })
  }

  return (
    <div className={"lg:max-w-[80vw] w-full m-auto p-10"}>
      <form
        id={"file-upload-form"}
        className={"w-full"}
        onSubmit={onSubmitHandle}
      >
        <Toast ref={toastRef} />
        <DataTable
          value={selectedFiles}
          tableStyle={{ width: "100%" }}
          emptyMessage={EmptyTemplate}
          header={
            <TableHeader
              isSelectFilesLocked={selectedFiles.length >= MAX_FILES_LENGTH}
              hasFiles={selectedFiles.length > 0}
              isLoading={isLoading}
              onFileUpload={onFileUploadHandle}
              onFilesClear={onFilesClearHandle}
            />
          }
        >
          <Column
            className={"max-w-[40vw]"}
            header={tFileUpload("file_name")}
            body={({ file }: ISelectedFile) => {
              return (
                <p className={"w-full text-ellipsis overflow-hidden white-space-nowrap"}>
                  {file.name}
                </p>
              )
            }}
          />
          <Column
            header={tFileUpload("file_size")}
            body={({ file }: ISelectedFile) => prettyBytes(file.size, { locale })}
          />
          <Column header={tFileUpload("file_type")} />
          <Column
            header={tFileUpload("convert_to")}
            body={(selectedFile: ISelectedFile) => (
              <ConvertSelect
                selectedFile={selectedFile}
                onConvertTargetChange={onConvertTargetChangeHandle}
              />
            )}
          />
          <Column
            body={(selectedFile: ISelectedFile) => (
              <Button
                type="button"
                icon="pi pi-times"
                className="p-button-outlined p-button-rounded p-button-danger flex w-8 h-8 m-auto hover:bg-red-500 hover:text-white"
                onClick={() => onRemoveSelectedFileHandle(selectedFile)}
              />
            )}
          />
        </DataTable>
      </form>
      {convertHistory.length > 0 && (
        <DataTable
          value={convertHistory}
          tableStyle={{ width: "100%" }}
          header={tFileUpload("convert_history")}
        >
          <Column
            className={"max-w-[40vw]"}
            header={tFileUpload("file_name")}
            body={({ name }: IConvertHistoryItem) => {
              return (
                <p className={"w-full text-ellipsis overflow-hidden white-space-nowrap"}>{name}</p>
              )
            }}
          />
          <Column
            className={"max-w-[40vw]"}
            header={tFileUpload("file_size")}
            body={({ size }: IConvertHistoryItem) => {
              return (
                <p className={"w-full text-ellipsis overflow-hidden white-space-nowrap"}>
                  {prettyBytes(size, { locale })}
                </p>
              )
            }}
          />
          <Column
            className={"max-w-[40vw]"}
            body={({ convertedTime }: IConvertHistoryItem) => {
              return <p>{convertedTime}</p>
            }}
          />
          <Column
            className={"max-w-[40vw]"}
            body={({ url }: IConvertHistoryItem) => {
              return (
                <LinkRoot
                  href={url}
                  target={"_blank"}
                  rel={"noreferrer nofollow"}
                  className={"w-fit h-fit m-auto block"}
                >
                  <i className="pi pi-arrow-circle-down text-3xl" />
                </LinkRoot>
              )
            }}
          />
        </DataTable>
      )}
    </div>
  )
}
