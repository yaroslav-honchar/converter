import { TelegramGroupIdContent } from "@/widget/telegram-group-id-content"

import { unstable_setRequestLocale } from "next-intl/server"

import { IGetTelegramGroupIdPageProps } from "./get-telegram-group-id.props"

export function GetTelegramGroupIdPage({ params: { locale } }: IGetTelegramGroupIdPageProps) {
  unstable_setRequestLocale(locale)

  return <TelegramGroupIdContent />
}
