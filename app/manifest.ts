import { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "",
    short_name: "",
    description: "",
    start_url: "/",
    display: "standalone",
    background_color: "#6043D4",
    theme_color: "#6043D4",
  }
}
