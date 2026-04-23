import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ar", "en"],
  defaultLocale: "ar",
  localeDetection: true,
  localePrefix: "always"
});

export type Locale = (typeof routing.locales)[number];

