import React from "react"
import { ILayoutRootProps } from "./layout.props"
import { Header } from "@/features/header"
import { Footer } from "@/features/footer"
import { ClientProvider, ServerProvider } from "@/_app/providers"
import { BackgroundVideo } from "@/entities/background-video"
import cn from "classnames"
import { interFont, urbanistFont } from "@/_app/fonts"
import { Button } from "primereact/button"

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
              <main className={"flex-grow flex flex-col"}>
                <Button label="Primary" />
                <Button
                  label="Secondary"
                  severity="secondary"
                />
                <Button
                  label="Success"
                  severity="success"
                />
                <Button
                  label="Info"
                  severity="info"
                />
                <Button
                  label="Warning"
                  severity="warning"
                />
                <Button
                  label="Help"
                  severity="help"
                />
                <Button
                  label="Danger"
                  severity="danger"
                />
                {children}
              </main>
              <Footer />
            </div>
          </ClientProvider>
        </ServerProvider>
      </body>
    </html>
  )
}
