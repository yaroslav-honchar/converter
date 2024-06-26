import React from "react"

import { IHomeProps } from "@/_pages/home/ui/home.props"

import { FileUpload } from "@/widget/file-upload"

import { unstable_setRequestLocale } from "next-intl/server"

export function HomePage({ params: { locale } }: IHomeProps) {
  unstable_setRequestLocale(locale)

  return <FileUpload />
}
