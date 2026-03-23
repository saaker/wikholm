"use client";

import { useI18n } from "./I18nProvider";
import { useAnimateIn } from "./useAnimateIn";
import type { TranslationKey } from "@/lib/i18n";

const advantages: {
  titleKey: TranslationKey;
  descKey: TranslationKey;
}[] = [
  { titleKey: "advRemovable", descKey: "advRemovableDesc" },
  { titleKey: "advComfortable", descKey: "advComfortableDesc" },
  { titleKey: "advFewerVisits", descKey: "advFewerVisitsDesc" },
  { titleKey: "advPredictable", descKey: "advPredictableDesc" },
];

function CheckIcon() {
  return (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function Advantages() {
  const { t } = useI18n();
  const { ref, visible } = useAnimateIn();

  return (
    <section id="advantages" className="py-24 bg-background">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          {/* Left: sticky header, positioned ~1/3 from top */}
          <div
            className={`md:pt-[18%] md:sticky md:top-30 text-center md:text-left animate-fade-up ${visible ? "visible" : ""}`}
          >
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
              {t("advantagesLabel")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-foreground leading-tight mb-4">
              {t("advantagesTitle1")}{" "}
              <span className="text-primary">{t("advantagesTitle2")}</span>
            </h2>
            <p className="text-muted-dark leading-relaxed">
              {t("advantagesIntro")}
            </p>
          </div>

          {/* Right: benefit items */}
          <div className="flex flex-col gap-8">
            {advantages.map((adv, i) => (
              <div
                key={t(adv.titleKey)}
                className={`flex gap-5 items-start animate-fade-up delay-${i + 1} ${visible ? "visible" : ""}`}
              >
                <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary-dark shrink-0">
                  <CheckIcon />
                </div>
                <div>
                  <h4 className="text-[1.05rem] font-semibold text-foreground font-sans mb-1">
                    {t(adv.titleKey)}
                  </h4>
                  <p className="text-[0.9rem] text-muted-dark leading-relaxed">
                    {t(adv.descKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
