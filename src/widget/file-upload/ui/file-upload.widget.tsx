"use client"

import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
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
import { Icon } from "@/shared/components"
import { createSelectedFiles } from "../helpers"
import { useSendSelectedFiles } from "../api"
import { ConvertSelect, EmptyTemplate, TableHeader } from "../components"
import { MAX_FILE_SIZE, MAX_FILES_LENGTH } from "../constants"

export const FileUpload = () => {
  const locale = useLocale()
  const tFileUpload = useTranslations("FileUpload")
  const toastRef = useRef<Toast>(null)
  const { isLoading, convertHistory, error, sendFilesToConvert } = useSendSelectedFiles()
  const { notifyWarning, notifyError } = useToastNotify(toastRef)
  const [selectedFiles, setSelectedFiles] = useState<ISelectedFile[]>([])

  const onFileSelectHandle = ({ target: { files } }: ChangeEvent<HTMLInputElement>): void => {
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
      return [...prevFiles, ...createSelectedFiles(prevFiles, newFiles)]
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

  useEffect(() => {
    if (error) {
      notifyError(error.message)
    }
  }, [error, notifyError])

  return (
    <div className={"container flex flex-col gap-8 m-auto"}>
      <form
        id={"file-upload-form"}
        className={"w-full max-w-[61.25rem] mx-auto"}
        onSubmit={onSubmitHandle}
      >
        <Toast ref={toastRef} />
        <DataTable<ISelectedFile[]>
          value={selectedFiles}
          className={"w-full"}
          emptyMessage={<EmptyTemplate />}
          header={
            <TableHeader
              isSelectFilesLocked={selectedFiles.length >= MAX_FILES_LENGTH}
              hasFiles={selectedFiles.length > 0}
              isLoading={isLoading}
              onFileSelect={onFileSelectHandle}
              onFilesClear={onFilesClearHandle}
            />
          }
        >
          <Column
            field={"file.name"}
            className={"max-w-[40vw]"}
            header={tFileUpload("file_name")}
            body={({ file }: ISelectedFile) => {
              return (
                <p className={"w-full text-ellipsis overflow-hidden whitespace-nowrap"}>
                  {file.name}
                </p>
              )
            }}
          />
          <Column
            field={"file.size"}
            header={tFileUpload("file_size")}
            body={({ file }: ISelectedFile) => (
              <p className={"whitespace-nowrap"}>{prettyBytes(file.size, { locale })}</p>
            )}
          />
          <Column
            field={"file.type"}
            header={tFileUpload("file_type")}
          />
          <Column
            field={"convertTarget"}
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
                icon={<Icon name={"trash"} />}
                severity={"danger"}
                onClick={() => onRemoveSelectedFileHandle(selectedFile)}
              />
            )}
          />
        </DataTable>
      </form>
      {convertHistory.length > 0 && (
        <DataTable<IConvertHistoryItem[]>
          value={convertHistory}
          tableStyle={{ width: "100%" }}
          className={"w-full max-w-[61.25rem] mx-auto"}
          header={tFileUpload("convert_history")}
        >
          <Column
            field={"name"}
            className={"max-w-[40vw]"}
            header={tFileUpload("file_name")}
            body={({ name }: IConvertHistoryItem) => {
              return (
                <p className={"w-full text-ellipsis overflow-hidden whitespace-nowrap"}>{name}</p>
              )
            }}
          />
          <Column
            field={"size"}
            className={"max-w-[40vw]"}
            header={tFileUpload("file_size")}
            body={({ size }: IConvertHistoryItem) => {
              return <p className={"w-full whitespace-nowrap"}>{prettyBytes(size, { locale })}</p>
            }}
          />
          <Column
            field={"convertedTime"}
            header={tFileUpload("converted_time")}
            className={"max-w-[40vw]"}
            body={({ convertedTime }: IConvertHistoryItem) => {
              return <p>{convertedTime}</p>
            }}
          />
          <Column
            field={"url"}
            className={"max-w-[40vw]"}
            body={({ url }: IConvertHistoryItem) => {
              return (
                <Button
                  rel={"noreferrer nofollow"}
                  icon={"pi pi-download"}
                  className={"m-auto"}
                  onClick={() => window.open(url, "_blank", "nofollow noreferrer")}
                />
              )
            }}
          />
        </DataTable>
      )}
    </div>
  )
}
