"use client";

import { useI18n } from "./I18nProvider";
import { useAnimateIn } from "./useAnimateIn";
import type { TranslationKey } from "@/lib/i18n";

const steps: {
  num: string;
  titleKey: TranslationKey;
  descKey: TranslationKey;
}[] = [
  { num: "01", titleKey: "processStep1Title", descKey: "processStep1Desc" },
  { num: "02", titleKey: "processStep2Title", descKey: "processStep2Desc" },
  { num: "03", titleKey: "processStep3Title", descKey: "processStep3Desc" },
  { num: "04", titleKey: "processStep4Title", descKey: "processStep4Desc" },
];

export default function Process() {
  const { t } = useI18n();
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
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`relative animate-fade-up delay-${i + 1} ${visible ? "visible" : ""}`}
            >
              <div className="relative z-10">
                <span className="text-5xl font-serif font-bold text-primary/15 leading-none">
                  {step.num}
                </span>
                <h3 className="text-lg font-semibold text-foreground font-sans mt-2 mb-2">
                  {t(step.titleKey)}
                </h3>
                <p className="text-sm text-muted-dark leading-relaxed">
                  {t(step.descKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
