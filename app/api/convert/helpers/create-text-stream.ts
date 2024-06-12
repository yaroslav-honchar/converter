import { Readable } from "node:stream"

/**
 * Creates a readable stream from a string.
 *
 * @param {string} content - The content to be converted into a stream.
 * @returns {Readable} - The readable stream.
 */
export const createTextStream = (content: string): Readable => {
  const stream = new Readable()
  stream.push(content)
  stream.push(null)
  return stream
}
