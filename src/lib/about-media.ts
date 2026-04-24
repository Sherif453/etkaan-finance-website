import type { Locale } from "@/i18n/routing";

type LocalizedText = Record<Locale, string>;

export const businessOwner = {
  src: "/about/owner.jpg",
  alt: {
    ar: "صورة صاحب النشاط",
    en: "Business owner portrait"
  } satisfies LocalizedText
};

export const successPartners = [
  {
    src: "/about/partners/partner-01.png",
    alt: {
      ar: "شريك نجاح 1",
      en: "Success partner 1"
    } satisfies LocalizedText
  },
  {
    src: "/about/partners/partner-02.png",
    alt: {
      ar: "شريك نجاح 2",
      en: "Success partner 2"
    } satisfies LocalizedText
  },
  {
    src: "/about/partners/partner-03.png",
    alt: {
      ar: "شريك نجاح 3",
      en: "Success partner 3"
    } satisfies LocalizedText
  },
  {
    src: "/about/partners/partner-04.png",
    alt: {
      ar: "شريك نجاح 4",
      en: "Success partner 4"
    } satisfies LocalizedText
  },
  {
    src: "/about/partners/partner-05.png",
    alt: {
      ar: "شريك نجاح 5",
      en: "Success partner 5"
    } satisfies LocalizedText
  }
];
