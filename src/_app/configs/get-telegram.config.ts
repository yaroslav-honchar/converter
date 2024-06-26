export const getTelegramConfig = () => {
  const botToken = process.env.TELEGRAM_BOT_TOKEN

  if (!botToken) {
    throw new Error("[botToken] did not found in environment configuration")
  }

  return { botToken }
}
