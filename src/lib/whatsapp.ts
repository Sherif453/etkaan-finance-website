import type { Locale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";

type MessageInput = {
  locale: Locale;
  name: string;
  governorate: string;
  service: string;
};

export function createWhatsAppMessage({
  locale,
  name,
  governorate,
  service
}: MessageInput) {
  if (locale === "en") {
    return [
      "Hello,",
      "A request was submitted through the Etkaan website.",
      `Name: ${name}`,
      `Governorate: ${governorate}`,
      `Service: ${service}`,
      "I would like to know the service cost."
    ].join("\n");
  }

  return [
    "مرحبًا،",
    "تم تقديم طلب عبر موقع إتقان.",
    `الاسم: ${name}`,
    `المحافظة: ${governorate}`,
    `الخدمة: ${service}`,
    "أرغب في معرفة تكلفة الخدمة"
  ].join("\n");
}

export function createWhatsAppUrl(message = "") {
  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${siteConfig.whatsappNumber}${query}`;
}

