import { FormatEnum } from "sharp"
import { ISelectedFile } from "@/widget/file-upload/types"

export interface IConvertSelectProps {
  selectedFile: ISelectedFile
  onConvertTargetChange: (selectedFile: ISelectedFile, formatTarget: keyof FormatEnum) => void
}
