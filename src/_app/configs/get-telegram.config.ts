export const getTelegramConfig = () => {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatID = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatID) {
    throw new Error("[botToken | chatID] did not found in environment configuration")
  }

  return {
    botToken,
    chatID,
  }
}
