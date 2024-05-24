import { NextRequest } from "next/server"
import { IUploadedFile } from "@/widget/file-upload/types"
// import { promises as fs } from "fs"
// import path from "path"
// import { fileURLToPath } from "url"

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

export async function POST(req: NextRequest) {
  try {
    const data: IUploadedFile[] = await req.json()
    console.log(data)

    data.forEach((file: IUploadedFile) => {
      const buffer = new Buffer(file.fileBase64.split(",")[1], "base64")
      console.log(buffer)
      // Do something with the buffer
    })

    return Response.json({ message: "File uploaded successfully" })
  } catch (error) {
    return Response.json({ error: "Error handling file upload" })
  }
}
