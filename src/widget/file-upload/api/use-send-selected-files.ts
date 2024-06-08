import { useState } from "react"
import { ConvertService } from "@/shared/services"
import { AxiosError, AxiosResponse } from "axios"
import { getFilenameFromHeaders, getTime } from "@/shared/lib"
import { IConvertHistoryItem } from "@/shared/types"

export const useSendSelectedFiles = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setIsError] = useState<null | AxiosError>(null)
  const [convertHistory, setConvertHistory] = useState<IConvertHistoryItem[]>([])

  const sendFilesToConvert = async (data: FormData): Promise<void> => {
    setIsLoading(true)

    ConvertService.convert(data)
      .then(async (res: AxiosResponse<Blob>): Promise<void> => {
        const { data, headers } = res
        const archiveName = getFilenameFromHeaders(headers)
        console.log(archiveName)

        const historyItem: IConvertHistoryItem = {
          name: archiveName || `${new Date().getDate()}.zip`,
          url: URL.createObjectURL(data),
          convertedTime: getTime(),
          size: data.size,
        }

        setConvertHistory((prevUrls: IConvertHistoryItem[]): IConvertHistoryItem[] => [
          historyItem,
          ...prevUrls,
        ])

        setIsError(null)
      })
      .catch((err: AxiosError): void => {
        console.log(err)
        setIsError(err)
      })
      .finally((): void => {
        setIsLoading(false)
      })
  }

  const resetConvertHistory = (): void => {
    setConvertHistory([])
  }

  const resetError = (): void => {
    setIsError(null)
  }

  return { convertHistory, isLoading, error, sendFilesToConvert, resetConvertHistory, resetError }
}
