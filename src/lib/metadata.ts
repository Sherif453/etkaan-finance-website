import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";

type PageKey = "home" | "services" | "about" | "contact" | "privacy";

const pagePaths: Record<PageKey, string> = {
  home: "",
  services: "/services",
  about: "/about",
  contact: "/contact",
  privacy: "/privacy-policy"
};

export async function createPageMetadata(locale: Locale, page: PageKey) {
  const t = await getTranslations({ locale, namespace: `metadata.${page}` });
  const path = pagePaths[page];
  const canonical = `${siteConfig.siteUrl}/${locale}${path}`;
  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        ar: `${siteConfig.siteUrl}/ar${path}`,
        en: `${siteConfig.siteUrl}/en${path}`,
        "x-default": `${siteConfig.siteUrl}/ar${path}`
      }
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: locale === "ar" ? "إتقان" : "Etkaan",
      locale: locale === "ar" ? "ar_EG" : "en_US",
      type: "website"
    }
  } satisfies Metadata;
}

