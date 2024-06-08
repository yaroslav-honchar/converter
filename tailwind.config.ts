import type { Config } from "tailwindcss"
import type Prose from "@tailwindcss/typography"

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            "*": {
              color: "#ffffff",
              width: "100%",
            },
            a: {
              textDecoration: "underline",
            },
          },
        },
      },
      backdropBlur: {
        primary: "100px",
      },
      borderWidth: {
        1: "1px",
      },
      borderColor: {
        light: "rgba(255, 255, 255, 0.16)",
      },
      borderRadius: {
        "4xl": "2rem",
        "6xl": "3rem",
        "8xl": "4rem",
      },
      backgroundImage: {
        "blue-gradient":
          "linear-gradient(278.73deg, rgba(10, 129, 218, 0.2) 6.65%, rgba(10, 129, 218, 0.2) 63.3%)",
        "red-gradient":
          "linear-gradient(93.72deg, rgba(183, 45, 95, 0.8) 1.66%, rgba(154, 81, 107, 0.8) 96.57%)",
        "light-gradient":
          "linear-gradient(100.35deg, rgba(255, 255, 255, 0.08) 10.99%, rgba(42, 42, 42, 0.056) 90.86%)",
        "toast-success":
          "linear-gradient(98.53deg, rgba(42, 171, 109, 0.2) 50%, rgba(255, 255, 255, 0.21) 159.84%)",
        "toast-warn":
          "linear-gradient(98.53deg, rgba(168, 171, 42, 0.2) 50%, rgba(255, 255, 255, 0.21) 159.84%)",
        "toast-error":
          "linear-gradient(98.53deg, rgba(171, 42, 42, 0.2) 50%, rgba(255, 255, 255, 0.21) 159.84%)",
        "toast-info":
          "linear-gradient(98.53deg, rgba(42, 70, 171, 0.2) 50%, rgba(255, 255, 255, 0.21) 159.84%)",
      },
      colors: {
        light: "rgba(255, 255, 255, 0.16)",
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
        red: {
          100: "#F7CCD7",
          200: "#EF99AF",
          300: "#E66687",
          400: "#DE3360",
          500: "#B72D5F",
          600: "#921C4B",
          700: "#6E1436",
          800: "#4A0D23",
          900: "#260611",
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
  plugins: [require("@tailwindcss/typography")],
}
export default config
