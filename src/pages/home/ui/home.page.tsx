import { unstable_setRequestLocale } from "next-intl/server"
import { IHomeProps } from "@/pages/home/ui/home.props"
import { FormUploadFile } from "@/entities/form-file-upload"

export function HomePage({ params: { locale } }: IHomeProps) {
  unstable_setRequestLocale(locale)

  return <FormUploadFile />
}
