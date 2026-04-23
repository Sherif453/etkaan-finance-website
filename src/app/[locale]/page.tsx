import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaButton } from "@/components/cta-button";
import { AdvisoryIcon, CheckIcon, CompanyIcon, TaxIcon } from "@/components/icons";
import { ServiceCard } from "@/components/service-card";
import type { Locale } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return createPageMetadata(locale, "home");
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "home" });
  const common = await getTranslations({ locale, namespace: "common" });
  const whyItems = t.raw("why.items") as string[];
  const taxDetails = t.raw("services.taxes.details") as string[];
  const salesDetails = t.raw("services.sales.details") as string[];

  const services = [
    {
      key: "taxes",
      icon: <TaxIcon />,
      service: "taxes" as const,
      detailsLabel: t("services.taxes.detailsLabel"),
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
      detailsLabel: t("services.sales.detailsLabel"),
      details: salesDetails
    }
  ];

  return (
    <>
      <section className="pb-12 pt-8 md:pb-16 md:pt-12 lg:pb-20 lg:pt-14">
        <div className="container-shell">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-black leading-tight text-[var(--primary)] md:text-5xl">
              {t("hero.eyebrow")}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--muted)] md:text-lg">
              {t("hero.subtitle")}
            </p>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {services.map((item) => (
              <ServiceCard
                key={item.key}
                icon={item.icon}
                title={t(`services.${item.key}.title`)}
                description={t(`services.${item.key}.description`)}
                button={t(`services.${item.key}.button`)}
                service={item.service}
                detailsLabel={item.detailsLabel}
                details={item.details}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-[var(--surface)]">
        <div className="container-shell">
          <h2 className="text-3xl font-bold md:text-4xl">{t("why.title")}</h2>
          <div className="mt-8 grid gap-3 md:grid-cols-4">
            {whyItems.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-[8px] border border-[var(--border)] bg-white p-4"
              >
                <span className="mt-1 text-[var(--primary)]">
                  <CheckIcon />
                </span>
                <p className="leading-7">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-[var(--primary-dark)] text-white">
        <div className="container-shell text-center">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold leading-tight md:text-4xl">
            {t("finalCta.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/80">
            {common("costNote")}
          </p>
          <CtaButton tone="light" className="mt-6 w-full sm:w-auto">
            {common("primaryCta")}
          </CtaButton>
        </div>
      </section>

      <section className="section-y">
        <div className="container-shell">
          <h2 className="max-w-2xl text-3xl font-bold md:text-4xl">
            {t("problemSolution.title")}
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-[8px] border border-[var(--border)] bg-[var(--surface)] p-5">
              <p className="text-sm font-bold text-[var(--accent)]">
                {t("problemSolution.problemLabel")}
              </p>
              <p className="mt-3 leading-8 text-[var(--muted)]">
                {t("problemSolution.problem")}
              </p>
            </div>
            <div className="rounded-[8px] border border-[var(--border)] bg-[var(--surface)] p-5">
              <p className="text-sm font-bold text-[var(--primary)]">
                {t("problemSolution.solutionLabel")}
              </p>
              <p className="mt-3 leading-8 text-[var(--muted)]">
                {t("problemSolution.solution")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
