"use client";

import { useState } from "react";
import { useI18n } from "./I18nProvider";
import { useAnimateIn } from "./useAnimateIn";
import type { TranslationKey } from "@/lib/i18n";

const faqItems: { qKey: TranslationKey; aKey: TranslationKey }[] = [
  { qKey: "faq1Q", aKey: "faq1A" },
  { qKey: "faq2Q", aKey: "faq2A" },
  { qKey: "faq3Q", aKey: "faq3A" },
  { qKey: "faq4Q", aKey: "faq4A" },
  { qKey: "faq5Q", aKey: "faq5A" },
  { qKey: "faq6Q", aKey: "faq6A" },
];

export default function FAQ() {
  const { t } = useI18n();
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
          className={`space-y-3 animate-fade-up delay-1 ${visible ? "visible" : ""}`}
        >
          {faqItems.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="bg-surface rounded-xl border border-border/50 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left gap-4"
                >
                  <span className="text-sm font-semibold text-foreground leading-snug">
                    {t(item.qKey)}
                  </span>
                  <svg
                    className={`w-5 h-5 shrink-0 text-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 text-sm text-muted-dark leading-relaxed border-t border-border/50 pt-4">
                      {t(item.aKey)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Links to brand sites */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-8 animate-fade-up delay-2 ${visible ? "visible" : ""}`}
        >
          <a
            href="https://www.invisalign.se/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
          >
            {t("faqLink")}
          </a>
          <a
            href="https://www.straumann.com/clearcorrect/se/sv/patienter.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
          >
            {t("ccLink")}
          </a>
        </div>
      </div>
    </section>
  );
}
