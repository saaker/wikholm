"use client";

import Image from "next/image";
import { useI18n } from "./I18nProvider";
import { useAnimateIn } from "./useAnimateIn";

export default function About() {
  const { t } = useI18n();
  const { ref, visible } = useAnimateIn();

  return (
    <section id="about" className="py-24 bg-surface">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Photo */}
          <div
            className={`relative animate-fade-up ${visible ? "visible" : ""}`}
          >
            <div className="aspect-4/5 rounded-2xl overflow-hidden shadow-2xl shadow-primary/10">
              <Image
                src="https://swedishdental.com/wp-content/uploads/2025/10/image0-1.jpeg"
                alt="André Wikholm"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-accent/20 -z-10" />
          </div>

          {/* Text content */}
          <div
            className={`animate-fade-up delay-2 ${visible ? "visible" : ""}`}
          >
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
              {t("aboutLabel")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-foreground leading-tight mb-6">
              {t("aboutTitle1")}{" "}
              <span className="text-primary">{t("aboutTitle2")}</span>
            </h2>
            <div className="space-y-4 text-muted-dark leading-relaxed">
              <p>{t("aboutParagraph1")}</p>
              <p>{t("aboutParagraph2")}</p>
              <p>{t("aboutParagraph3")}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-border">
              {[
                { value: "20+", label: t("statYears") },
                { value: "2000+", label: t("statPatients") },
                { value: "Platinum", label: t("statProvider") },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-serif font-semibold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-dark mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
