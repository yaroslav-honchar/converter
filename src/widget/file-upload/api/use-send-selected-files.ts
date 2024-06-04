import { useState } from "react"
import { ConvertService } from "@/shared/services"
import { AxiosError, AxiosResponse } from "axios"

export const useSendSelectedFiles = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setIsError] = useState<null | AxiosError>(null)
  const [downloadUrl, setDownloadUrl] = useState<string[] | undefined>()

  const sendFilesToConvert = async (data: FormData): Promise<void> => {
    setIsLoading(true)

    ConvertService.convert(data)
      .then((res: AxiosResponse<Blob>): void => {
        setIsError(null)
        console.log(res)
      })
      .catch((err: AxiosError): void => {
        setIsError(err)
      })
  }

  const resetDownloadUrl = (): void => {
    setDownloadUrl(undefined)
  }

  const resetError = (): void => {
    setIsError(null)
  }

  return { downloadUrl, isLoading, error, sendFilesToConvert, resetDownloadUrl, resetError }
}
