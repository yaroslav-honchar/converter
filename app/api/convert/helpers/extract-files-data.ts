import { NextRequest } from "next/server"
import { ExtractedFileType } from "../types"

type ExtractedFileEntity = "file" | "target"

/**
 * Extracts file data from a Next.js request object.
 *
 * This function takes a Next.js request object and extracts file data from it.
 * The file data is returned as an array of objects, where each object contains a file and its corresponding target.
 *
 * @param {NextRequest} req - The Next.js request object.
 * @returns {Promise<ExtractedFileType[]>} - A promise that resolves to an array of file data objects.
 */
export const extractFilesData = async (req: NextRequest): Promise<ExtractedFileType[]> => {
  const data = await req.formData()
  const extractedFiles: ExtractedFileType[] = []
  const files: Record<string, File> = {}
  const targets: Record<string, string> = {}

  // Iterate over the form data entries
  for (const [key, value] of data.entries()) {
    const [entity, id] = key.split("_") as [ExtractedFileEntity, string]
    // If the entity is a file, add it to the files object
    if (entity === "file") {
      files[id] = value as File
    }
    // If the entity is a target, add it to the targets object
    else if (entity === "target") {
      targets[id] = value as string
    }
  }

  // Iterate over the files object
  for (const filesKey in files) {
    const file = files[filesKey]
    const target = targets[filesKey]

    // Push each file and its corresponding target to the extractedFiles array
    extractedFiles.push({ file, target })
  }

  // Return the extractedFiles array
  return extractedFiles
}
