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
  const brandName = locale === "ar" ? "إتقان" : "Etkaan";
  const ogImage = `${siteConfig.siteUrl}/brand/etkaan-emblem.png`;

  return {
    title,
    description,
    applicationName: brandName,
    category: locale === "ar" ? "خدمات محاسبية وضرائب" : "Accounting and tax services",
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
