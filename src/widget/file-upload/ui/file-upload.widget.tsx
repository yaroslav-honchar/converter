"use client"

import * as uuid from "uuid"
import Cookies from "js-cookie"
import { useLocale, useTranslations } from "next-intl"
import prettyBytes from "pretty-bytes"
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
import { FormatEnum } from "sharp"

import { Button } from "primereact/button"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { useDebounce } from "primereact/hooks"
import { Toast } from "primereact/toast"

import { Icon } from "@/shared/components"
import { COOKIE_NAMES } from "@/shared/constants"
import { useToastNotify } from "@/shared/hooks"
import { IConvertHistoryItem, ISelectedFile } from "@/shared/types"

import { useSendSelectedFiles } from "../api"
import { ConvertSelect, EmptyTemplate, TableHeader } from "../components"
import { MAX_FILES_LENGTH, MAX_FILE_SIZE } from "../constants"
import { createSelectedFiles } from "../helpers"

export const FileUpload = () => {
  const locale = useLocale()
  const tFileUpload = useTranslations("FileUpload")
  const toastRef = useRef<Toast>(null)
  const { isLoading, convertHistory, sendFilesToConvert } = useSendSelectedFiles()
  const { notifyWarning, notifyError, notifySuccess } = useToastNotify(toastRef)
  const [selectedFiles, setSelectedFiles] = useState<ISelectedFile[]>([])
  const [isTelegramConfirmed, setIsTelegramConfirmed] = useState<boolean>(false)
  const [telegramUsername, debouncedTelegramUsername, setTelegramUsername] = useDebounce<string>(
    "",
    500,
  )

  const onFileSelectHandle = ({ target: { files } }: ChangeEvent<HTMLInputElement>): void => {
    if (!files?.length) {
      return
    }

    let newFiles: File[] = Array.from(files!).filter((file: File) => {
      const isToLarge = file.size > MAX_FILE_SIZE
      const isImage = file.type.startsWith("image/")

      if (!isImage) {
        notifyWarning(["file_type_warn", { name: file.name }])

        return false
      }

      if (isToLarge) {
        notifyWarning([
          "max_size_warn",
          {
            size: prettyBytes(MAX_FILE_SIZE, { locale }),
            name: file.name,
          },
        ])

        return false
      }

      return !isToLarge && isImage
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

  const onSubmitHandle = async (event: FormEvent): Promise<void> => {
    event.preventDefault()
    let readyToSend = true

    const hasNoTargetSomeFile: ISelectedFile | undefined = selectedFiles.find(
      ({ convertTarget }: ISelectedFile) => !convertTarget,
    )
    if (hasNoTargetSomeFile) {
      notifyWarning(["target_warn"])
      readyToSend = false
    }

    if (isTelegramConfirmed && telegramUsername === "") {
      notifyWarning(["username_warn"])
      readyToSend = false
    }

    if (!readyToSend) {
      return
    }

    const formData: FormData = new FormData()

    selectedFiles.forEach(({ file, convertTarget }: ISelectedFile): void => {
      const id = uuid.v4()

      formData.append(`file_${id}`, file)
      formData.append(`target_${id}`, convertTarget as keyof FormatEnum)
    })

    await sendFilesToConvert(formData, {
      onSuccess: (): void => {
        notifySuccess(["convert_success"])
      },
      onError: (error: Error): void => {
        notifyError(error.message)
      },
    })
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

  useEffect((): void => {
    const isCookieAccepted = Cookies.get(COOKIE_NAMES.cookiesAccepted) === "true"

    const tgConfirmed = Cookies.get(COOKIE_NAMES.tgConfirmed)
    tgConfirmed && setIsTelegramConfirmed(isCookieAccepted && tgConfirmed === "true")

    const tgChatID = Cookies.get(COOKIE_NAMES.tgChatID)
    tgChatID && setTelegramUsername(tgChatID)
  }, [setTelegramUsername, setIsTelegramConfirmed])

  useEffect((): void => {
    Cookies.set(COOKIE_NAMES.tgChatID, debouncedTelegramUsername.replace(/@/g, ""))
  }, [debouncedTelegramUsername])

  return (
    <section className="py-16">
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
              footer={<p className={"whitespace-nowrap"}>{tFileUpload("total_size")}</p>}
            />
            <Column
              field={"file.size"}
              header={tFileUpload("file_size")}
              body={({ file }: ISelectedFile) => (
                <p className={"whitespace-nowrap"}>{prettyBytes(file.size, { locale })}</p>
              )}
              footer={prettyBytes(
                selectedFiles.reduce((acc: number, item: ISelectedFile) => acc + item.file.size, 0),
                { locale },
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
            header={<h2 className={"text-xl font-bold"}>{tFileUpload("convert_history")}</h2>}
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
              footer={<p className={"whitespace-nowrap"}>{tFileUpload("total_size")}</p>}
            />
            <Column
              field={"size"}
              className={"max-w-[40vw]"}
              header={tFileUpload("file_size")}
              body={({ size }: IConvertHistoryItem) => {
                return <p className={"w-full whitespace-nowrap"}>{prettyBytes(size, { locale })}</p>
              }}
              footer={prettyBytes(
                convertHistory.reduce(
                  (acc: number, item: IConvertHistoryItem) => acc + item.size,
                  0,
                ),
                { locale },
              )}
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
    </section>
  )
}
