import { authenticate } from "./authenticate"
import { NextRequest, NextResponse } from "next/server"
import { CustomFile } from "telegram/client/uploads"
import { getFilenameFromHeaders } from "@/shared/lib"

/**
 * This function handles POST requests to send an archive file to a Telegram user.
 * It first authenticates the Telegram client, then extracts the username and archive file from the request data.
 * It then sends a message to the specified user with the archive file attached.
 * If an error occurs during this process, it disconnects the client and returns a 500 response with the error message.
 * If the process completes successfully, it disconnects the client and returns a JSON response indicating success.
 *
 * @param {NextRequest} req - The Next.js request object.
 * @returns {Promise<Response>} - A promise that resolves to a Next.js response object.
 */
export async function POST(req: NextRequest): Promise<Response> {
  // Authenticate the Telegram client
  const client = await authenticate()

  // Extract the archive name from the request headers
  const archiveName = getFilenameFromHeaders(req.headers)

  try {
    // Extract the username and archive file from the request data
    const data = await req.formData()
    const username = data.get("username") as string
    const archiveBlob = data.get("archive") as Blob

    // Create a new CustomFile object with the archive data
    const file = new CustomFile(
      archiveName || `${new Date().getDate()}.zip`,
      archiveBlob.size,
      "",
      new Buffer(await archiveBlob.arrayBuffer()),
    )

    // Connect to the Telegram client and send the message with the file attached
    await client.connect()
    await client.sendMessage(username, {
      message: `The file(-s) were been converted at ${new Date()}. With Convertage service.\n Thank you, have a nice day☺️`,
      file,
    })
  } catch (error: unknown) {
    // If an error occurs, disconnect the client and return a 500 response with the error message
    await client.disconnect()
    const errorMessage = error instanceof Error ? error.message : error

    return new NextResponse(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } finally {
    // Disconnect the client
    await client.disconnect()
  }

  // Return a JSON response indicating success
  return Response.json({ message: "Files sent successfully" })
}
