"use client";

import { useI18n } from "./I18nProvider";
import { useAnimateIn } from "./useAnimateIn";
import type { TranslationKey } from "@/lib/i18n";

export default function Invisalign() {
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
      titleKey: "benefitInvisible",
      descKey: "benefitInvisibleDesc",
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
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      titleKey: "benefitFaster",
      descKey: "benefitFasterDesc",
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
      titleKey: "benefitComfort",
      descKey: "benefitComfortDesc",
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
      titleKey: "benefitDigital",
      descKey: "benefitDigitalDesc",
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
      titleKey: "benefitAllAges",
      descKey: "benefitAllAgesDesc",
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
      titleKey: "benefitProven",
      descKey: "benefitProvenDesc",
    },
  ];

  return (
    <section id="invisalign" className="py-24 bg-muted">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-16 animate-fade-up ${visible ? "visible" : ""}`}
        >
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
            {t("invisalignLabel")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-foreground leading-tight mb-4">
            {t("invisalignTitle1")}{" "}
            <span className="text-primary">{t("invisalignTitle2")}</span>
          </h2>
          <p className="text-muted-dark leading-relaxed">
            {t("invisalignIntro")}
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <div
              key={t(benefit.titleKey)}
              className="bg-surface rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow border border-border/50 flex gap-4 sm:block"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-light flex items-center justify-center text-primary shrink-0 sm:mb-5">
                {benefit.icon}
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground font-sans mb-1 sm:mb-2">
                  {t(benefit.titleKey)}
                </h3>
                <p className="text-sm text-muted-dark leading-relaxed">
                  {t(benefit.descKey)}
                </p>
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
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary-dark transition-colors text-sm"
            >
              {t("ctaViewClinics")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
