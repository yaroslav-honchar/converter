import { AxiosHeaders, AxiosResponse } from "axios"

export const getFilenameFromHeaders = (
  headers: AxiosResponse["headers"] | Headers,
): string | null => {
  if (!headers) {
    return null
  }
  let disposition: string | undefined | null

  if (headers instanceof Headers) {
    disposition = headers.get("content-disposition")
  } else if (headers instanceof AxiosHeaders) {
    disposition = headers["content-disposition"]
  }

  if (!disposition) {
    return null
  }

  return disposition.split("=")[1].replace(/"/g, "")
}
