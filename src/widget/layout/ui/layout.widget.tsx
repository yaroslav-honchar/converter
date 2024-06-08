import React from "react"
import { ILayoutRootProps } from "./layout.props"
import { Header } from "@/features/header"
import { Footer } from "@/features/footer"
import { ClientProvider, ServerProvider } from "@/_app/providers"
import { BackgroundVideo } from "@/entities/background-video"
import cn from "classnames"
import { interFont, urbanistFont } from "@/_app/fonts"
import { DialogCookie } from "@/features/dialog-cookie"

export function LayoutRoot({ children, params: { locale } }: ILayoutRootProps) {
  return (
    <html lang={locale}>
      <body
        className={cn(urbanistFont.variable, interFont.variable, interFont.className, "bg-primary")}
      >
        <ServerProvider locale={locale}>
          <ClientProvider>
            <div className={"flex flex-col min-h-screen relative"}>
              <BackgroundVideo />
              <Header />
              <main className={"flex-grow flex flex-col relative z-10"}>{children}</main>
              <Footer />
              <DialogCookie />
            </div>
          </ClientProvider>
        </ServerProvider>
      </body>
    </html>
  )
}
