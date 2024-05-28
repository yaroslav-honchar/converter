export const localeConfig: ILocaleConfig = {
  locales: ["en", "uk"],
  defaultLocale: "en",
  localeDetection: false,
  localePrefix: "never",
}

interface ILocaleConfig {
  locales: string[]
  defaultLocale: string
  localeDetection?: boolean
  localePrefix: "as-needed" | "always" | "never"
}
