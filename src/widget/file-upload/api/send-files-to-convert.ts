import { UploadFile } from "@/shared/lib"

export const sendFilesToConvert = async (files: UploadFile[]) => {
  return fetch("/api/convert-image", {
    method: "POST",
    body: JSON.stringify(files),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed request")
    }

    return response.blob()
  })
}
