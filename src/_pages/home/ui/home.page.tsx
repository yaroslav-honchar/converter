import React from "react"
import { unstable_setRequestLocale } from "next-intl/server"
import { IHomeProps } from "@/_pages/home/ui/home.props"
import { FileUpload } from "@/widget/file-upload"

export function HomePage({ params: { locale } }: IHomeProps) {
  unstable_setRequestLocale(locale)

  return <FileUpload />
}
