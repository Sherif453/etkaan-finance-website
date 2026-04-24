"use client";

import Image from "next/image";
import { useState } from "react";
import { MediaFrame } from "@/components/media-frame";

type Slide = {
  src: string;
  alt: string;
};

type Props = {
  title: string;
  previousLabel: string;
  nextLabel: string;
  slides: Slide[];
};

export function PartnerSlideshow({
  title,
  previousLabel,
  nextLabel,
  slides
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!slides.length) {
    return null;
  }

  const currentSlide = slides[currentIndex];
  const lightboxSlide = lightboxIndex === null ? null : slides[lightboxIndex];

  return (
    <>
      <section className="rounded-[8px] border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-3xl font-black text-[var(--primary-dark)] md:text-4xl">
            {title}
          </h2>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center rounded-[8px] border border-[var(--border)] bg-white px-4 text-sm font-bold hover:border-[var(--primary)]"
              onClick={() =>
                setCurrentIndex((currentIndex - 1 + slides.length) % slides.length)
              }
              aria-label={previousLabel}
            >
              {previousLabel}
            </button>
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center rounded-[8px] bg-[var(--primary)] px-4 text-sm font-bold text-white hover:bg-[var(--primary-dark)]"
              onClick={() => setCurrentIndex((currentIndex + 1) % slides.length)}
              aria-label={nextLabel}
            >
              {nextLabel}
            </button>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="button"
            className="mx-auto block w-full max-w-3xl cursor-zoom-in"
            onClick={() => setLightboxIndex(currentIndex)}
            aria-label={currentSlide.alt}
          >
            <MediaFrame
              src={currentSlide.src}
              alt={currentSlide.alt}
              label={currentSlide.alt}
              className="mx-auto h-[240px] w-full max-w-3xl bg-white sm:h-[300px] lg:h-[340px]"
              priority={currentIndex === 0}
            />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => {
                setCurrentIndex(index);
                setLightboxIndex(index);
              }}
              className={`rounded-[8px] border p-1 transition ${
                index === currentIndex
                  ? "border-[var(--primary)] bg-[var(--surface-muted)]"
                  : "border-[var(--border)] bg-white"
              }`}
              aria-label={slide.alt}
            >
              <MediaFrame
                src={slide.src}
                alt={slide.alt}
                label={slide.alt}
                className="h-20 w-full sm:h-24"
              />
            </button>
          ))}
        </div>
      </section>

      {lightboxSlide ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 px-4 py-6"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setLightboxIndex(null);
            }
          }}
        >
          <div className="relative w-full max-w-6xl rounded-[8px] bg-[var(--surface)] p-3 sm:p-4">
            <button
              type="button"
              className="absolute end-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-[8px] border border-[var(--border)] bg-white text-xl"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close image"
            >
              ×
            </button>
            <div className="flex h-[72vh] items-center justify-center bg-white p-2 sm:p-4">
              <Image
                src={lightboxSlide.src}
                alt={lightboxSlide.alt}
                width={1800}
                height={1400}
                className="max-h-full w-auto max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
