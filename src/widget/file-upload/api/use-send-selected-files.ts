import { useState } from "react"
import { ConvertService } from "@/shared/services"
import { AxiosError, AxiosResponse } from "axios"

export const useSendSelectedFiles = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setIsError] = useState<null | AxiosError>(null)
  const [downloadUrls, setDownloadUrls] = useState<string[]>([])

  const sendFilesToConvert = async (data: FormData): Promise<void> => {
    setIsLoading(true)

    ConvertService.convert(data)
      .then((res: AxiosResponse<Blob>): void => {
        console.log(res.data)

        setIsError(null)
        setDownloadUrls((prevUrls: string[]): string[] => {
          return [...prevUrls, URL.createObjectURL(res.data)]
        })
      })
      .catch((err: AxiosError): void => {
        setIsError(err)
      })
  }

  const resetDownloadUrl = (): void => {
    setDownloadUrls([])
  }

  const resetError = (): void => {
    setIsError(null)
  }

  return { downloadUrls, isLoading, error, sendFilesToConvert, resetDownloadUrl, resetError }
}
