import { useState } from "react"
import { ConvertService } from "@/shared/services"
import { AxiosError, AxiosResponse } from "axios"
import { getTime } from "@/shared/lib"
import { IConvertHistoryItem } from "@/shared/types"

export const useSendSelectedFiles = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setIsError] = useState<null | AxiosError>(null)
  const [convertHistory, setConvertHistory] = useState<IConvertHistoryItem[]>([])

  const sendFilesToConvert = async (data: FormData): Promise<void> => {
    setIsLoading(true)

    ConvertService.convert(data)
      .then(async (res: AxiosResponse<Blob>): Promise<void> => {
        const { data } = res

        setIsError(null)
        setConvertHistory((prevUrls: IConvertHistoryItem[]): IConvertHistoryItem[] => {
          const historyItem: IConvertHistoryItem = {
            name: new Date().getTime() + ".zip",
            url: URL.createObjectURL(data),
            convertedTime: getTime(),
            size: data.size,
          }

          return [historyItem, ...prevUrls]
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

  const resetConvertHistory = (): void => {
    setConvertHistory([])
  }

  const resetError = (): void => {
    setIsError(null)
  }

  return { convertHistory, isLoading, error, sendFilesToConvert, resetConvertHistory, resetError }
}
