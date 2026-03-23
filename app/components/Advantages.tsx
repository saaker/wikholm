"use client";

import { useI18n } from "./I18nProvider";
import { useAnimateIn } from "./useAnimateIn";
import type { TranslationKey } from "@/lib/i18n";

const advantages: {
  icon: React.ReactNode;
  titleKey: TranslationKey;
  descKey: TranslationKey;
}[] = [
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    ),
    titleKey: "advRemovable",
    descKey: "advRemovableDesc",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
    titleKey: "advComfortable",
    descKey: "advComfortableDesc",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    titleKey: "advFewerVisits",
    descKey: "advFewerVisitsDesc",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    titleKey: "advPredictable",
    descKey: "advPredictableDesc",
  },
];

export default function Advantages() {
  const { t } = useI18n();
  const { ref, visible } = useAnimateIn();

  return (
    <section id="advantages" className="py-24 bg-muted">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-16 animate-fade-up ${visible ? "visible" : ""}`}
        >
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
            {t("advantagesLabel")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-foreground leading-tight mb-4">
            {t("advantagesTitle1")}{" "}
            <span className="text-primary">{t("advantagesTitle2")}</span>
          </h2>
          <p className="text-muted-dark leading-relaxed">
            {t("advantagesIntro")}
          </p>
        </div>

        {/* 2x2 grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {advantages.map((adv, i) => (
            <div
              key={t(adv.titleKey)}
              className={`bg-surface rounded-2xl p-8 border border-border/50 shadow-sm hover:shadow-md transition-shadow animate-fade-up delay-${i + 1} ${visible ? "visible" : ""}`}
            >
              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center text-[#96692a] shrink-0">
                  {adv.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-foreground font-sans mb-2">
                    {t(adv.titleKey)}
                  </h3>
                  <p className="text-sm text-muted-dark leading-relaxed">
                    {t(adv.descKey)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
