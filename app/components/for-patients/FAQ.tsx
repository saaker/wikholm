"use client";

import { useState } from "react";
import { useI18n } from "../I18nProvider";
import { useSections } from "../SectionsProvider";
import { useAnimateIn } from "../hooks/useAnimateIn";

export default function FAQ() {
  const { t, locale } = useI18n();
  const { sections } = useSections();
  const { ref, visible } = useAnimateIn();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-muted">
      <div ref={ref} className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center mb-16 animate-fade-up ${visible ? "visible" : ""}`}
        >
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
            {t("faqLabel")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-foreground leading-tight mb-4">
            {t("faqTitle1")}{" "}
            <span className="text-primary">{t("faqTitle2")}</span>
          </h2>
          <p className="text-muted-dark leading-relaxed">{t("faqIntro")}</p>
        </div>

        {/* Accordion */}
        <div
          className={`space-y-4 animate-fade-up delay-1 ${visible ? "visible" : ""}`}
        >
          {sections.faq
            .filter((item) => !item.hidden)
            .map((item, i) => {
            const isOpen = openIndex === i;
            const text = item[locale];
            return (
              <div
                key={item.id}
                className="bg-surface rounded-xl border border-border/50 shadow-sm overflow-hidden has-focus-visible:ring-2 has-focus-visible:ring-primary has-focus-visible:ring-offset-2 transition-shadow"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left gap-4 hover:bg-muted/30 focus-visible:outline-none focus-visible:bg-muted/30 rounded-t-xl transition-colors"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                >
                  <span className="text-sm font-semibold text-foreground leading-snug">
                    {text.question}
                  </span>
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
                  id={`faq-answer-${item.id}`}
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  role="region"
                  aria-labelledby={`faq-question-${item.id}`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 text-sm text-foreground/80 leading-relaxed border-t border-border/50 pt-4">
                      {text.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          className={`text-center mt-10 animate-fade-up delay-2 ${visible ? "visible" : ""}`}
        >
          <a
            href="#locations"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            style={{ color: 'var(--badge-text-color, #694A1D)' }}
          >
            {t("ctaViewClinics")}
          </a>
        </div>
      </div>
    </section>
  );
}
