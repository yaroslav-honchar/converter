import cn from "classnames"
import React from "react"

import { interFont, urbanistFont } from "@/_app/fonts"
import { ClientProviders, ServerProviders } from "@/_app/providers"

import { DialogCookie } from "@/features/dialog-cookie"
import { Footer } from "@/features/footer"
import { Header } from "@/features/header"

import { BackgroundVideo } from "@/entities/background-video"

import { ILayoutRootProps } from "./layout.props"

export function LayoutRoot({ children, params: { locale } }: ILayoutRootProps) {
  return (
    <html lang={locale}>
      <body
        className={cn(urbanistFont.variable, interFont.variable, interFont.className, "bg-primary")}
      >
        <ServerProviders locale={locale}>
          <ClientProviders>
            <div className={"flex flex-col min-h-screen relative"}>
              <BackgroundVideo />
              <Header />
              <main className={"flex-grow flex flex-col relative z-10"}>{children}</main>
              <Footer />
              <DialogCookie />
            </div>
          </ClientProviders>
        </ServerProviders>
      </body>
    </html>
  )
}
