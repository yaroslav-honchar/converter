import { UploadFile } from "@/shared/lib"
import { FormatEnum } from "sharp"

export interface IConvertSelectProps {
  uploadedFile: UploadFile
  onConvertTargetChange: (uploadedFile: UploadFile, formatTarget: keyof FormatEnum) => void
}
