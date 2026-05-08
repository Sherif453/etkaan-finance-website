"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  label: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  fit?: "contain" | "cover";
};

export function MediaFrame({
  src,
  alt,
  label,
  className = "",
  imageClassName = "",
  priority = false,
  fit = "contain"
}: Props) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`overflow-hidden rounded-[8px] border border-[var(--border)] bg-[var(--surface-muted)] ${className}`}
    >
      {hasError ? (
        <div className="flex h-full min-h-full items-center justify-center bg-[linear-gradient(145deg,rgba(14,111,104,0.14),rgba(184,102,75,0.16))] p-5 text-center">
          <div>
            <p className="text-sm font-black text-[var(--primary-dark)]">
              {label}
            </p>
          </div>
        </div>
      ) : fit === "cover" ? (
        <div className="relative h-full w-full">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 320px, (min-width: 768px) 240px, 48vw"
            className={`object-cover ${imageClassName}`}
            onError={() => setHasError(true)}
          />
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-white">
          <Image
            src={src}
            alt={alt}
            width={1600}
            height={1200}
            priority={priority}
            sizes="(min-width: 1280px) 900px, (min-width: 768px) 70vw, 92vw"
            className={`h-full w-full object-contain ${imageClassName}`}
            onError={() => setHasError(true)}
          />
        </div>
      )}
    </div>
  );
}
