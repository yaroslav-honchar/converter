import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          100: "#CCE6F9",
          200: "#99CEEF",
          300: "#66B6E5",
          400: "#339EDB",
          500: "#0A81DA",
          600: "#0869AF",
          700: "#065083",
          800: "#043857",
          900: "#021F2C",
        },
      },
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
