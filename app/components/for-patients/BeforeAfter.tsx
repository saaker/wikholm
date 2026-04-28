"use client";

import { useState, useCallback, useRef } from "react";
import { useI18n } from "../providers/I18nProvider";
import { useSections } from "../providers/SectionsProvider";
import { useAnimateIn } from "../hooks/useAnimateIn/useAnimateIn";
import { BeforeAfterCard } from "./BeforeAfterCard/BeforeAfterCard";
import { BeforeAfterSectionHeader } from "./BeforeAfter/BeforeAfterSectionHeader";
import { Lightbox } from "./BeforeAfter/Lightbox";
import { getDelayClass } from "../utils/animationHelpers";

const INITIAL_COUNT = 6;

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
          <BeforeAfterSectionHeader
            label={t("beforeAfterLabel")}
            title1={t("beforeAfterTitle1")}
            title2={t("beforeAfterTitle2")}
            intro={t("beforeAfterIntro")}
            className={`animate-fade-up ${visible ? "visible" : ""}`}
          />

          {/* Cases grid */}
          <div className="grid sm:grid-cols-2 gap-8 mb-8">
            {visibleCases.map((c, i) => {
              const globalIndex = cases.indexOf(c);
              return (
                <BeforeAfterCard
                  key={c.id}
                  ref={(el) => {
                    if (globalIndex === lightboxIndex && el) {
                      triggerRef.current = el as HTMLButtonElement;
                    }
                  }}
                  item={c}
                  beforeLabel={t("beforeAfterBefore")}
                  afterLabel={t("beforeAfterAfter")}
                  noImageText={t("beforeAfterNoImage")}
                  onClick={() => {
                    setLightboxIndex(globalIndex);
                  }}
                  className={`animate-fade-up ${getDelayClass(i)} ${visible ? "visible" : ""}`}
                />
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
          beforeLabel={t("beforeAfterBefore")}
          afterLabel={t("beforeAfterAfter")}
        />
      )}
    </>
  );
}
