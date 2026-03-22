"use client";

import { useI18n } from "./I18nProvider";
import { useAnimateIn } from "./useAnimateIn";
import basePath from "@/lib/basePath";
import type { TranslationKey } from "@/lib/i18n";

interface HeroProps {
  badgeKey?: TranslationKey;
  title1Key?: TranslationKey;
  title2Key?: TranslationKey;
  subtitleKey?: TranslationKey;
  ctaKey?: TranslationKey;
  ctaHref?: string;
  secondaryKey?: TranslationKey;
  secondaryHref?: string;
}

export default function Hero({
  badgeKey = "heroBadge",
  title1Key = "heroTitle1",
  title2Key = "heroTitle2",
  subtitleKey = "heroSubtitle",
  ctaKey = "heroCta",
  ctaHref = "#services",
  secondaryKey = "heroSecondary",
  secondaryHref = `${basePath}/for-patienter`,
}: HeroProps) {
  const { t } = useI18n();
  const { ref, visible } = useAnimateIn(0.05);

  return (
    <section
      id="top"
      className="relative min-h-[85vh] flex items-center justify-center bg-linear-to-br from-surface via-primary-light to-surface"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-125 h-125 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div
        ref={ref}
        className="relative max-w-6xl mx-auto px-6 py-32 text-center"
      >
        {/* Main heading */}
        <h1
          className={`text-5xl sm:text-6xl lg:text-7xl font-serif font-semibold text-foreground leading-tight tracking-tight mb-6 animate-fade-up delay-1 ${visible ? "visible" : ""}`}
        >
          {t(title1Key)} <span className="text-primary">{t(title2Key)}</span>
        </h1>

        <p
          className={`max-w-2xl mx-auto text-lg sm:text-xl text-muted-dark leading-relaxed mb-10 animate-fade-up delay-2 ${visible ? "visible" : ""}`}
        >
          {t(subtitleKey)}
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-3 ${visible ? "visible" : ""}`}
        >
          <a
            href={ctaHref}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-medium hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
          >
            {t(ctaKey)}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </a>
          <a
            href={secondaryHref}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border text-foreground font-medium hover:bg-muted transition-colors"
          >
            {t(secondaryKey)}
          </a>
        </div>
      </div>
    </section>
  );
}
