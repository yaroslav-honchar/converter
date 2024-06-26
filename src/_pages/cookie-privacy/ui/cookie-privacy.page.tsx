import React from "react"

import { CookiesPrivacyContent } from "@/widget/cookies-privacy"

import { unstable_setRequestLocale } from "next-intl/server"

import { ICookiesPrivacyPageProps } from "./cookie-privacy.props"

export function CookiesPrivacyPage({ params: { locale } }: ICookiesPrivacyPageProps) {
  unstable_setRequestLocale(locale)

  return <CookiesPrivacyContent />
}
