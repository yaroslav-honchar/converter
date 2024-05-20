export const localeConfig: ILocaleConfig = {
  locales: ["en", "uk"],
  defaultLocale: "en",
  localeDetection: true,
  localePrefix: "as-needed",
}

interface ILocaleConfig {
  locales: string[]
  defaultLocale: string
  localeDetection?: boolean
  localePrefix: "as-needed" | "always" | "never"
}
