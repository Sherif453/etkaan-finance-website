"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useLeadModal } from "@/components/lead-modal";
import type { ServiceId } from "@/lib/options";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  service?: ServiceId;
  tone?: "green" | "light";
};

export function CtaButton({
  children,
  service,
  tone = "green",
  className = "",
  ...props
}: Props) {
  const { openLeadModal } = useLeadModal();
  const base =
    "inline-flex min-h-12 items-center justify-center rounded-[8px] px-5 py-3 text-center text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-60";
  const styles =
    tone === "light"
      ? "bg-white text-[var(--primary-dark)] hover:bg-[var(--surface-muted)]"
      : "bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)]";

  return (
    <button
      type="button"
      className={`${base} ${styles} ${className}`}
      onClick={() => openLeadModal(service)}
      {...props}
    >
      {children}
    </button>
  );
}
