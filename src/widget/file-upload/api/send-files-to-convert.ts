import { IUploadedFile } from "@/widget/file-upload/types"

export const sendFilesToConvert = async (files: IUploadedFile[]) => {
  const res = await fetch("/api/convert-image", {
    method: "POST",
    body: JSON.stringify(files),
    headers: {
      "Content-Type": "application/json",
    },
  })

  return await res.json()
}
