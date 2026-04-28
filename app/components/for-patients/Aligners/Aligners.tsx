"use client";

import { useI18n } from "../../providers/I18nProvider";
import { useSections } from "../../providers/SectionsProvider";
import { useAnimateIn } from "../../hooks/useAnimateIn/useAnimateIn";
import { SectionHeader } from "../../SectionHeader";
import { AlignerCard } from "../AlignerCard/AlignerCard";
import { AlignersIntro } from "../AlignersIntro/AlignersIntro";
import { AlignersCTA } from "../AlignersCTA/AlignersCTA";
import { getDelayClass } from "../../utils/animationHelpers";

export default function Aligners() {
  const { t, locale } = useI18n();
  const { sections } = useSections();
  const { ref, visible } = useAnimateIn();

  const hasSectionHeader =
    t("alignersLabel")?.trim() ||
    t("alignersTitle1")?.trim() ||
    t("alignersTitle2")?.trim() ||
    t("alignersIntro")?.trim();

  return (
    <section id="aligners" className="py-24 bg-muted">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        {hasSectionHeader && (
          <SectionHeader
            label={t("alignersLabel")}
            title1={t("alignersTitle1")}
            title2={t("alignersTitle2")}
            intro={t("alignersIntro")}
            className={`mb-10 animate-fade-up ${visible ? "visible" : ""}`}
          />
        )}

        {/* Educational intro card */}
        {(t("alignersWhat")?.trim() || t("alignersWhatDesc")?.trim()) && (
          <div
            className={`mb-12 animate-fade-up delay-1 ${visible ? "visible" : ""}`}
          >
            <AlignersIntro
              what={t("alignersWhat")}
              whatDesc={t("alignersWhatDesc")}
            />
          </div>
        )}

        {/* Benefits grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {sections.aligners
            .filter((item) => {
              if (item.hidden) return false;
              const text = item[locale] || { title: "", desc: "" };
              return (text.title?.trim() || text.desc?.trim());
            })
            .map((aligner, i) => (
              <AlignerCard
                key={aligner.id}
                item={aligner}
                locale={locale}
                className={`animate-fade-up ${getDelayClass(i)} ${visible ? "visible" : ""}`}
              />
            ))}
        </div>

        {/* CTA within section */}
        {t("ctaHidden") !== "true" && (
          <AlignersCTA
            ctaReady={t("ctaReady")}
            ctaBook={t("ctaBook")}
            ctaViewClinics={t("ctaViewClinics")}
            ctaViewClinicsLink={t("ctaViewClinicsLink")}
          />
        )}
      </div>
    </section>
  );
}
