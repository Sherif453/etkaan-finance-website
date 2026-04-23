import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Etkaan",
    short_name: "Etkaan",
    description:
      "Accounting, tax, company formation, and advisory services in Egypt.",
    start_url: "/ar",
    display: "standalone",
    background_color: "#f7f3ec",
    theme_color: "#0e6f68",
    icons: [
      {
        src: "/brand/etkaan-emblem.png",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/png"
      }
    ]
  };
}
