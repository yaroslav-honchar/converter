import archiver, { ArchiverError } from "archiver"
import path from "node:path"
import { PassThrough } from "node:stream"
import sharp, { FormatEnum } from "sharp"
import streamToBlob from "stream-to-blob"

import { createResponseHeaders } from "./helpers/create-response-headers"
import { NextRequest, NextResponse } from "next/server"

import { createTextStream, extractFilesData } from "./helpers"

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const errorsForUser: string[] = []
    const extractedFiles = await extractFilesData(req)

    const passThrough$ = new PassThrough()

    const archive = archiver("zip", {
      zlib: { level: 9 },
    })

    archive.on("error", (err: ArchiverError): void => {
      throw err
    })

    passThrough$.on("error", (err: Error): void => {
      throw err
    })

    for (const { file, target } of extractedFiles) {
      if (!target) {
        errorsForUser.push(
          `${errorsForUser.length + 1}. File "${file.name}" was been skip, because has no target format selected.`,
        )
        continue
      }

      const fileName = file.name
      // const fileType = file.type.startsWith("image/")
      const fileBuffer = Buffer.from(await file.arrayBuffer())

      const fileExtName = path.extname(fileName)
      const newFileName = fileName.replace(RegExp(fileExtName), "")

      const convertedImageBuffer = await sharp(fileBuffer)
        .toFormat(target as keyof FormatEnum)
        .toBuffer()

      archive.append(convertedImageBuffer, { name: newFileName + `.${target}` })
    }

    if (errorsForUser.length) {
      const errorText = errorsForUser.join("\n")
      archive.append(createTextStream(errorText), { name: "errors.txt" })
    }

    await archive.finalize()

    archive.pipe(passThrough$)

    const blob = await streamToBlob(passThrough$)
    const archiveName = new Date().getTime() + ".zip"

    return new NextResponse(blob, {
      headers: createResponseHeaders(archiveName),
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
