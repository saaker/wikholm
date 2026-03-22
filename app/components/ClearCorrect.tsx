"use client";

import { useI18n } from "./I18nProvider";
import { useAnimateIn } from "./useAnimateIn";

export default function ClearCorrect() {
  const { t } = useI18n();
  const { ref, visible } = useAnimateIn();

  const features = [
    {
      titleKey: "ccFlexible" as const,
      descKey: "ccFlexibleDesc" as const,
      icon: (
        <svg
          className="w-7 h-7"
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
    },
    {
      titleKey: "ccMaterial" as const,
      descKey: "ccMaterialDesc" as const,
      icon: (
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
    },
    {
      titleKey: "ccQuality" as const,
      descKey: "ccQualityDesc" as const,
      icon: (
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section id="clearcorrect" className="py-24 bg-surface">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-16 animate-fade-up ${visible ? "visible" : ""}`}
        >
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
            {t("clearCorrectLabel")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-foreground leading-tight mb-4">
            {t("clearCorrectTitle1")}{" "}
            <span className="text-primary">{t("clearCorrectTitle2")}</span>
          </h2>
          <p className="text-muted-dark leading-relaxed">
            {t("clearCorrectIntro")}
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <div
              key={t(feat.titleKey)}
              className={`bg-muted rounded-2xl p-8 border border-border/50 animate-fade-up delay-${i + 1} ${visible ? "visible" : ""}`}
            >
              <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center text-primary mb-5">
                {feat.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground font-sans mb-2">
                {t(feat.titleKey)}
              </h3>
              <p className="text-sm text-muted-dark leading-relaxed">
                {t(feat.descKey)}
              </p>
            </div>
          ))}
        </div>

        {/* Link to ClearCorrect */}
        <div
          className={`text-center mt-10 animate-fade-up delay-4 ${visible ? "visible" : ""}`}
        >
          <a
            href="https://www.straumann.com/clearcorrect/se/sv/patienter.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
          >
            {t("ccLink")}
          </a>
        </div>
      </div>
    </section>
  );
}
