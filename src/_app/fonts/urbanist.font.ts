import { Urbanist } from "next/font/google"

export const urbanistFont = Urbanist({
  subsets: ["latin"],
  weight: ["400"],
  preload: true,
  variable: "--ff-urbanist",
})
