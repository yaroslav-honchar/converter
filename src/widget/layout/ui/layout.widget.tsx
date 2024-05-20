import React from "react"
import { ILayoutRootProps } from "./layout.props"
import { Header } from "@/entities/header"
import { Footer } from "@/entities/footer"
import { ClientProvider, ServerProvider } from "@/app/providers"

export function LayoutRoot({ children, params: { locale } }: ILayoutRootProps) {
  return (
    <html lang={locale}>
      <body>
        <ServerProvider locale={locale}>
          <ClientProvider>
            <div className={"flex flex-col min-h-screen"}>
              <Header />
              <main className={"flex-grow"}>{children}</main>
              <Footer />
            </div>
          </ClientProvider>
        </ServerProvider>
      </body>
    </html>
  )
}
