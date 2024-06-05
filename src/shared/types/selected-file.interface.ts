import { FormatEnum } from "sharp"

export interface ISelectedFile {
  file: File
  convertTarget: keyof FormatEnum | null
}
