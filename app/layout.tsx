// import "primereact/resources/themes/lara-dark-cyan/theme.css"
import type { Metadata } from "next"
import React from "react"

import "@/_app/styles/main.scss"

import "primeicons/primeicons.css"

export const metadata: Metadata = {
  icons: "/icon.png",
  title: "Convertage",
}

export default function Layout({ children }: React.PropsWithChildren) {
  return children
}
