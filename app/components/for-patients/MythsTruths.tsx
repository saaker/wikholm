"use client";

import { useState } from "react";
import { useI18n } from "../I18nProvider";
import { useSections } from "../SectionsProvider";
import { useAnimateIn } from "../hooks/useAnimateIn";

export default function MythsTruths() {
  const { t, locale } = useI18n();
  const { sections } = useSections();
  const { ref, visible } = useAnimateIn();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="myths" className="py-24 bg-surface">
      <div ref={ref} className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center mb-16 animate-fade-up ${visible ? "visible" : ""}`}
        >
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
            {t("mythsLabel")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-foreground leading-tight mb-4">
            {t("mythsTitle1")}{" "}
            <span className="text-primary">{t("mythsTitle2")}</span>
          </h2>
          <p className="text-muted-dark leading-relaxed">{t("mythsIntro")}</p>
        </div>

        {/* Accordion */}
        <div
          className={`space-y-4 animate-fade-up delay-1 ${visible ? "visible" : ""}`}
        >
          {sections.myths
            .filter((item) => !item.hidden)
            .map((item, i) => {
            const isOpen = openIndex === i;
            const text = item[locale];
            return (
              <div
                key={item.id}
                className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden has-focus-visible:ring-2 has-focus-visible:ring-primary has-focus-visible:ring-offset-2 transition-shadow"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left gap-4 hover:bg-muted/30 focus-visible:outline-none focus-visible:bg-muted/30 rounded-t-xl transition-colors"
                  aria-expanded={isOpen}
                  aria-controls={`myth-truth-${item.id}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-myth-bg text-myth-text shrink-0">
                      {t("mythsMyth")}
                    </span>
                    <span className="text-sm font-semibold text-foreground leading-snug">
                      {text.myth}
                    </span>
                  </div>
                  <svg
                    className={`w-5 h-5 shrink-0 text-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  id={`myth-truth-${item.id}`}
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  role="region"
                  aria-labelledby={`myth-question-${item.id}`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 flex gap-3 items-start border-t border-border pt-4">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-truth-bg text-truth-text shrink-0 mt-0.5">
                        {t("mythsTruth")}
                      </span>
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        {text.truth}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
