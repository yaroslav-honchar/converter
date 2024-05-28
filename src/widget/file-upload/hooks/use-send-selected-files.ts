import { useState } from "react"
import { sendFilesToConvert } from "../api"
import { UploadFile } from "@/shared/lib"

export const useSendSelectedFiles = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<unknown>(false)
  const [downloadUrl, setDownloadUrl] = useState<string | undefined>()

  const sendFiles = async (files: UploadFile[]) => {
    setIsLoading(true)
    try {
      const blob = await sendFilesToConvert(files)
      setDownloadUrl(URL.createObjectURL(blob))
    } catch (error) {
      console.log(error)
      setIsError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const resetDownloadUrl = () => {
    setDownloadUrl(undefined)
  }

  return { downloadUrl, isLoading, isError, sendFiles, resetDownloadUrl }
}
