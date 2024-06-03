import { NextRequest } from "next/server"
import { ExtractedFileType } from "../types"

type ExtractedFileEntity = "file" | "target"

export const extractFilesData = async (req: NextRequest): Promise<ExtractedFileType[]> => {
  const data = await req.formData()
  const extractedFiles: ExtractedFileType[] = []
  const files: Record<string, File> = {}
  const targets: Record<string, string> = {}

  for (const [key, value] of data.entries()) {
    const [entity, id] = key.split("_") as [ExtractedFileEntity, string]
    if (entity === "file") {
      files[id] = value as File
    } else if (entity === "target") {
      targets[id] = value as string
    }
  }

  for (const filesKey in files) {
    const file = files[filesKey]
    const target = targets[filesKey]

    extractedFiles.push({ file, target })
  }

  return extractedFiles
}
