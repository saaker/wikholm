"use client";

import { useState } from "react";
import { useI18n } from "../../providers/I18nProvider";
import { useSections } from "../../providers/SectionsProvider";
import { useAnimateIn } from "../../hooks/useAnimateIn";
import { MythCard } from "./MythCard";
import { SectionHeader } from "../../SectionHeader";

export default function MythsTruths() {
  const { t, locale } = useI18n();
  const { sections } = useSections();
  const { ref, visible } = useAnimateIn();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="myths" className="py-24 bg-surface">
      <div ref={ref} className="max-w-3xl mx-auto px-6">
        <SectionHeader
          label={t("mythsLabel")}
          title1={t("mythsTitle1")}
          title2={t("mythsTitle2")}
          intro={t("mythsIntro")}
          className={`mb-16 animate-fade-up ${visible ? "visible" : ""}`}
        />
        <div
          className={`space-y-4 animate-fade-up delay-1 ${visible ? "visible" : ""}`}
        >
          {sections.myths
            .filter((item) => {
              if (item.hidden) return false;
              const text = item[locale] || { myth: "", truth: "" };
              return (text.myth?.trim() || text.truth?.trim());
            })
            .map((item, i) => (
              <MythCard
                key={item.id}
                item={item}
                locale={locale}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                mythLabel={t("mythsMyth")}
                truthLabel={t("mythsTruth")}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
