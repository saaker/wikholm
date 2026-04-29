"use client";

import { useI18n } from "../providers/I18nProvider";
import { useSections } from "../providers/SectionsProvider";
import { useAnimateIn } from "../hooks/useAnimateIn/useAnimateIn";
import { useState } from "react";
import CaseAssessmentModal from "../CaseAssessmentModal";
import { getDelayClass } from "../utils/animationHelpers";
import { ServiceCard } from "./ServiceCard/ServiceCard";
import { ServicesSectionHeader } from "./Services/ServicesSectionHeader";

export default function Services() {
  const { t, locale } = useI18n();
  const { sections } = useSections();
  const { ref, visible } = useAnimateIn();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="services" className="py-24 bg-muted">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <ServicesSectionHeader
          label={t("servicesLabel")}
          title1={t("servicesTitle1")}
          title2={t("servicesTitle2")}
          intro={t("servicesIntro")}
          className={`animate-fade-up ${visible ? "visible" : ""}`}
        />

        {/* Services grid */}
        <div className="space-y-6">
          {sections.services
            .filter((s) => !s.hidden)
            .map((service) => {
            const isHighlightCard = service.highlight;
            const isCaseAssessment = service.id === "case";
            const modalEnabled = isCaseAssessment && !service.modalDisabled;

            // Highlight card gets full width and special styling
            if (isHighlightCard) {
              return (
                <ServiceCard
                  key={service.id}
                  item={service}
                  locale={locale}
                  className={`animate-fade-up ${visible ? "visible" : ""}`}
                  onClick={modalEnabled ? () => setIsModalOpen(true) : undefined}
                  showClickPrompt={modalEnabled}
                />
              );
            }

            // Other services in a 2-column grid
            return null;
          })}

          {/* Other services grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {sections.services
              .filter((s) => !s.highlight && !s.hidden)
              .map((service, gridIndex) => (
                <ServiceCard
                  key={service.id}
                  item={service}
                  locale={locale}
                  className={`animate-fade-up ${getDelayClass(gridIndex)} ${visible ? "visible" : ""}`}
                />
              ))}
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
