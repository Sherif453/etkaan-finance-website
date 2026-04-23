import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaButton } from "@/components/cta-button";
import type { Locale } from "@/i18n/routing";
import {
  getServiceDetailGroups
} from "@/lib/options";
import { createPageMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: Locale }>;
};

type ServiceSection = {
  groups: Array<{ id: string; items: Array<{ id: string; label: string }>; title: string }>;
  id: "taxes" | "company_formation" | "other_services" | "sales_growth";
  title: string;
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

  const sections: ServiceSection[] = [
    {
      id: "taxes",
      title: home("taxes.title"),
      groups: getServiceDetailGroups("taxes").map((group) => ({
        id: group.id,
        items: group.options.map((option) => ({
          id: option.id,
          label: option[locale]
        })),
        title: group[locale],
      }))
    },
    {
      id: "company_formation",
      title: home("company.title"),
      groups: getServiceDetailGroups("company_formation").map((group) => ({
        id: group.id,
        items: group.options.map((option) => ({
          id: option.id,
          label: option[locale]
        })),
        title: group[locale],
      }))
    },
    {
      id: "other_services",
      title: home("other.title"),
      groups: getServiceDetailGroups("other_services").map((group) => ({
        id: group.id,
        items: group.options.map((option) => ({
          id: option.id,
          label: option[locale]
        })),
        title: group[locale],
      }))
    },
    {
      id: "sales_growth",
      title: home("sales.title"),
      groups: getServiceDetailGroups("sales_growth").map((group) => ({
        id: group.id,
        items: group.options.map((option) => ({
          id: option.id,
          label: option[locale]
        })),
        title: group[locale],
      }))
    }
  ];

  return (
    <section className="pb-12 pt-4 md:pb-16 md:pt-6 lg:pb-20 lg:pt-8">
      <div className="container-shell">
        <div className="max-w-3xl">
          <p className="text-sm font-bold text-[var(--primary)]">
            {page("eyebrow")}
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
            {page("title")}
          </h1>
        </div>

        <div className="mt-6 rounded-[8px] border border-[var(--border)] bg-white">
          <div className="border-b border-[var(--border)] px-4 py-4 sm:px-6">
            <h2 className="text-lg font-bold">
              {locale === "ar" ? "جميع الخدمات" : "All services"}
            </h2>
          </div>

          <div className="grid">
            {sections.map((section) => (
              <section
                key={section.id}
                className="border-b border-[var(--border)] px-4 py-5 last:border-b-0 sm:px-6 sm:py-6"
              >
                <CtaButton
                  service={section.id}
                  className="w-full justify-start text-base sm:w-auto sm:text-lg"
                >
                  {section.title}
                </CtaButton>

                <div
                  className={`mt-4 grid gap-4 ${
                    section.groups.length > 1 ? "xl:grid-cols-3" : ""
                  }`}
                >
                  {section.groups.map((group) => (
                    <section
                      key={`${section.id}-${group.id}`}
                      className={`rounded-[8px] border border-[var(--border)] bg-[var(--surface)] p-4 ${
                        section.groups.length === 1 ? "max-w-none" : ""
                      }`}
                    >
                      <p className="text-sm font-bold text-[var(--primary)]">
                        {group.title}
                      </p>

                      <div className="mt-3 grid gap-2">
                        {group.items.map((item) => (
                          <CtaButton
                            key={`${section.id}-${group.id}-${item.id}`}
                            service={section.id}
                            serviceCategory={group.id}
                            serviceDetail={item.id}
                            className="w-full justify-start !bg-white !px-4 !py-3 !text-start !text-[var(--text)] hover:!bg-[var(--surface-muted)]"
                          >
                            {item.label}
                          </CtaButton>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
