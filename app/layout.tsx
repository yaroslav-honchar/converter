import "primereact/resources/themes/lara-dark-cyan/theme.css"
import "@/app/styles/main.scss"

import type { Metadata } from "next"
import { PropsWithChildren } from "react"

export const metadata: Metadata = {
  title: "",
  description: "",
}

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return children
}
