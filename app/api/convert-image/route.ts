import { NextRequest, NextResponse } from "next/server"
import sharp, { FormatEnum } from "sharp"
import archiver from "archiver"
import path from "node:path"
import { PassThrough } from "node:stream"
import streamToBlob from "stream-to-blob"
import { UploadFile } from "@/shared/lib"

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const data: UploadFile[] = await req.json()
    const passThrough$ = new PassThrough()

    const archive = archiver("zip", {
      zlib: { level: 9 },
    })

    archive.on("error", (err: archiver.ArchiverError): void => {
      throw err
    })

    passThrough$.on("error", (err: Error): void => {
      throw err
    })

    for (const file of data) {
      const {
        fileBase64,
        fileData: { name: fileName },
        convertTarget,
      } = file

      const buffer = Buffer.from(fileBase64.split(",")[1], "base64")

      const fileExtName = path.extname(fileName)
      const newFileName = fileName.replace(RegExp(fileExtName), "")

      const convertedImageBuffer = await sharp(buffer)
        .toFormat(convertTarget as keyof FormatEnum)
        .toBuffer()

      archive.append(convertedImageBuffer, { name: newFileName + `.${convertTarget}` })
    }

    await archive.finalize()

    archive.pipe(passThrough$)

    const blob = await streamToBlob(passThrough$)

    return new NextResponse(blob, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="files.zip"',
      },
    })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : error

    return new NextResponse(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
