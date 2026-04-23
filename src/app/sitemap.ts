import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/services", "/about", "/contact", "/privacy-policy"] as const;
  const locales = ["ar", "en"] as const;

  return locales.flatMap((locale) =>
    pages.map((path) => ({
      url: `${siteConfig.siteUrl}/${locale}${path}`,
      lastModified: now,
      alternates: {
        languages: {
          ar: `${siteConfig.siteUrl}/ar${path}`,
          en: `${siteConfig.siteUrl}/en${path}`
        }
      }
    }))
  );
}
