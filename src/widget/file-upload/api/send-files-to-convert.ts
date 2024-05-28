import { UploadFile } from "@/shared/lib"

export const sendFilesToConvert = async (files: UploadFile[]) => {
  return fetch("/api/convert-image", {
    method: "POST",
    body: JSON.stringify(files),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (response) => {
    if (!response.ok) {
      const errorMessage = await response.json()
      throw new Error(errorMessage.error)
    }

    return response.blob()
  })
}
