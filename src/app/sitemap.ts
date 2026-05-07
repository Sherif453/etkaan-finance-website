import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/contact", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/privacy-policy", priority: 0.3 }
  ] as const;
  const locales = ["ar", "en"] as const;

  return locales.flatMap((locale) =>
    pages.map(({ path, priority }) => ({
      url: `${siteConfig.siteUrl}/${locale}${path}`,
      changeFrequency: "monthly",
      lastModified: now,
      priority,
      alternates: {
        languages: {
          ar: `${siteConfig.siteUrl}/ar${path}`,
          en: `${siteConfig.siteUrl}/en${path}`,
          "x-default": `${siteConfig.siteUrl}/ar${path}`
        }
      }
    }))
  );
}
