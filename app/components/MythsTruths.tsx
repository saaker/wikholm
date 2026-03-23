"use client";

import { useState } from "react";
import { useI18n } from "./I18nProvider";
import { useAnimateIn } from "./useAnimateIn";
import type { TranslationKey } from "@/lib/i18n";

const mythItems: { qKey: TranslationKey; aKey: TranslationKey }[] = [
  { qKey: "myth1Q", aKey: "myth1A" },
  { qKey: "myth2Q", aKey: "myth2A" },
  { qKey: "myth3Q", aKey: "myth3A" },
  { qKey: "myth4Q", aKey: "myth4A" },
  { qKey: "myth5Q", aKey: "myth5A" },
  { qKey: "myth6Q", aKey: "myth6A" },
  { qKey: "myth7Q", aKey: "myth7A" },
  { qKey: "myth8Q", aKey: "myth8A" },
];

export default function MythsTruths() {
  const { t } = useI18n();
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

        {/* Myths accordion */}
        <div
          className={`space-y-3 animate-fade-up delay-1 ${visible ? "visible" : ""}`}
        >
          {mythItems.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="shrink-0 inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-myth-bg text-myth-text">
                      {t("mythsMyth")}
                    </span>
                    <span className="text-sm font-semibold text-foreground leading-snug">
                      {t(item.qKey)}
                    </span>
                  </div>
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
                    <div className="px-5 pb-5 border-t border-border/50 pt-4">
                      <div className="flex items-start gap-3">
                        <span className="shrink-0 inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide mt-0.5 bg-truth-bg text-truth-text">
                          {t("mythsTruth")}
                        </span>
                        <p className="text-sm text-muted-dark leading-relaxed">
                          {t(item.aKey)}
                        </p>
                      </div>
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
