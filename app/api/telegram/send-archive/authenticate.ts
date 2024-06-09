import { getTelegramConfig } from "@/_app/configs"
import * as fs from "node:fs"
import { TelegramClient } from "telegram"
import { StringSession } from "telegram/sessions"
import { text } from "input"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const sessionPath = path.join(__dirname, "session.txt")

export const authenticate = async () => {
  const { telegramApiID, telegramApiHash, telegramPhone, telegramSession } = getTelegramConfig()
  let stringSession = telegramSession

  try {
    stringSession = telegramSession || fs.readFileSync(sessionPath, "utf-8")

    return new TelegramClient(new StringSession(stringSession), telegramApiID, telegramApiHash, {
      connectionRetries: 5,
    })
  } catch (err) {
    const client = new TelegramClient(new StringSession(), telegramApiID, telegramApiHash, {
      connectionRetries: 5,
    })

    await client.start({
      phoneNumber: async () => telegramPhone,
      phoneCode: async () => await text("Please enter the code you received: "),
      onError: (err) => console.log(err),
    })

    const stringSession: string = client.session.save()!
    try {
      fs.writeFileSync(sessionPath, stringSession, "utf-8")
    } catch (err) {
      console.error("Error writing session to file:", err)
    }

    return client
  }
}
