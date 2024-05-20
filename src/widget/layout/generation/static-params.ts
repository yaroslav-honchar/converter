import { localeConfig } from "@/app/localization"

export function generateStaticParams() {
  return localeConfig.locales.map((locale: string) => ({ locale }))
}
