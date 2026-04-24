"use client";

import { useI18n } from "../providers/I18nProvider";
import { useSections } from "../providers/SectionsProvider";
import { useAnimateIn } from "../hooks/useAnimateIn";
import { getDelayClass } from "../utils/animationHelpers";

export default function Process() {
  const { t, locale } = useI18n();
  const { sections } = useSections();
  const { ref, visible } = useAnimateIn();

  return (
    <section id="process" className="py-24 bg-surface">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-16 animate-fade-up ${visible ? "visible" : ""}`}
        >
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
            {t("processLabel")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-foreground leading-tight">
            {t("processTitle1")}{" "}
            <span className="text-primary">{t("processTitle2")}</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {sections.process.map((step, i) => {
            const text = step[locale];
            const num = String(i + 1).padStart(2, "0");
            return (
              <div
                key={step.id}
                className={`relative animate-fade-up ${getDelayClass(i, 4)} ${visible ? "visible" : ""}`}
              >
                <div className="relative z-10">
                  <span
                    className="text-5xl font-serif font-bold leading-none"
                    style={{ color: 'var(--color-primary)', opacity: 0.8 }}
                  >
                    {num}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground font-sans mt-2 mb-2">
                    {text.title}
                  </h3>
                  <p className="text-sm text-muted-dark leading-relaxed">
                    {text.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
