import type { Locale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";

type JsonLdProps = {
  data: Record<string, unknown>;
};

type BreadcrumbItem = {
  name: string;
  url: string;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function createBusinessJsonLd(locale: Locale) {
  const name = locale === "ar" ? "إتقان" : "Etkaan";
  const description =
    locale === "ar"
      ? "خدمات محاسبة وضرائب وتأسيس شركات واستشارات مالية في مصر."
      : "Accounting, tax, company formation, and financial advisory services in Egypt.";

  return {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "@id": `${siteConfig.siteUrl}/#business`,
    name,
    alternateName: locale === "ar" ? "Etkaan" : "إتقان",
    description,
    url: siteConfig.siteUrl,
    logo: `${siteConfig.siteUrl}/android-chrome-512x512.png`,
    image: `${siteConfig.siteUrl}/brand/etkaan-emblem.png`,
    telephone: `+${siteConfig.whatsappNumber}`,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "368 العصافره بحري، شارع ملك حفني، مكتب رقم 1، الدور الأول",
      addressLocality: locale === "ar" ? "الإسكندرية" : "Alexandria",
      addressCountry: "EG"
    },
    areaServed: {
      "@type": "Country",
      name: locale === "ar" ? "مصر" : "Egypt"
    },
    sameAs: [
      siteConfig.socials.facebook,
      siteConfig.socials.linkedin,
      siteConfig.socials.youtube
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: `+${siteConfig.whatsappNumber}`,
      contactType: "customer service",
      availableLanguage: ["Arabic", "English"]
    },
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: locale === "ar" ? "خدمات الضرائب" : "Tax services"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: locale === "ar" ? "تأسيس الشركات" : "Company formation"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name:
            locale === "ar"
              ? "المحاسبة والاستشارات المالية"
              : "Accounting and financial advisory"
        }
      }
    ]
  };
}

export function createBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}
