import React, { PropsWithChildren } from "react"
import { unstable_setRequestLocale } from "next-intl/server"
import { NextIntlClientProvider, useMessages } from "next-intl"

export const ServerProvider: React.FC<PropsWithChildren & { locale: string }> = ({
  children,
  locale,
}) => {
  unstable_setRequestLocale(locale)
  const messages = useMessages()

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
    >
      {children}
    </NextIntlClientProvider>
  )
}
