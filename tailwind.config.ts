import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        white: "#ffffff",
      },
      fontFamily: {
        urbanist: ["Urbanist", "sans-serif"],
      },
    },
  },
  plugins: [],
}
export default config
