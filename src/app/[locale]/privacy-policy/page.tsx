import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { JsonLd, createBreadcrumbJsonLd } from "@/components/structured-data";
import type { Locale } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return createPageMetadata(locale, "privacy");
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "privacyPage" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const canonical = `${siteConfig.siteUrl}/${locale}/privacy-policy`;

  return (
    <section className="section-y">
      <JsonLd
        data={createBreadcrumbJsonLd([
          {
            name: nav("home"),
            url: `${siteConfig.siteUrl}/${locale}`
          },
          {
            name: nav("privacy"),
            url: canonical
          }
        ])}
      />
      <div className="container-shell max-w-3xl">
        <p className="text-sm font-bold text-[var(--primary)]">
          {t("eyebrow")}
        </p>
        <h1 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
          {t("title")}
        </h1>
        <div className="mt-8 rounded-[8px] border border-[var(--border)] bg-[var(--surface)] p-6">
          <p className="text-lg leading-9 text-[var(--muted)]">{t("body")}</p>
        </div>
      </div>
    </section>
  );
}
