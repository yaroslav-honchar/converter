import { FormatEnum } from "sharp"
import { ISelectedFile } from "@/shared/types"

export interface IConvertSelectProps {
  selectedFile: ISelectedFile
  onConvertTargetChange: (selectedFile: ISelectedFile, formatTarget: keyof FormatEnum) => void
}
