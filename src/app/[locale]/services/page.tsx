import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaButton } from "@/components/cta-button";
import { AdvisoryIcon, CompanyIcon, TaxIcon } from "@/components/icons";
import { ServiceCard } from "@/components/service-card";
import type { Locale } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return createPageMetadata(locale, "services");
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = await getTranslations({ locale, namespace: "servicesPage" });
  const home = await getTranslations({ locale, namespace: "home.services" });
  const common = await getTranslations({ locale, namespace: "common" });
  const taxDetails = home.raw("taxes.details") as string[];

  const services = [
    {
      key: "taxes",
      icon: <TaxIcon />,
      service: "taxes" as const,
      detailsLabel: home("taxes.detailsLabel"),
      details: taxDetails
    },
    {
      key: "company",
      icon: <CompanyIcon />,
      service: "company_formation" as const,
      detailsLabel: undefined,
      details: undefined
    },
    {
      key: "other",
      icon: <AdvisoryIcon />,
      service: "other_services" as const,
      detailsLabel: undefined,
      details: undefined
    },
    {
      key: "sales",
      icon: <AdvisoryIcon />,
      service: "sales_growth" as const,
      detailsLabel: home("sales.detailsLabel"),
      details: home.raw("sales.details") as string[]
    }
  ];

  return (
    <>
      <section className="section-y">
        <div className="container-shell max-w-3xl">
          <p className="text-sm font-bold text-[var(--primary)]">
            {page("eyebrow")}
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
            {page("title")}
          </h1>
          <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
            {page("intro")}
          </p>
          <div className="mt-7">
            <CtaButton className="w-full sm:w-auto">
              {common("primaryCta")}
            </CtaButton>
            <p className="mt-3 text-sm text-[var(--muted)]">
              {common("costNote")}
            </p>
          </div>
        </div>
      </section>

      <section className="section-y bg-[var(--surface)]">
        <div className="container-shell">
          <h2 className="text-3xl font-bold">{page("sectionTitle")}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {services.map((item) => (
              <ServiceCard
                key={item.key}
                icon={item.icon}
                title={home(`${item.key}.title`)}
                description={home(`${item.key}.description`)}
                button={home(`${item.key}.button`)}
                service={item.service}
                detailsLabel={item.detailsLabel}
                details={item.details}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-shell rounded-[8px] border border-[var(--border)] bg-[var(--surface)] p-6 text-center">
          <h2 className="text-3xl font-bold">{page("closingTitle")}</h2>
          <p className="mx-auto mt-3 max-w-2xl leading-7 text-[var(--muted)]">
            {page("closingText")}
          </p>
          <p className="mt-4 text-sm text-[var(--muted)]">
            {common("costNote")}
          </p>
          <CtaButton className="mt-5 w-full sm:w-auto">
            {common("primaryCta")}
          </CtaButton>
        </div>
      </section>
    </>
  );
}
