"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import basePath from "@/lib/basePath";
import { useI18n } from "./I18nProvider";
import { useAnimateIn } from "./useAnimateIn";

const cases = [
  { id: "1", before: "Före1.jpg", after: "Efter1.jpg" },
  { id: "2", before: "Före2.jpg", after: "Efter2.jpg" },
  { id: "2a", before: "Före2a.jpg", after: "Efter2a.jpg" },
  { id: "4", before: "Före4.jpg", after: "Efter4.jpg" },
  { id: "4a", before: "Före4a.jpg", after: "Efter4a.jpg" },
  { id: "5", before: "Före5.jpg", after: "Efter5.jpg" },
  { id: "6", before: "Före6.jpg", after: "Efter6.jpg" },
  { id: "7", before: "Före7.jpg", after: "Efter7.jpg" },
  { id: "8", before: "Före8.jpg", after: "Efter8.jpg" },
  { id: "10", before: "Före10.jpg", after: "Efter10.jpg" },
  { id: "11", before: "Före11.jpg", after: "Efter11.jpg" },
  { id: "12", before: "Före12.jpg", after: "Efter12.jpg" },
];

const INITIAL_COUNT = 6;

/* ── Fullscreen Lightbox Carousel ── */
function Lightbox({
  startIndex,
  onClose,
}: {
  startIndex: number;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const [index, setIndex] = useState(startIndex);

  const prev = useCallback(
    () => setIndex((i) => (i === 0 ? cases.length - 1 : i - 1)),
    [],
  );
  const next = useCallback(
    () => setIndex((i) => (i === cases.length - 1 ? 0 : i + 1)),
    [],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, prev, next]);

  const c = cases[index];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white/80 hover:text-white transition-colors"
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
        className="absolute left-2 sm:left-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
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
        className="absolute right-2 sm:right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
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
          <div className="w-full aspect-[3/2] relative overflow-hidden rounded-lg">
            <Image
              src={`${basePath}/images/before-after/${c.before}`}
              alt={`${t("beforeAfterBefore")} – Patient ${c.id}`}
              fill
              className="object-cover"
            />
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-white/20 text-white backdrop-blur-sm">
              {t("beforeAfterBefore")}
            </span>
          </div>
        </div>
        <div className="relative flex flex-col items-center md:w-1/2">
          <div className="w-full aspect-[3/2] relative overflow-hidden rounded-lg">
            <Image
              src={`${basePath}/images/before-after/${c.after}`}
              alt={`${t("beforeAfterAfter")} – Patient ${c.id}`}
              fill
              className="object-cover"
            />
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-primary/80 text-white backdrop-blur-sm">
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
  const { ref, visible } = useAnimateIn();
  const [showAll, setShowAll] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visibleCases = showAll ? cases : cases.slice(0, INITIAL_COUNT);

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
                  onClick={() => setLightboxIndex(globalIndex)}
                  className={`bg-surface rounded-2xl border border-border/50 overflow-hidden shadow-sm animate-fade-up delay-${(i % 2) + 1} ${visible ? "visible" : ""} cursor-pointer hover:shadow-md hover:scale-[1.01] transition-all text-left`}
                >
                  <div className="grid grid-cols-2">
                    {/* Before */}
                    <div className="relative">
                      <div className="aspect-square overflow-hidden">
                        <Image
                          src={`${basePath}/images/before-after/${c.before}`}
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
                          src={`${basePath}/images/before-after/${c.after}`}
                          alt={`${t("beforeAfterAfter")} – Patient ${c.id}`}
                          width={600}
                          height={600}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-primary text-background">
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
                className="px-6 py-2.5 rounded-full text-sm font-medium border border-border hover:bg-muted transition-colors"
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
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
