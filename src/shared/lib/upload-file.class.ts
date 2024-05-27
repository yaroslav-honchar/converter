import { FormatEnum } from "sharp"
import { UploadedFileData } from "@/shared/types"

type UploadFileOptions = {
  onBase64Ready?: (event: ProgressEvent<FileReader>) => void
  onBase64Error?: (event: ProgressEvent<FileReader>) => void
}

export class UploadFile {
  fileData: UploadedFileData
  convertTarget: keyof FormatEnum | null
  fileBase64: string

  constructor(file: File, options?: UploadFileOptions) {
    this.convertTarget = null

    this.fileData = {
      name: file.name,
      size: file.size,
      type: file.type,
    }

    this.fileBase64 = ""

    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = (event: ProgressEvent<FileReader>) => {
      this.fileBase64 = event.target?.result as string

      options && options.onBase64Ready && options.onBase64Ready(event)
    }

    reader.onerror = (event: ProgressEvent<FileReader>) => {
      options && options.onBase64Error && options.onBase64Error(event)
    }
  }

  setConvertTarget = (value: keyof FormatEnum | null) => {
    this.convertTarget = value
  }
}
