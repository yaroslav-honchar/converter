import { AxiosError, AxiosResponse } from "axios"
import { useState } from "react"

import { getFilenameFromHeaders, getTime } from "@/shared/lib"
import { ConvertService } from "@/shared/services"
import { IConvertHistoryItem } from "@/shared/types"

type SendFilesToConvertOptionsType = {
  onSuccess?: () => void
  onError?: (err: AxiosError) => void
}

export const useSendSelectedFiles = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setIsError] = useState<null | AxiosError>(null)
  const [convertHistory, setConvertHistory] = useState<IConvertHistoryItem[]>([])

  const sendFilesToConvert = async (
    data: FormData,
    options: SendFilesToConvertOptionsType = {},
  ): Promise<void> => {
    setIsLoading(true)

    ConvertService.convert(data)
      .then(async (res: AxiosResponse<Blob>): Promise<void> => {
        const { data, headers } = res
        const archiveName = getFilenameFromHeaders(headers)

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
        options.onSuccess && options.onSuccess()
      })
      .catch((err: AxiosError): void => {
        console.log(err)
        setIsError(err)
        options.onError && options.onError(err)
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
