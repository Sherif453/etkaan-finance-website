"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const t = useTranslations("nav");
  const nextLocale = locale === "ar" ? "en" : "ar";
  const flagSrc = nextLocale === "ar" ? "/flags/eg.svg" : "/flags/us.svg";
  const flagAlt = nextLocale === "ar" ? "Egypt flag" : "United States flag";
  const languageCode = nextLocale === "ar" ? "AR" : "EN";

  return (
    <Link
      href={pathname}
      locale={nextLocale}
      aria-label={t("language")}
      className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-[8px] border border-[var(--border)] bg-[var(--surface)] px-2 text-xs font-black hover:border-[var(--primary)] sm:min-h-10 sm:gap-2 sm:px-3 sm:text-sm"
    >
      <Image
        src={flagSrc}
        alt={flagAlt}
        width={24}
        height={16}
        className="h-4 w-6 rounded-[2px] object-cover shadow-[0_0_0_1px_rgba(0,0,0,0.22)]"
      />
      {languageCode}
    </Link>
  );
}
