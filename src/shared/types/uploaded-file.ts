import { FormatEnum } from "sharp"

export interface IUploadedFile {
  file: File
  fileBase64: keyof FormatEnum
  convertTo: string | null
}
