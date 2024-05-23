import { IUploadedFile } from "../../types"

export interface IConvertSelectProps {
  uploadedFile: IUploadedFile
  onConvertToChange: (uploadedFile: IUploadedFile) => void
}
