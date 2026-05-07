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

const keywords: Record<Locale, string[]> = {
  ar: [
    "إتقان",
    "محاسب قانوني في مصر",
    "خدمات الضرائب",
    "تأسيس الشركات",
    "محاسبة",
    "استشارات مالية",
    "الإسكندرية"
  ],
  en: [
    "Etkaan",
    "legal accountant in Egypt",
    "tax services",
    "company formation",
    "accounting",
    "financial advisory",
    "Alexandria"
  ]
};

export async function createPageMetadata(locale: Locale, page: PageKey) {
  const t = await getTranslations({ locale, namespace: `metadata.${page}` });
  const path = pagePaths[page];
  const canonical = `${siteConfig.siteUrl}/${locale}${path}`;
  const title = t("title");
  const description = t("description");
  const brandName = locale === "ar" ? "إتقان" : "Etkaan";
  const ogImage = `${siteConfig.siteUrl}/android-chrome-512x512.png`;

  return {
    title,
    description,
    applicationName: brandName,
    authors: [{ name: brandName, url: siteConfig.siteUrl }],
    category: locale === "ar" ? "خدمات محاسبية وضرائب" : "Accounting and tax services",
    creator: brandName,
    keywords: keywords[locale],
    publisher: brandName,
    robots: {
      follow: true,
      index: true,
      googleBot: {
        follow: true,
        index: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1
      }
    },
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
      siteName: brandName,
      locale: locale === "ar" ? "ar_EG" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_EG",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 512,
          height: 512,
          alt: brandName
        }
      ]
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [ogImage]
    }
  } satisfies Metadata;
}
