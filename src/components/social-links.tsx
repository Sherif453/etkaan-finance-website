import { FacebookIcon, LinkedInIcon, YouTubeIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site";

const socialItems = [
  {
    key: "facebook",
    label: "Facebook",
    url: siteConfig.socials.facebook,
    color: "#1877f2",
    icon: <FacebookIcon className="h-5 w-5" />
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    url: siteConfig.socials.linkedin,
    color: "#0a66c2",
    icon: <LinkedInIcon className="h-5 w-5" />
  },
  {
    key: "youtube",
    label: "YouTube",
    url: siteConfig.socials.youtube,
    color: "#ff0000",
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
            style={hasUrl ? { color: item.color } : undefined}
            className={
              hasUrl
                ? "inline-flex h-10 w-10 items-center justify-center rounded-[8px] border border-[var(--border)] bg-white shadow-sm transition-colors hover:border-[var(--primary)] hover:bg-[var(--surface)]"
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
