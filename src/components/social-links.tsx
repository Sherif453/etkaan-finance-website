import { siteConfig } from "@/lib/site";

const socialItems = [
  { key: "facebook", label: "Facebook", url: siteConfig.socials.facebook },
  { key: "linkedin", label: "LinkedIn", url: siteConfig.socials.linkedin }
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
                ? "inline-flex h-10 min-w-10 items-center justify-center rounded-[8px] bg-[var(--primary)] px-4 text-sm font-bold text-white hover:bg-[var(--primary-dark)]"
                : "inline-flex h-10 min-w-10 cursor-not-allowed items-center justify-center rounded-[8px] border border-[var(--border)] bg-[var(--surface-muted)] px-4 text-sm font-bold text-[var(--muted)]"
            }
          >
            {item.label}
          </a>
        );
      })}
    </div>
  );
}
