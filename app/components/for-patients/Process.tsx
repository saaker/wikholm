"use client";

import { useI18n } from "../providers/I18nProvider";
import { useSections } from "../providers/SectionsProvider";
import { useAnimateIn } from "../hooks/useAnimateIn";
import { getDelayClass } from "../utils/animationHelpers";
import { ProcessCard } from "./ProcessCard";
import { SectionHeader } from "../SectionHeader";

export default function Process() {
  const { t, locale } = useI18n();
  const { sections } = useSections();
  const { ref, visible } = useAnimateIn();

  return (
    <section id="process" className="py-24 bg-surface">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <div className={`animate-fade-up ${visible ? "visible" : ""}`}>
          <SectionHeader
            label={t("processLabel")}
            title1={t("processTitle1")}
            title2={t("processTitle2")}
          />
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {sections.process
            .filter((step) => {
              if (step.hidden) return false;
              const text = step[locale] || { title: "", desc: "" };
              return (text.title?.trim() || text.desc?.trim());
            })
            .map((step, i) => {
              const num = String(i + 1).padStart(2, "0");
              return (
                <ProcessCard
                  key={step.id}
                  step={step}
                  locale={locale}
                  number={num}
                  className={`animate-fade-up ${getDelayClass(i, 4)} ${visible ? "visible" : ""}`}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
}
