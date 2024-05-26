import { NextRequest } from "next/server"
import { IUploadedFile } from "@/widget/file-upload/types"
import sharp, { FormatEnum } from "sharp"
// import { promises as fs } from "fs"
// import path from "path"
// import { fileURLToPath } from "url"

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

export async function POST(req: NextRequest) {
  try {
    const data: IUploadedFile[] = await req.json()
    // console.log(data)
    for (const file of data) {
      const buffer = Buffer.from(file.fileBase64.split(",")[1], "base64")
      console.log(buffer)

      const convertedImage = await sharp(buffer).toFormat("webp").toBuffer()

      console.log("convertedImage: ", convertedImage)
    }

    return Response.json({ message: "File uploaded successfully" })
  } catch (error) {
    return Response.json({ error: "Error handling file upload" })
  }
}

/*
 * Needed format data:
 * - exist file properties File
 * - base64 data
 * - format target
 * */
