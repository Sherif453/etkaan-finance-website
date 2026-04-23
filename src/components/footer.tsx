import { getTranslations } from "next-intl/server";
import type { ReactElement } from "react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { SocialLinks } from "@/components/social-links";
import { siteConfig } from "@/lib/site";

type FooterProps = {
  locale: Locale;
};

type FooterNavKey = "home" | "services" | "about" | "contact" | "privacy";

type FooterNavHref =
  | "/"
  | "/services"
  | "/about"
  | "/contact"
  | "/privacy-policy";

type FooterNavItem = {
  key: FooterNavKey;
  href: FooterNavHref;
};

const footerNavItems: readonly FooterNavItem[] = [
  { href: "/", key: "home" },
  { href: "/services", key: "services" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
  { href: "/privacy-policy", key: "privacy" }
];

export async function Footer({ locale }: FooterProps): Promise<ReactElement> {
  const nav = await getTranslations({ locale, namespace: "nav" });
  const footer = await getTranslations({ locale, namespace: "footer" });
  const common = await getTranslations({ locale, namespace: "common" });
  const brandName: string = locale === "ar" ? "إتقان" : "Etkaan";
  const currentYear: number = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] pb-24 pt-10">
      <div className="container-shell grid gap-8 md:grid-cols-[1.2fr_.8fr_.8fr]">
        <div>
          <p className="text-xl font-bold">{brandName}</p>
          <p className="mt-3 max-w-md leading-7 text-[var(--muted)]">
            {footer("summary")}
          </p>
        </div>

        <div>
          <p className="font-bold">{common("siteNavigation")}</p>
          <nav className="mt-3 grid gap-2">
            {footerNavItems.map((item: FooterNavItem) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-sm text-[var(--muted)] hover:text-[var(--primary)]"
              >
                {nav(item.key)}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="font-bold">{common("socialLinks")}</p>
          <SocialLinks className="mt-3" />
          <p className="mt-4 text-sm text-[var(--muted)]">
            <a
              href={`mailto:${siteConfig.email}`}
              className="hover:text-[var(--primary)]"
            >
              {siteConfig.email}
            </a>
          </p>
        </div>
      </div>
      <div className="container-shell mt-8 border-t border-[var(--border)] pt-5 text-sm text-[var(--muted)]">
        <span>
          © {currentYear} {brandName}. {footer("rights")}
        </span>
      </div>
    </footer>
  );
}
