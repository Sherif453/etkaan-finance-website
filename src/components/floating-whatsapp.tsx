"use client";

import { useLocale } from "next-intl";
import { WhatsAppIcon } from "@/components/icons";
import { createWhatsAppMessage, createWhatsAppUrl } from "@/lib/whatsapp";
import type { Locale } from "@/i18n/routing";

export function FloatingWhatsApp() {
  const locale = useLocale() as Locale;
  const message = createWhatsAppMessage({
    locale,
    name: "",
    governorate: "",
    service: ""
  });

  return (
    <a
      href={createWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={locale === "ar" ? "تواصل عبر واتساب" : "Chat on WhatsApp"}
      className="fixed bottom-4 z-40 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#1f8f5f] text-white shadow-xl hover:bg-[#17754d] ltr:right-4 rtl:left-4 md:h-[72px] md:w-[72px]"
    >
      <WhatsAppIcon className="h-8 w-8 md:h-9 md:w-9" />
    </a>
  );
}
