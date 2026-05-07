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
    theme_color: "#0a2038",
    icons: [
      {
        src: "/brand/etkaan-emblem.png?v=2",
        sizes: "529x636",
        type: "image/png"
      },
      {
        src: "/favicon.ico?v=2",
        sizes: "any",
        type: "image/png"
      }
    ]
  };
}
