import createMiddleware from "next-intl/middleware"
import { localeConfig } from "@/_app/localization"

const { localePrefix, locales, defaultLocale, localeDetection } = localeConfig

export default createMiddleware({
  locales,
  localePrefix,
  defaultLocale,
  localeDetection,
})

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|svg|img|videos|favicon.ico|icon.png|logo.png|logo.svg|apple-touch-icon.png|favicon.svg|images/books|icons|manifest).*)",
  ],
}
