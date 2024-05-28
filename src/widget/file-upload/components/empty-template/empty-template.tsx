import React from "react"
import { useTranslations } from "next-intl"

export const EmptyTemplate: React.FC = () => {
  const tFileUpload = useTranslations("FileUpload")

  return <p className={"text-center"}>{tFileUpload("empty_list")}</p>
}
