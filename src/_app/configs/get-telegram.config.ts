export const getTelegramConfig = () => {
  const telegramApiID = Number(process.env.TELEGRAM_API_ID)
  const telegramApiHash = process.env.TELEGRAM_API_HASH
  const telegramPhone = process.env.TELEGRAM_PHONE
  const telegramSession = process.env.TELEGRAM_SESSION

  if (!telegramApiID || Number.isNaN(telegramApiID)) {
    throw new Error(
      "[telegramApiID] did not found in environment configuration  or found invalid value",
    )
  }

  if (!telegramApiHash) {
    throw new Error("[telegramApiHash] did not found in environment configuration")
  }

  if (!telegramPhone) {
    throw new Error("[telegramPhone] did not found in environment configuration")
  }

  if (!telegramSession) {
    throw new Error(
      "[telegramSession] did not found in environment configuration or found invalid value",
    )
  }

  return {
    telegramApiID,
    telegramApiHash,
    telegramPhone,
    telegramSession,
  }
}
