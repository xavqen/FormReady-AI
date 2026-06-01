import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FormReady AI",
    short_name: "FormReady",
    description: "Fix photo, signature and PDF size for online forms.",
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#2563eb",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }
    ]
  };
}
