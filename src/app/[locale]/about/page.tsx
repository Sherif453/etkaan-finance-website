import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaButton } from "@/components/cta-button";
import { CheckIcon } from "@/components/icons";
import type { Locale } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return createPageMetadata(locale, "about");
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "aboutPage" });
  const common = await getTranslations({ locale, namespace: "common" });
  const values = t.raw("values") as string[];

  return (
    <>
      <section className="section-y">
        <div className="container-shell grid gap-10 lg:grid-cols-[1fr_.85fr] lg:items-start">
          <div>
            <p className="text-sm font-bold text-[var(--primary)]">
              {t("eyebrow")}
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-5 whitespace-pre-line text-lg leading-9 text-[var(--muted)]">
              {t("body")}
            </p>
          </div>
          <div className="rounded-[8px] border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="text-2xl font-bold">{t("valuesTitle")}</h2>
            <ul className="mt-5 grid gap-4">
              {values.map((item) => (
                <li key={item} className="flex items-start gap-3 leading-7">
                  <span className="mt-1 text-[var(--primary)]">
                    <CheckIcon />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-y bg-[var(--surface)]">
        <div className="container-shell text-center">
          <h2 className="text-3xl font-bold">{t("ctaTitle")}</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-[var(--muted)]">
            {common("costNote")}
          </p>
          <CtaButton className="mt-6 w-full sm:w-auto">
            {common("primaryCta")}
          </CtaButton>
        </div>
      </section>
    </>
  );
}
