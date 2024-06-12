import { getTelegramConfig } from "@/_app/configs"
import * as fs from "node:fs"
import { TelegramClient } from "telegram"
import { StringSession } from "telegram/sessions"
import { text } from "input"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const sessionPath = path.join(__dirname, "session.txt")

/**
 * This function is used to authenticate the Telegram client.
 * It first tries to read the session from a file or from the environment variables.
 * If it fails, it creates a new session by asking the user to input the code received on their phone.
 * The new session is then saved to a file for future use.
 *
 * @returns {Promise<TelegramClient>} The authenticated Telegram client.
 */
export const authenticate = async () => {
  const { telegramApiID, telegramApiHash, telegramPhone, telegramSession } = getTelegramConfig()
  let stringSession = telegramSession

  try {
    // Try to read the session from a file or from the environment variables
    stringSession = telegramSession || fs.readFileSync(sessionPath, "utf-8")

    // Return the authenticated Telegram client
    return new TelegramClient(new StringSession(stringSession), telegramApiID, telegramApiHash, {
      connectionRetries: 5,
    })
  } catch (err) {
    // If reading the session fails, create a new session
    const client = new TelegramClient(new StringSession(), telegramApiID, telegramApiHash, {
      connectionRetries: 5,
    })

    await client.start({
      phoneNumber: async () => telegramPhone,
      phoneCode: async () => await text("Please enter the code you received: "),
      onError: (err) => console.log(err),
    })

    // Save the new session to a file for future use
    const stringSession: string = client.session.save()!
    try {
      fs.writeFileSync(sessionPath, stringSession, "utf-8")
    } catch (err) {
      console.error("Error writing session to file:", err)
    }

    // Return the authenticated Telegram client
    return client
  }
}
