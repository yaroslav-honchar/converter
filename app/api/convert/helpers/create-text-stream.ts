import { Readable } from "stream"

export const createTextStream = (content: string): Readable => {
  const stream = new Readable()
  stream.push(content)
  stream.push(null)
  return stream
}
