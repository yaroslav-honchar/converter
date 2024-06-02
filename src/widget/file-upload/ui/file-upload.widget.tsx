"use client"

import React, { ChangeEvent, FormEvent, useRef, useState } from "react"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import prettyBytes from "pretty-bytes"
import { Button } from "primereact/button"
import { Toast } from "primereact/toast"
import cn from "classnames"
import { useTranslations } from "next-intl"
import { useLocale } from "use-intl"
import * as uuid from "uuid"
import { MAX_FILE_SIZE, MAX_FILES_LENGTH } from "./file-upload.constants"
import { useToastNotify } from "@/shared/hooks"

export interface ISelectedFile {
  file: File
  convertTarget: string | null
}

export const FileUpload = () => {
  const locale = useLocale()
  const tFileUpload = useTranslations("FileUpload")
  const toastRef = useRef<Toast>(null)
  const { notifyWarning } = useToastNotify(toastRef)
  const [selectedFiles, setSelectedFiles] = useState<ISelectedFile[]>([])

  const onFileUploadHandle = ({ target: { files } }: ChangeEvent<HTMLInputElement>): void => {
    if (!files?.length) {
      return
    }

    let newFiles: File[] = Array.from(files!).filter((file: File) => {
      const isToLarge = file.size > MAX_FILE_SIZE

      if (isToLarge) {
        notifyWarning(
          tFileUpload("toast_max_size_warn", {
            size: prettyBytes(MAX_FILE_SIZE, { locale }),
          }),
        )
      }

      return !isToLarge
    })

    if (
      selectedFiles.length > MAX_FILES_LENGTH ||
      newFiles.length + selectedFiles.length > MAX_FILES_LENGTH
    ) {
      notifyWarning(tFileUpload("toast_max_files_warn", { quantity: MAX_FILES_LENGTH }))

      newFiles = newFiles.splice(0, MAX_FILES_LENGTH - selectedFiles.length)
    }

    const newSelectedFiles: ISelectedFile[] = []

    for (let index = 0; index < newFiles.length; index++) {
      const newFile = newFiles[index]

      const hasSameSelectedFile = selectedFiles.some(({ file }: ISelectedFile) => {
        const { name: selectedFileName, size: selectedFileSize } = file

        return selectedFileName === newFile.name && selectedFileSize === newFile.size
      })
      if (hasSameSelectedFile) {
        continue
      }

      const newSelectedFile: ISelectedFile = {
        file: newFile,
        convertTarget: null,
      }

      newSelectedFiles.push(newSelectedFile)
    }

    setSelectedFiles((prevFiles: ISelectedFile[]): ISelectedFile[] => [
      ...prevFiles,
      ...newSelectedFiles,
    ])
  }

  const onSubmitHandle = (event: FormEvent): void => {
    event.preventDefault()
    const formData = new FormData()

    selectedFiles.forEach(({ file, convertTarget }: ISelectedFile): void => {
      const id = uuid.v4()

      formData.append(`file_${id}`, file)
      formData.append(`target_${id}`, convertTarget ?? ".webp")
    })
  }

  return (
    <form
      id={"file-upload-form"}
      className={"lg:max-w-[80vw] w-full m-auto p-10"}
      onSubmit={onSubmitHandle}
    >
      <Toast ref={toastRef} />
      <DataTable
        value={selectedFiles}
        tableStyle={{ width: "100%" }}
        header={
          <>
            <label className={cn("p-button")}>
              <span>{tFileUpload("select_files")}</span>
              <input
                type="file"
                className={"hidden"}
                onChange={onFileUploadHandle}
                multiple={true}
              />
            </label>
            <button
              className={"p-button ms-2"}
              type={"submit"}
            >
              Submit
            </button>
          </>
        }
      >
        <Column
          field="fileData.name"
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
          field="fileData.size"
          header={tFileUpload("file_size")}
          body={({ file }: ISelectedFile) => prettyBytes(file.size, { locale })}
        />
        <Column
          field="fileData.type"
          header={tFileUpload("file_type")}
        />
        {/*<Column*/}
        {/*  field="convertTo"*/}
        {/*  header={tFileUpload("convert_to")}*/}
        {/*  body={(uploadedFile: UploadFile) => (*/}
        {/*    <ConvertSelect*/}
        {/*      uploadedFile={uploadedFile}*/}
        {/*      onConvertTargetChange={onConvertTargetChangeHandle}*/}
        {/*    />*/}
        {/*  )}*/}
        {/*/>*/}
        <Column
          body={() => (
            <Button
              type="button"
              icon="pi pi-times"
              className="p-button-outlined p-button-rounded p-button-danger w-8 h-8 m-auto hover:bg-red-500 hover:text-white"
            />
          )}
        />
      </DataTable>
    </form>
  )
}

// "use client"
//
// import React, { ChangeEvent, useEffect, useRef, useState } from "react"
// import { DataTable } from "primereact/datatable"
// import { Column } from "primereact/column"
// import { useLocale } from "use-intl"
// import prettyBytes from "pretty-bytes"
// import { Button } from "primereact/button"
// import { TableHeader, ConvertSelect, EmptyTemplate } from "../components"
// import { useTranslations } from "next-intl"
// import { useSendSelectedFiles } from "../hooks"
// import { Toast } from "primereact/toast"
// import { UploadFile } from "@/shared/lib"
// import { FormatEnum } from "sharp"
//
// const MAX_FILE_SIZE = 1024 * 2200
// const MAX_FILES_LENGTH = 5
//
// export const FileUpload = () => {
//   const toast = useRef<Toast>(null)
//   const tFileUpload = useTranslations("FileUpload")
//   const locale = useLocale()
//   const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([])
//   const { isLoading, error, downloadUrl, sendFiles, resetDownloadUrl, resetError } =
//     useSendSelectedFiles()
//
//   const onConvertHandle = () => {
//     const isSomeFileHasNoConvertTarget = uploadedFiles.some((f) => f.convertTarget === null)
//
//     if (isSomeFileHasNoConvertTarget) {
//       toast.current?.show({
//         severity: "warn",
//         summary: "Warning",
//         detail: tFileUpload("toast_target_warn"),
//         life: 3000,
//       })
//       return
//     }
//
//     sendFiles(uploadedFiles)
//   }
//
//   const onConvertTargetChangeHandle = (
//     uploadedFile: UploadFile,
//     formatTarget: keyof FormatEnum,
//   ) => {
//     setUploadedFiles((prevFiles) => {
//       const index = prevFiles.findIndex(
//         (f) =>
//           f.fileData.name === uploadedFile.fileData.name &&
//           f.fileData.size === uploadedFile.fileData.size,
//       )
//       prevFiles[index].setConvertTarget(formatTarget)
//
//       return [...prevFiles]
//     })
//   }
//
//   const onFileUploadHandle = ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
//     if (!files!.length) {
//       return
//     }
//     const filesTransformed: UploadFile[] = []
//     let selectedFiles = Array.from(files!)
//
//     if (
//       selectedFiles.length > MAX_FILES_LENGTH ||
//       uploadedFiles.length + selectedFiles.length > MAX_FILES_LENGTH
//     ) {
//       toast.current?.show({
//         severity: "warn",
//         summary: "Warning",
//         detail: tFileUpload("toast_max_files_warn", { quantity: MAX_FILES_LENGTH }),
//         life: 3000,
//       })
//
//       selectedFiles = selectedFiles.splice(0, MAX_FILES_LENGTH - uploadedFiles.length)
//     }
//
//     for (let i = 0; i < selectedFiles.length; i++) {
//       const newFile = selectedFiles[i]
//
//       const hasSameFile = uploadedFiles.some((f) => {
//         return f.fileData.name === newFile.name && f.fileData.size === newFile.size
//       })
//       if (hasSameFile) {
//         continue
//       }
//       if (newFile.size > MAX_FILE_SIZE) {
//         toast.current?.show({
//           severity: "warn",
//           summary: "Warning",
//           detail: tFileUpload("toast_max_size_warn", {
//             size: prettyBytes(MAX_FILE_SIZE, { locale }),
//           }),
//           life: 3000,
//         })
//         continue
//       }
//
//       filesTransformed.push(new UploadFile(newFile))
//     }
//
//     setUploadedFiles((prevFiles) => [...prevFiles, ...filesTransformed])
//   }
//
//   const onUploadedFileRemoveHandle = (uploadedFile: UploadFile) => {
//     setUploadedFiles((prevFiles) => {
//       const newState = [...prevFiles.filter((f) => f !== uploadedFile)]
//
//       if (newState.length === 0) {
//         resetDownloadUrl()
//       }
//
//       return newState
//     })
//   }
//
//   const onFilesClearHandle = () => {
//     setUploadedFiles([])
//     resetDownloadUrl()
//   }
//
//   useEffect(() => {
//     if (error) {
//       toast.current?.show({
//         severity: "error",
//         summary: "Error",
//         detail: error?.message ?? tFileUpload("toast_convert_error"),
//         life: 5000,
//       })
//     }
//   }, [error, toast, tFileUpload])
//
//   useEffect(() => {
//     if (downloadUrl) {
//       toast.current?.show({
//         severity: "success",
//         summary: "Success",
//         detail: tFileUpload("toast_convert_success"),
//         life: 3000,
//       })
//     }
//   }, [downloadUrl, toast, tFileUpload])
//
//   return (
//     <div className={"lg:max-w-[80vw] w-full m-auto p-10"}>
//       <Toast
//         ref={toast}
//         onRemove={resetError}
//       />
//       <DataTable
//         value={uploadedFiles}
//         tableStyle={{ width: "100%" }}
//         stripedRows
//         header={
//           <TableHeader
//             isLoading={isLoading}
//             downloadUrl={downloadUrl}
//             hasFiles={uploadedFiles.length > 0}
//             isSelectFilesLocked={uploadedFiles.length >= MAX_FILES_LENGTH}
//             onFileUpload={onFileUploadHandle}
//             onFilesClear={onFilesClearHandle}
//             onConvert={onConvertHandle}
//           />
//         }
//         emptyMessage={<EmptyTemplate />}
//       >
//         <Column
//           field="fileData.name"
//           className={"max-w-[40vw]"}
//           header={tFileUpload("file_name")}
//           body={({ fileData }) => {
//             return (
//               <p className={"w-full text-ellipsis overflow-hidden white-space-nowrap"}>
//                 {fileData.name}
//               </p>
//             )
//           }}
//         />
//         <Column
//           field="fileData.size"
//           header={tFileUpload("file_size")}
//           body={({ fileData }) => prettyBytes(fileData.size, { locale })}
//         />
//         <Column
//           field="fileData.type"
//           header={tFileUpload("file_type")}
//         />
//         <Column
//           field="convertTo"
//           header={tFileUpload("convert_to")}
//           body={(uploadedFile: UploadFile) => (
//             <ConvertSelect
//               uploadedFile={uploadedFile}
//               onConvertTargetChange={onConvertTargetChangeHandle}
//             />
//           )}
//         />
//         <Column
//           body={(uploadedFile) => (
//             <Button
//               type="button"
//               icon="pi pi-times"
//               className="p-button-outlined p-button-rounded p-button-danger w-8 h-8 m-auto hover:bg-red-500 hover:text-white"
//               onClick={() => onUploadedFileRemoveHandle(uploadedFile)}
//             />
//           )}
//         />
//       </DataTable>
//     </div>
//   )
// }
