import type { ReactNode } from "react";
import { CtaButton } from "@/components/cta-button";
import type { ServiceId } from "@/lib/options";

type Props = {
  icon: ReactNode;
  title: string;
  description: string;
  button: string;
  service?: ServiceId;
  detailsLabel?: string;
  details?: string[];
};

export function ServiceCard({
  icon,
  title,
  description,
  button,
  service,
  detailsLabel,
  details
}: Props) {
  return (
    <article className="flex h-full flex-col rounded-[8px] border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-[var(--surface-muted)] text-[var(--primary)]">
        {icon}
      </div>
      <h3 className="mt-5 text-xl font-bold">{title}</h3>
      <p className="mt-3 leading-7 text-[var(--muted)]">{description}</p>
      {detailsLabel && details?.length ? (
        <details className="mt-4 rounded-[8px] border border-[var(--border)] bg-white px-4 py-3 text-sm">
          <summary className="cursor-pointer font-bold text-[var(--primary-dark)]">
            {detailsLabel}
          </summary>
          <ul className="mt-3 grid gap-2 text-[var(--muted)]">
            {details.map((item) => (
              <li key={item} className="flex gap-2 leading-6">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </details>
      ) : null}
      <CtaButton service={service} className="mt-5 w-full">
        {button}
      </CtaButton>
    </article>
  );
}
