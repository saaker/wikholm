"use client";

import { useI18n } from "../../providers/I18nProvider";
import { useSections } from "../../providers/SectionsProvider";
import { useAnimateIn } from "../../hooks/useAnimateIn/useAnimateIn";
import { DMCard } from "../DMCard/DMCard";
import { DMSectionHeader } from "./DMSectionHeader";
import { getDelayClass } from "../../utils/animationHelpers";

export default function DentalMonitoring() {
  const { t, locale } = useI18n();
  const { sections } = useSections();
  const { ref, visible } = useAnimateIn();

  return (
    <section id="dental-monitoring" className="py-24 bg-muted">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          {/* Left: sticky header */}
          <DMSectionHeader
            label={t("dmLabel")}
            title1={t("dmTitle1")}
            title2={t("dmTitle2")}
            intro={t("dmIntro")}
            className={`animate-fade-up ${visible ? "visible" : ""}`}
          />

          {/* Right: feature items */}
          <div className="flex flex-col gap-8">
            {sections.dm
              .filter((item) => !item.hidden)
              .map((feat, i) => (
                <DMCard
                  key={feat.id}
                  item={feat}
                  locale={locale}
                  className={`animate-fade-up ${getDelayClass(i)} ${visible ? "visible" : ""}`}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
