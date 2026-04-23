import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import { hasLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import { Footer } from "@/components/footer";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { Header } from "@/components/header";
import { LeadModalProvider } from "@/components/lead-modal";
import { routing, type Locale } from "@/i18n/routing";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "900"],
  display: "swap",
  variable: "--font-arabic"
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  display: "swap",
  variable: "--font-latin"
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://etkaan.com";
  const title = locale === "en" ? "Etkaan" : "إتقان";
  const description =
    locale === "en"
      ? "Accounting, tax, company formation, and advisory services in Egypt."
      : "خدمات محاسبة وضرائب وتأسيس شركات واستشارات مالية في مصر.";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${title}`
    },
    description,
    icons: {
      icon: "/favicon.svg"
    },
    openGraph: {
      type: "website",
      siteName: title,
      locale: locale === "en" ? "en_US" : "ar_EG",
      title,
      description,
      url: `${siteUrl}/${locale}`
    }
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  setRequestLocale(typedLocale);
  const messages = await getMessages();
  const dir = typedLocale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={typedLocale}
      dir={dir}
      className={`${cairo.variable} ${inter.variable}`}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <LeadModalProvider>
            <Header locale={typedLocale} />
            <main>{children}</main>
            <Footer locale={typedLocale} />
            <FloatingWhatsApp />
          </LeadModalProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
