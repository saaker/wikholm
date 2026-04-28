"use client";

import { useI18n } from "../providers/I18nProvider";
import { useSections } from "../providers/SectionsProvider";
import { useAnimateIn } from "../hooks/useAnimateIn/useAnimateIn";
import { AdvantageCard } from "./AdvantageCard/AdvantageCard";
import { AdvantagesSectionHeader } from "./Advantages/AdvantagesSectionHeader";
import { getDelayClass } from "../utils/animationHelpers";

export default function Advantages() {
  const { t, locale } = useI18n();
  const { sections } = useSections();
  const { ref, visible } = useAnimateIn();

  return (
    <section id="advantages" className="py-24 bg-background">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          {/* Left: sticky header */}
          <AdvantagesSectionHeader
            label={t("advantagesLabel")}
            title1={t("advantagesTitle1")}
            title2={t("advantagesTitle2")}
            intro={t("advantagesIntro")}
            className={`animate-fade-up ${visible ? "visible" : ""}`}
          />

          {/* Right: advantage items */}
          <div className="flex flex-col gap-8">
            {sections.advantages
              .filter((adv) => !adv.hidden)
              .map((adv, i) => (
                <AdvantageCard
                  key={adv.id}
                  item={adv}
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
