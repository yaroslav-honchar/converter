import React from "react"
import { unstable_setRequestLocale } from "next-intl/server"
import { CookiesPrivacyContent } from "@/widget/cookies-privacy"
import { ICookiesPrivacyPageProps } from "./cookie-privacy.props"

export function CookiesPrivacyPage({ params: { locale } }: ICookiesPrivacyPageProps) {
  unstable_setRequestLocale(locale)

  return <CookiesPrivacyContent />
}
