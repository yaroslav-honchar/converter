import { authenticate } from "./authenticate"
import { NextRequest, NextResponse } from "next/server"
import { CustomFile } from "telegram/client/uploads"
import { getFilenameFromHeaders } from "@/shared/lib"

export async function POST(req: NextRequest): Promise<Response> {
  const client = await authenticate()
  const archiveName = getFilenameFromHeaders(req.headers)

  try {
    const data = await req.formData()
    const username = data.get("username") as string
    const archiveBlob = data.get("archive") as Blob

    const file = new CustomFile(
      archiveName || `${new Date().getDate()}.zip`,
      archiveBlob.size,
      "",
      new Buffer(await archiveBlob.arrayBuffer()),
    )

    await client.connect()
    await client.sendMessage(username, {
      message: `The file(-s) were been converted at ${new Date()}. With Convertage service.\n Thank you, have a nice day☺️`,
      file,
    })
  } catch (error: unknown) {
    await client.disconnect()
    const errorMessage = error instanceof Error ? error.message : error

    return new NextResponse(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } finally {
    await client.disconnect()
    console.log(new Date())
  }

  return Response.json({ message: "Files sent successfully" })
}
