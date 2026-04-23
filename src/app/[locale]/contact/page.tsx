import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaButton } from "@/components/cta-button";
import { PhoneIcon } from "@/components/icons";
import { SocialLinks } from "@/components/social-links";
import type { Locale } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { createWhatsAppMessage, createWhatsAppUrl } from "@/lib/whatsapp";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return createPageMetadata(locale, "contact");
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contactPage" });
  const common = await getTranslations({ locale, namespace: "common" });
  const whatsappUrl = createWhatsAppUrl(
    createWhatsAppMessage({
      locale,
      name: "",
      governorate: "",
      service: ""
    })
  );

  return (
    <section className="section-y">
      <div className="container-shell grid gap-10 lg:grid-cols-[.95fr_1.05fr]">
        <div>
          <p className="text-sm font-bold text-[var(--primary)]">
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
            {t("intro")}
          </p>
          <div className="mt-7">
            <CtaButton className="w-full sm:w-auto">{t("cta")}</CtaButton>
            <p className="mt-3 text-sm text-[var(--muted)]">
              {common("costNote")}
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[8px] border border-[var(--border)] bg-[var(--surface)] p-5">
            <h2 className="text-2xl font-bold">{t("detailsTitle")}</h2>
            <dl className="mt-5 grid gap-4">
              <div>
                <dt className="text-sm font-bold text-[var(--muted)]">
                  {common("phone")} / {common("whatsapp")}
                </dt>
                <dd className="mt-1" dir="ltr">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-bold text-[var(--primary)] hover:text-[var(--primary-dark)]"
                  >
                    <PhoneIcon className="h-5 w-5" />
                    {siteConfig.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-bold text-[var(--muted)]">
                  {common("email")}
                </dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="font-bold text-[var(--primary)] hover:text-[var(--primary-dark)]"
                  >
                    {siteConfig.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-bold text-[var(--muted)]">
                  {common("address")}
                </dt>
                <dd className="mt-1 leading-7" lang="ar" dir="rtl">
                  {siteConfig.address}
                </dd>
              </div>
            </dl>
            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-[8px] bg-[var(--primary)] px-5 py-3 text-sm font-bold text-white hover:bg-[var(--primary-dark)] sm:w-auto"
            >
              {common("googleMaps")}
            </a>
          </div>

          <div className="rounded-[8px] border border-[var(--border)] bg-[var(--surface)] p-5">
            <h2 className="text-2xl font-bold">{t("socialTitle")}</h2>
            <SocialLinks className="mt-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
