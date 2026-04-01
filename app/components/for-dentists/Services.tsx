"use client";

import { useI18n } from "../I18nProvider";
import { useSections } from "../SectionsProvider";
import { useAnimateIn } from "../hooks/useAnimateIn";
import { Icon } from "@/lib/icons";

export default function Services() {
  const { t, locale } = useI18n();
  const { sections } = useSections();
  const { ref, visible } = useAnimateIn();

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
          {sections.services.map((service, i) => {
            const text = service[locale];
            const isCaseAssessment = service.id === "case";
            const cardCls = `relative bg-surface rounded-2xl p-8 shadow-sm hover:shadow-md transition-all border ${service.highlight ? "border-primary/30 ring-1 ring-primary/10" : "border-border/50"} ${isCaseAssessment ? "cursor-pointer group" : ""} animate-fade-up delay-${Math.min(i + 1, 4)} ${visible ? "visible" : ""}`;

            const cardContent = (
              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center text-primary-dark shrink-0">
                  <Icon name={service.icon} className="w-7 h-7" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-foreground font-sans">
                      {text.title}
                    </h3>
                    {text.tag && (
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                          service.highlight
                            ? "bg-primary/20 text-primary-dark font-bold"
                            : "bg-primary/10 text-primary-dark"
                        }`}
                      >
                        {text.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-dark leading-relaxed mb-3">
                    {text.desc}
                  </p>
                  {isCaseAssessment && (
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:underline">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      {locale === "sv"
                        ? "Kontakta via e-post \u2192"
                        : "Contact via email \u2192"}
                    </span>
                  )}
                  {text.price && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 text-primary-dark text-sm font-bold">
                      {text.price}
                    </span>
                  )}
                </div>
              </div>
            );

            if (isCaseAssessment) {
              return (
                <div
                  key={service.id}
                  role="link"
                  tabIndex={0}
                  onClick={() => {
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className={cardCls}
                >
                  {cardContent}
                </div>
              );
            }

            return (
              <div key={service.id} className={cardCls}>
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
