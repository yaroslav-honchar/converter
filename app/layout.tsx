import "primereact/resources/themes/lara-dark-cyan/theme.css"
import "@/app/styles/main.scss"

import React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  icons: "/icon.png",
}

export default function Layout({ children }: React.PropsWithChildren) {
  return children
}
