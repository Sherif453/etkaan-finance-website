import { FacebookIcon, LinkedInIcon, YouTubeIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site";

const socialItems = [
  {
    key: "facebook",
    label: "Facebook",
    url: siteConfig.socials.facebook,
    icon: <FacebookIcon className="h-5 w-5" />
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    url: siteConfig.socials.linkedin,
    icon: <LinkedInIcon className="h-5 w-5" />
  },
  {
    key: "youtube",
    label: "YouTube",
    url: siteConfig.socials.youtube,
    icon: <YouTubeIcon className="h-5 w-5" />
  }
] as const;

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {socialItems.map((item) => {
        const hasUrl = Boolean(item.url);

        return (
          <a
            key={item.key}
            href={hasUrl ? item.url : undefined}
            target={hasUrl ? "_blank" : undefined}
            rel={hasUrl ? "noopener noreferrer" : undefined}
            aria-disabled={!hasUrl}
            className={
              hasUrl
                ? "inline-flex h-10 w-10 items-center justify-center rounded-[8px] bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)]"
                : "inline-flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-[8px] border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--muted)]"
            }
            title={item.label}
          >
            <span className="sr-only">{item.label}</span>
            {item.icon}
          </a>
        );
      })}
    </div>
  );
}
