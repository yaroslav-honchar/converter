import { NextRequest } from "next/server"
import sharp from "sharp"
import { UploadFile } from "@/shared/lib"

export async function POST(req: NextRequest) {
  try {
    const data: UploadFile[] = await req.json()
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
