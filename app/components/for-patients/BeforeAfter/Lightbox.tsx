"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import basePath from "@/lib/basePath";
import type { BeforeAfterItem } from "@/lib/sectionsDefaults";

type LightboxProps = {
  cases: BeforeAfterItem[];
  startIndex: number;
  onClose: () => void;
  beforeLabel: string;
  afterLabel: string;
};

export function Lightbox({
  cases,
  startIndex,
  onClose,
  beforeLabel,
  afterLabel,
}: LightboxProps) {
  const [index, setIndex] = useState(startIndex);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const prev = useCallback(
    () => setIndex((i) => (i === 0 ? cases.length - 1 : i - 1)),
    [cases.length],
  );
  const next = useCallback(
    () => setIndex((i) => (i === cases.length - 1 ? 0 : i + 1)),
    [cases.length],
  );

  useEffect(() => {
    // Move focus to close button when lightbox opens
    closeButtonRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    // Focus trap
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !lightboxRef.current) return;

      const focusableElements = lightboxRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    document.addEventListener("keydown", handleTab);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("keydown", handleTab);
    };
  }, [onClose, prev, next]);

  const c = cases[index];

  return (
    <div
      ref={lightboxRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${beforeLabel} / ${afterLabel} - ${index + 1} / ${cases.length}`}
    >
      {/* Close */}
      <button
        ref={closeButtonRef}
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white/80 hover:text-white transition-colors rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        aria-label="Close"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Prev */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        className="absolute left-2 sm:left-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        aria-label="Previous"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Next */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        className="absolute right-2 sm:right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        aria-label="Next"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Side-by-side images */}
      <div
        className="flex flex-col md:flex-row items-stretch justify-center gap-2 px-6 md:px-12 max-w-7xl w-full mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex flex-col items-center md:w-1/2">
          <div className="w-full aspect-3/2 relative overflow-hidden rounded-lg">
            <Image
              src={`${basePath}${c.before}`}
              alt={`${beforeLabel} – Patient ${c.id}`}
              fill
              className="object-cover"
            />
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-foreground text-background">
              {beforeLabel}
            </span>
          </div>
        </div>
        <div className="relative flex flex-col items-center md:w-1/2">
          <div className="w-full aspect-3/2 relative overflow-hidden rounded-lg">
            <Image
              src={`${basePath}${c.after}`}
              alt={`${afterLabel} – Patient ${c.id}`}
              fill
              className="object-cover"
            />
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-primary-dark text-white">
              {afterLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Counter */}
      <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
        {index + 1} / {cases.length}
      </span>
    </div>
  );
}
