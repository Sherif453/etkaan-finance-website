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

export function createFloatingWhatsAppMessage(locale: Locale) {
  if (locale === "en") {
    return [
      "Hello,",
      "Please contact me regarding Etkaan services.",
      "I am interested in company formation, accounting advisory, or tax services.",
      "Thank you."
    ].join("\n");
  }

  return [
    "بعد التحية،",
    "برجاء التكرم بالتواصل معي بخصوص الاستفادة من خدماتكم في (تأسيس شركة / استشارة محاسبية / خدمات ضريبية).",
    "وشكرًا مقدمًا."
  ].join("\n");
}
