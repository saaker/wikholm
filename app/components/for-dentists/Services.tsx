"use client";

import { useI18n } from "../providers/I18nProvider";
import { useSections } from "../providers/SectionsProvider";
import { useAnimateIn } from "../hooks/useAnimateIn";
import { Icon } from "@/lib/icons";
import { useState } from "react";
import CaseAssessmentModal from "../CaseAssessmentModal";
import { getDelayClass } from "../utils/animationHelpers";

export default function Services() {
  const { t, locale } = useI18n();
  const { sections } = useSections();
  const { ref, visible } = useAnimateIn();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <div className="space-y-6">
          {sections.services
            .filter((s) => !s.hidden)
            .map((service) => {
            const text = service[locale];
            const isHighlightCard = service.highlight;
            const isCaseAssessment = service.id === "case";

            // Highlight card gets full width and special styling
            if (isHighlightCard) {
              // If it's also the case assessment, make it clickable to open modal
              const Component = isCaseAssessment ? "button" : "div";
              const clickProps = isCaseAssessment
                ? {
                    type: "button" as const,
                    onClick: () => setIsModalOpen(true),
                  }
                : {};

              return (
                <Component
                  key={service.id}
                  {...clickProps}
                  className={`relative w-full text-left bg-linear-to-br from-primary/5 via-surface to-primary/5 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border-2 border-primary/40 ring-2 ring-primary/20 ${isCaseAssessment ? "cursor-pointer" : ""} group animate-fade-up ${isCaseAssessment ? "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" : ""} ${visible ? "visible" : ""}`}
                >
                  <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-xl bg-primary/30 flex items-center justify-center case-icon shrink-0 group-hover:scale-110 transition-transform">
                      <Icon name={service.icon} className="w-9 h-9" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="text-2xl font-semibold text-foreground font-sans">
                          {text.title}
                        </h3>
                        {text.tag && (
                          <span
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide service-badge-text"
                            style={{
                              backgroundColor: 'color-mix(in oklab, var(--color-primary) 20%, transparent)'
                            }}
                          >
                            {text.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-base text-muted-dark leading-relaxed mb-4">
                        {text.desc}
                      </p>
                      {isCaseAssessment && (
                        <span className="inline-flex items-center gap-2 text-base font-semibold text-primary group-hover:gap-3 transition-all">
                          {locale === "sv"
                            ? "Se hur du skickar ditt fall"
                            : "See how to submit your case"}
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </span>
                      )}
                      {text.price && (
                        <span
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold service-badge-text"
                          style={{
                            backgroundColor: 'color-mix(in oklab, var(--color-primary) 20%, transparent)'
                          }}
                        >
                          {text.price}
                        </span>
                      )}
                    </div>
                  </div>
                </Component>
              );
            }

            // Other services in a 2-column grid
            return null;
          })}

          {/* Other services grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {sections.services
              .filter((s) => !s.highlight && !s.hidden)
              .map((service, gridIndex) => {
                const text = service[locale];
                const cardCls = `relative bg-surface rounded-2xl p-8 shadow-sm hover:shadow-md transition-all border ${service.highlight ? "border-primary/30 ring-1 ring-primary/10" : "border-border/50"} animate-fade-up ${getDelayClass(gridIndex)} ${visible ? "visible" : ""}`;

                return (
                  <div key={service.id} className={cardCls}>
                  <div className="flex gap-5">
                    <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center text-primary-dark dark:text-primary shrink-0">
                      <Icon name={service.icon} className="w-7 h-7" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-foreground font-sans">
                          {text.title}
                        </h3>
                        {text.tag && (
                          <span
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide service-badge-text"
                            style={{
                              backgroundColor: 'color-mix(in oklab, var(--color-primary) 20%, transparent)'
                            }}
                          >
                            {text.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-dark leading-relaxed mb-3">
                        {text.desc}
                      </p>
                      {text.price && (
                        <span
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold service-badge-text"
                          style={{
                            backgroundColor: 'color-mix(in oklab, var(--color-primary) 20%, transparent)'
                          }}
                        >
                          {text.price}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Case Assessment Modal */}
      <CaseAssessmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
