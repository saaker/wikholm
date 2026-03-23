"use client";

import { useI18n } from "./I18nProvider";
import { useAnimateIn } from "./useAnimateIn";
import type { TranslationKey } from "@/lib/i18n";

export default function Services() {
  const { t } = useI18n();
  const { ref, visible } = useAnimateIn();

  const services: {
    titleKey: TranslationKey;
    descKey: TranslationKey;
    tagKey?: TranslationKey;
    priceKey?: TranslationKey;
    highlight?: boolean;
    icon: React.ReactNode;
  }[] = [
    {
      titleKey: "serviceCaseTitle",
      descKey: "serviceCaseDesc",
      tagKey: "serviceCaseTag",
      highlight: true,
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
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      titleKey: "serviceTpsTitle",
      descKey: "serviceTpsDesc",
      priceKey: "serviceTpsPrice",
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
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      ),
    },
    {
      titleKey: "serviceTpsAgreementTitle",
      descKey: "serviceTpsAgreementDesc",
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
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      titleKey: "serviceClinicalTitle",
      descKey: "serviceClinicalDesc",
      tagKey: "serviceClinicalTag",
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
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
    },
    {
      titleKey: "serviceStudyClubTitle",
      descKey: "serviceStudyClubDesc",
      tagKey: "serviceStudyClubTag",
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
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      titleKey: "serviceCaseCafeTitle",
      descKey: "serviceCaseCafeDesc",
      tagKey: "serviceCaseCafeTag",
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
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
    },
    {
      titleKey: "serviceReferralTitle",
      descKey: "serviceReferralDesc",
      tagKey: "serviceReferralTag",
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
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      ),
    },
  ];

  return (
    <section id="services" className="py-24 bg-muted">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-16 animate-fade-up ${visible ? "visible" : ""}`}
        >
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
            {t("servicesLabel")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-foreground leading-tight mb-4">
            {t("servicesTitle1")}{" "}
            <span className="text-primary">{t("servicesTitle2")}</span>
          </h2>
          <p className="text-muted-dark leading-relaxed">
            {t("servicesIntro")}
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <div
              key={t(service.titleKey)}
              className={`relative bg-surface rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border ${service.highlight ? "border-primary/30 ring-1 ring-primary/10" : "border-border/50"} animate-fade-up delay-${Math.min(i + 1, 4)} ${visible ? "visible" : ""}`}
            >
              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center text-[#96692a] shrink-0">
                  {service.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-foreground font-sans">
                      {t(service.titleKey)}
                    </h3>
                    {service.tagKey && (
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                          service.highlight
                            ? "bg-primary/20 text-primary-dark font-bold"
                            : "bg-primary/10 text-primary-dark"
                        }`}
                      >
                        {t(service.tagKey)}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-dark leading-relaxed mb-3">
                    {t(service.descKey)}
                  </p>
                  {service.priceKey && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 text-primary-dark text-sm font-bold">
                      {t(service.priceKey)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
