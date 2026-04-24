"use client";

import { useI18n } from "../providers/I18nProvider";
import { useSections } from "../providers/SectionsProvider";
import { useAnimateIn } from "../hooks/useAnimateIn";
import { Icon } from "@/lib/icons";
import { getDelayClass } from "../utils/animationHelpers";

export default function DentalMonitoring() {
  const { t, locale } = useI18n();
  const { sections } = useSections();
  const { ref, visible } = useAnimateIn();

  return (
    <section id="dental-monitoring" className="py-24 bg-muted">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          {/* Left: sticky header */}
          <div
            className={`md:pt-[18%] md:sticky md:top-30 text-center md:text-left animate-fade-up ${visible ? "visible" : ""}`}
          >
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
              {t("dmLabel")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-foreground leading-tight mb-4">
              {t("dmTitle1")}{" "}
              <span className="text-primary">{t("dmTitle2")}</span>
            </h2>
            <p className="text-muted-dark leading-relaxed">{t("dmIntro")}</p>
          </div>

          {/* Right: feature items */}
          <div className="flex flex-col gap-8">
            {sections.dm.map((feat, i) => {
              const text = feat[locale];
              return (
                <div
                  key={feat.id}
                  className={`flex gap-5 items-start animate-fade-up ${getDelayClass(i)} ${visible ? "visible" : ""}`}
                >
                  <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary-dark dark:text-primary shrink-0">
                    <Icon name={feat.icon} className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-[1.05rem] font-semibold text-foreground font-sans mb-1">
                      {text.title}
                    </h4>
                    <p className="text-[0.9rem] text-muted-dark leading-relaxed">
                      {text.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
