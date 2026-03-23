"use client";

import { useI18n } from "./I18nProvider";
import { useAnimateIn } from "./useAnimateIn";
import type { TranslationKey } from "@/lib/i18n";

export default function Aligners() {
  const { t } = useI18n();
  const { ref, visible } = useAnimateIn();

  const benefits: {
    icon: React.ReactNode;
    titleKey: TranslationKey;
    descKey: TranslationKey;
  }[] = [
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      ),
      titleKey: "alignersBenefit1",
      descKey: "alignersBenefit1Desc",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
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
      titleKey: "alignersBenefit2",
      descKey: "alignersBenefit2Desc",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
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
      titleKey: "alignersBenefit3",
      descKey: "alignersBenefit3Desc",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
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
      titleKey: "alignersBenefit4",
      descKey: "alignersBenefit4Desc",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      titleKey: "alignersBenefit5",
      descKey: "alignersBenefit5Desc",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      ),
      titleKey: "alignersBenefit6",
      descKey: "alignersBenefit6Desc",
    },
  ];

  return (
    <section id="aligners" className="py-24 bg-muted">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-10 animate-fade-up ${visible ? "visible" : ""}`}
        >
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
            {t("alignersLabel")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-foreground leading-tight mb-4">
            {t("alignersTitle1")}{" "}
            <span className="text-primary">{t("alignersTitle2")}</span>
          </h2>
          <p className="text-muted-dark leading-relaxed">
            {t("alignersIntro")}
          </p>
        </div>

        {/* Educational intro card */}
        <div
          className={`bg-surface rounded-2xl p-8 sm:p-10 border border-border/50 shadow-sm mb-12 animate-fade-up delay-1 ${visible ? "visible" : ""}`}
        >
          <h3 className="text-lg sm:text-xl font-semibold text-foreground font-sans mb-3">
            {t("alignersWhat")}
          </h3>
          <p className="text-muted-dark leading-relaxed">
            {t("alignersWhatDesc")}
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((benefit, i) => (
            <div
              key={t(benefit.titleKey)}
              className={`bg-surface rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-border/50 animate-fade-up delay-${Math.min(i + 1, 4)} ${visible ? "visible" : ""}`}
            >
              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center text-[#96692a] shrink-0">
                  {benefit.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-foreground font-sans mb-2">
                    {t(benefit.titleKey)}
                  </h3>
                  <p className="text-sm text-muted-dark leading-relaxed">
                    {t(benefit.descKey)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA within section */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-8 rounded-2xl bg-surface border border-border/50 shadow-sm">
            <div className="text-left">
              <p className="font-semibold text-foreground">{t("ctaReady")}</p>
              <p className="text-sm text-muted-dark">{t("ctaBook")}</p>
            </div>
            <a
              href="#locations"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#96692A] text-[#FDFDF8] font-medium hover:bg-primary-dark transition-colors text-sm"
            >
              {t("ctaViewClinics")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
