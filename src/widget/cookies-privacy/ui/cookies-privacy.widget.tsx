"use client"

import React from "react"
import { useLocale } from "use-intl"
import { useTranslations } from "next-intl"

export const CookiesPrivacyContent: React.FC = () => {
  const locale = useLocale()
  const tCookiesPrivacyContent = useTranslations("CookiesPrivacyContent")
  const lastUpdate = new Date("2024.09.06")
  const formattedDate = lastUpdate.toLocaleDateString(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })

  return (
    <section className={"py-16"}>
      <div className={"container max-w-4xl"}>
        <article
          className={"prose lg:prose-md w-full max-w-full"}
          dangerouslySetInnerHTML={{
            __html: tCookiesPrivacyContent.raw("content").replace(/\{lastModify\}/, formattedDate),
          }}
        />
      </div>
    </section>
  )
}