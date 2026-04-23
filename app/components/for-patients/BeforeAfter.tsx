"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import basePath from "@/lib/basePath";
import { useI18n } from "../I18nProvider";
import { useSections } from "../SectionsProvider";
import { useAnimateIn } from "../hooks/useAnimateIn";
import type { BeforeAfterItem } from "@/lib/sectionsDefaults";
import { getDelayClass } from "../utils/animationHelpers";

const INITIAL_COUNT = 6;

/* ── Fullscreen Lightbox Carousel ── */
function Lightbox({
  cases,
  startIndex,
  onClose,
}: {
  cases: BeforeAfterItem[];
  startIndex: number;
  onClose: () => void;
}) {
  const { t } = useI18n();
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
      aria-label={`${t("beforeAfterBefore")} / ${t("beforeAfterAfter")} - ${index + 1} / ${cases.length}`}
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
              alt={`${t("beforeAfterBefore")} – Patient ${c.id}`}
              fill
              className="object-cover"
            />
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-foreground text-background">
              {t("beforeAfterBefore")}
            </span>
          </div>
        </div>
        <div className="relative flex flex-col items-center md:w-1/2">
          <div className="w-full aspect-3/2 relative overflow-hidden rounded-lg">
            <Image
              src={`${basePath}${c.after}`}
              alt={`${t("beforeAfterAfter")} – Patient ${c.id}`}
              fill
              className="object-cover"
            />
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-primary-dark text-white">
              {t("beforeAfterAfter")}
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

/* ── Main Section ── */
export default function BeforeAfter() {
  const { t } = useI18n();
  const { sections } = useSections();
  const { ref, visible } = useAnimateIn();
  const [showAll, setShowAll] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const cases = sections.beforeAfter.filter((c) => !c.hidden);
  const visibleCases = showAll ? cases : cases.slice(0, INITIAL_COUNT);

  const handleCloseLightbox = useCallback(() => {
    setLightboxIndex(null);
    // Return focus to the button that opened the lightbox
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  }, []);

  return (
    <>
      <section id="before-after" className="py-24 bg-background">
        <div ref={ref} className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div
            className={`text-center max-w-2xl mx-auto mb-16 animate-fade-up ${visible ? "visible" : ""}`}
          >
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
              {t("beforeAfterLabel")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-foreground leading-tight mb-4">
              {t("beforeAfterTitle1")}{" "}
              <span className="text-primary">{t("beforeAfterTitle2")}</span>
            </h2>
            <p className="text-muted-dark leading-relaxed">
              {t("beforeAfterIntro")}
            </p>
          </div>

          {/* Cases grid */}
          <div className="grid sm:grid-cols-2 gap-8 mb-8">
            {visibleCases.map((c, i) => {
              const globalIndex = cases.indexOf(c);
              return (
                <button
                  key={c.id}
                  type="button"
                  ref={(el) => {
                    if (globalIndex === lightboxIndex && el) {
                      triggerRef.current = el;
                    }
                  }}
                  onClick={(e) => {
                    triggerRef.current = e.currentTarget;
                    setLightboxIndex(globalIndex);
                  }}
                  className={`bg-surface rounded-2xl border border-border/50 overflow-hidden shadow-sm animate-fade-up ${getDelayClass(i)} ${visible ? "visible" : ""} cursor-pointer hover:shadow-md hover:scale-[1.01] transition-all text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`}
                >
                  <div className="grid grid-cols-2">
                    {/* Before */}
                    <div className="relative">
                      <div className="aspect-square overflow-hidden">
                        <Image
                          src={`${basePath}${c.before}`}
                          alt={`${t("beforeAfterBefore")} – Patient ${c.id}`}
                          width={600}
                          height={600}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-foreground/80 text-background">
                        {t("beforeAfterBefore")}
                      </span>
                    </div>
                    {/* After */}
                    <div className="relative">
                      <div className="aspect-square overflow-hidden">
                        <Image
                          src={`${basePath}${c.after}`}
                          alt={`${t("beforeAfterAfter")} – Patient ${c.id}`}
                          width={600}
                          height={600}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-primary-dark text-white dark:bg-primary-dark">
                        {t("beforeAfterAfter")}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {cases.length > INITIAL_COUNT && (
            <div className="text-center mb-8">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-6 py-2.5 rounded-full text-sm font-medium border border-border hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {showAll ? t("beforeAfterShowLess") : t("beforeAfterShowMore")}
              </button>
            </div>
          )}

          <p className="text-center text-xs text-muted-dark">
            {t("beforeAfterDisclaimer")}
          </p>
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          cases={cases}
          startIndex={lightboxIndex}
          onClose={handleCloseLightbox}
        />
      )}
    </>
  );
}
