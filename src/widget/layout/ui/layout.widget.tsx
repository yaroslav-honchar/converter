import React from "react"
import { ILayoutRootProps } from "./layout.props"
import { Header } from "@/features/header"
import { Footer } from "@/features/footer"
import { ClientProvider, ServerProvider } from "@/_app/providers"

export function LayoutRoot({ children, params: { locale } }: ILayoutRootProps) {
  return (
    <html lang={locale}>
      <body className={"bg-primary"}>
        <ServerProvider locale={locale}>
          <ClientProvider>
            <div className={"flex flex-col min-h-screen"}>
              <Header />
              <main className={"flex-grow flex flex-col"}>{children}</main>
              <Footer />
            </div>
          </ClientProvider>
        </ServerProvider>
      </body>
    </html>
  )
}
