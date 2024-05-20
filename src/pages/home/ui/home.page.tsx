import { unstable_setRequestLocale } from "next-intl/server"
import { IHomeProps } from "@/pages/home/ui/home.props"
import { useTranslations } from "next-intl"

export function HomePage({ params: { locale } }: IHomeProps) {
  unstable_setRequestLocale(locale)
  const tCommon = useTranslations("Common")
  return (
    <div>
      <h1>{tCommon("hello-world")}</h1>
    </div>
  )
}
