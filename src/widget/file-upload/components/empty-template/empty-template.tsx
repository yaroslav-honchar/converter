import { useTranslations } from "next-intl"
import React from "react"

export const EmptyTemplate: React.FC = () => {
  const tFileUpload = useTranslations("FileUpload")

  return <p className={"text-center"}>{tFileUpload("empty_list")}</p>
}
