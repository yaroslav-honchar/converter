import { UploadFile } from "@/shared/lib"

export const sendFilesToConvert = async (files: UploadFile[]) => {
  const res = await fetch("/api/convert-image", {
    method: "POST",
    body: JSON.stringify(files),
    headers: {
      "Content-Type": "application/json",
    },
  })

  return await res.blob()
}
