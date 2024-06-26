import { useTranslations } from "next-intl"
import React from "react"

export const TelegramGroupIdContent = () => {
  const tTelegramGroupIdContent = useTranslations("TelegramGroupIdContent")

  return (
    <section className="py-16">
      <div className="container max-w-4xl">
        <article
          className="prose lg:prose-md w-full max-w-full"
          dangerouslySetInnerHTML={{ __html: tTelegramGroupIdContent.raw("content") }}
        />
      </div>
    </section>
  )
}
