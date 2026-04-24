"use client";

import { useState } from "react";
import { useI18n } from "../../providers/I18nProvider";
import { useSections } from "../../providers/SectionsProvider";
import { useAnimateIn } from "../../hooks/useAnimateIn";
import { FAQCard } from "./FAQCard";
import { SectionHeader } from "../../SectionHeader";

export default function FAQ() {
  const { t, locale } = useI18n();
  const { sections } = useSections();
  const { ref, visible } = useAnimateIn();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-muted">
      <div ref={ref} className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <SectionHeader
          label={t("faqLabel")}
          title1={t("faqTitle1")}
          title2={t("faqTitle2")}
          intro={t("faqIntro")}
          className={`mb-16 animate-fade-up ${visible ? "visible" : ""}`}
        />

        {/* Accordion */}
        <div
          className={`space-y-4 animate-fade-up delay-1 ${visible ? "visible" : ""}`}
        >
          {sections.faq
            .filter((item) => {
              if (item.hidden) return false;
              // Hide if no content in current language
              const text = item[locale] || { question: "", answer: "" };
              return (text.question?.trim() || text.answer?.trim());
            })
            .map((item, i) => (
              <FAQCard
                key={item.id}
                item={item}
                locale={locale}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
