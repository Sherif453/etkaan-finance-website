import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { navItems } from "@/lib/site";

const headerNavItems = navItems.filter((item) => item.key !== "privacy");

export async function Header({ locale }: { locale: Locale }) {
  const nav = await getTranslations({ locale, namespace: "nav" });
  const common = await getTranslations({ locale, namespace: "common" });
  const brandName = locale === "ar" ? "إتقان" : "Etkaan";

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--surface)]">
      <div
        dir="ltr"
        className="container-shell grid min-h-24 grid-cols-[minmax(0,1fr)_minmax(218px,58%)_auto] items-center gap-2 py-3 sm:grid-cols-[minmax(0,1fr)_minmax(292px,58%)_auto] lg:min-h-40 lg:grid-cols-[minmax(24px,1fr)_minmax(460px,540px)_minmax(360px,auto)_auto] lg:gap-4"
      >
        <nav
          aria-label={common("siteNavigation")}
          dir={locale === "ar" ? "rtl" : "ltr"}
          className="col-start-3 row-start-1 hidden min-w-0 items-center justify-end gap-1 whitespace-nowrap lg:flex"
        >
          {headerNavItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="rounded-[8px] px-3 py-2 text-sm font-semibold text-[var(--muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--text)] xl:px-3"
            >
              {nav(item.key)}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className="col-start-2 row-start-1 flex min-h-20 w-full items-center justify-center rounded-[8px] px-0 text-center sm:min-h-28 sm:px-2 lg:min-h-36 lg:px-3"
          aria-label={brandName}
        >
          <span className="flex max-w-full items-center justify-center gap-1.5 overflow-visible sm:gap-3 lg:gap-5">
            <EtkaanWordmark />
            <EtkaanLogoIcon />
          </span>
        </Link>

        <div className="col-start-3 row-start-1 flex justify-end lg:hidden">
          <LocaleSwitcher />
        </div>
        <div className="col-start-3 row-start-1 hidden justify-end lg:col-start-4 lg:flex">
          <LocaleSwitcher />
        </div>
      </div>

      <nav
        aria-label={common("siteNavigation")}
        className="container-shell flex gap-1 overflow-x-auto pb-3 md:hidden"
      >
        {headerNavItems.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className="shrink-0 rounded-[8px] px-3 py-2 text-sm font-semibold text-[var(--muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--text)]"
          >
            {nav(item.key)}
          </Link>
        ))}
      </nav>
      <div className="h-3 w-full bg-[rgba(14,111,104,0.14)]" aria-hidden="true" />
    </header>
  );
}

function EtkaanWordmark(): React.JSX.Element {
  return (
    <span
      aria-hidden="true"
      className="relative block h-[82px] w-[162px] shrink-0 overflow-hidden bg-white sm:h-[112px] sm:w-[222px] md:h-[128px] md:w-[252px] lg:h-[156px] lg:w-[306px]"
    >
      <Image
        src="/brand/etkaan-wordmark.png"
        alt=""
        fill
        priority
        sizes="(min-width: 1024px) 306px, (min-width: 768px) 252px, (min-width: 640px) 222px, 162px"
        className="object-cover object-center"
      />
    </span>
  );
}

function EtkaanLogoIcon(): React.JSX.Element {
  return (
    <span
      aria-hidden="true"
      className="relative block h-[64px] w-[53px] shrink-0 overflow-hidden bg-white sm:h-[88px] sm:w-[73px] md:h-[106px] md:w-[88px] lg:h-[142px] lg:w-[118px]"
    >
      <Image
        src="/brand/etkaan-emblem.png"
        alt=""
        fill
        priority
        sizes="(min-width: 1024px) 118px, (min-width: 768px) 88px, (min-width: 640px) 73px, 53px"
        className="object-contain"
      />
    </span>
  );
}
