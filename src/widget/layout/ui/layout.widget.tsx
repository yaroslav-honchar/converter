import React from "react"
import { ILayoutRootProps } from "./layout.props"
import { Header } from "@/entities/header"
import { Footer } from "@/entities/footer"

export function LayoutRoot({ children }: ILayoutRootProps) {
  return (
    <html lang={"en"}>
      <body>
        <div className={"flex flex-col min-h-screen"}>
          <Header />
          <main className={"flex-grow"}>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
