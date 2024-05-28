import { useState } from "react"
import { sendFilesToConvert } from "../api"
import { UploadFile } from "@/shared/lib"

export const useSendSelectedFiles = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setIsError] = useState<unknown>(false)
  const [downloadUrl, setDownloadUrl] = useState<string | undefined>()

  const sendFiles = (files: UploadFile[]): void => {
    setIsLoading(true)

    sendFilesToConvert(files)
      .then((blob: Blob): void => {
        setDownloadUrl(URL.createObjectURL(blob))
      }, setIsError)
      .catch(setIsError)
      .finally((): void => {
        setIsLoading(false)
      })
  }

  const resetDownloadUrl = (): void => {
    setDownloadUrl(undefined)
  }

  return { downloadUrl, isLoading, error, sendFiles, resetDownloadUrl }
}
