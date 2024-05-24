import { useState } from "react"
import { IUploadedFile } from "../types"
import { sendFilesToConvert } from "../api"

export const useSendSelectedFiles = () => {
  const [isLoading, setIsLoading] = useState<boolean>()
  const [isError, setIsError] = useState<unknown>()

  const sendFiles = async (files: IUploadedFile[]) => {
    setIsLoading(true)
    try {
      await sendFilesToConvert(files)
    } catch (error) {
      console.log(error)
      setIsError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, isError, sendFiles }
}
