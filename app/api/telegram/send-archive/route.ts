import { Telegraf } from "telegraf"

import { getTelegramConfig } from "@/_app/configs"

import { NextRequest, NextResponse } from "next/server"

const { botToken } = getTelegramConfig()

const bot = new Telegraf(botToken)

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const data = await req.formData()
    const chatID = data.get("chat_id") as string
    const archiveBlob = data.get("archive") as Blob
    if (!chatID || !archiveBlob) {
      return new Response("Missing chat_id or archive", { status: 400 })
    }

    await bot.telegram.sendDocument(
      chatID,
      {
        source: Buffer.from(await archiveBlob.arrayBuffer()),
        filename: "archive.zip",
      },
      {
        caption: `The file(-s) were been converted at ${new Date()}. With Convertage service.\n Thank you, have a nice day☺️`,
      },
    )

    return NextResponse.json({ message: "Files sent successfully" })
  } catch (error) {
    return new Response("Error with sending file to telegram", { status: 500 })
  }
}
