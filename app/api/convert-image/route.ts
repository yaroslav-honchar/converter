import { NextRequest, NextResponse } from "next/server"
import sharp, { FormatEnum } from "sharp"
import { UploadFile } from "@/shared/lib"
import archiver from "archiver"
import path from "node:path"
import { PassThrough } from "node:stream"
import streamToBlob from "stream-to-blob"

export async function POST(req: NextRequest) {
  try {
    const data: UploadFile[] = await req.json()

    const passThrough$ = new PassThrough()

    const archive = archiver("zip", {
      zlib: { level: 9 },
    })

    for (const file of data) {
      const buffer = Buffer.from(file.fileBase64.split(",")[1], "base64")
      const newFileName = file.fileData.name.replace(RegExp(path.extname(file.fileData.name)), "")

      const convertedImageBuffer = await sharp(buffer)
        .toFormat(file.convertTarget as keyof FormatEnum)
        .toBuffer()

      archive.append(convertedImageBuffer, { name: newFileName + `.${file.convertTarget}` })
    }

    archive.finalize()

    archive.pipe(passThrough$)

    const blob = await streamToBlob(passThrough$)

    return new NextResponse(blob, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="files.zip"',
      },
    })
  } catch (error) {
    return Response.json({ error: "Error handling file upload" })
  }
}
