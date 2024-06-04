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
      .then(async (res: AxiosResponse<Blob>): Promise<void> => {
        console.log(res)
        // const { data } = res

        setIsError(null)
        setDownloadUrls((prevUrls: string[]): string[] => {
          return [...prevUrls] // URL.createObjectURL(data)
        })
      })
      .catch((err: AxiosError): void => {
        console.log(err)
        setIsError(err)
      })
      .finally((): void => {
        setIsLoading(false)
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
