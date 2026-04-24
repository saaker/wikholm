"use client";

import { useI18n } from "./providers/I18nProvider";
import { useAnimateIn } from "./hooks/useAnimateIn";
import basePath from "@/lib/basePath";
import type { TranslationKey } from "@/lib/i18n";

interface HeroProps {
  badgeKey?: TranslationKey;
  title1Key?: TranslationKey;
  title2Key?: TranslationKey;
  subtitleKey?: TranslationKey;
  ctaKey?: TranslationKey;
  ctaLinkKey?: TranslationKey;
  secondaryKey?: TranslationKey;
  secondaryLinkKey?: TranslationKey;
}

export default function Hero({
  badgeKey = "heroBadge",
  title1Key = "heroTitle1",
  title2Key = "heroTitle2",
  subtitleKey = "heroSubtitle",
  ctaKey = "heroCta",
  ctaLinkKey = "heroCtaLink",
  secondaryKey = "heroSecondary",
  secondaryLinkKey = "heroSecondaryLink",
}: HeroProps) {
  const { t } = useI18n();
  const { ref, visible } = useAnimateIn(0.05);

  const rawCtaLink = t(ctaLinkKey);
  const rawSecondaryLink = t(secondaryLinkKey);
  const ctaHref = rawCtaLink.startsWith("/")
    ? `${basePath}${rawCtaLink}`
    : rawCtaLink;
  const secondaryHref = rawSecondaryLink.startsWith("/")
    ? `${basePath}${rawSecondaryLink}`
    : rawSecondaryLink;

  return (
    <section
      id="top"
      className="relative min-h-[85vh] flex items-center justify-center bg-linear-to-br from-surface via-primary-light to-surface"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-125 h-125 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div
        ref={ref}
        className="relative max-w-6xl mx-auto px-6 py-32 text-center"
      >
        {/* Badge */}
        <span
          className={`inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wide rounded-full shadow-sm animate-fade-up badge-text ${visible ? "visible" : ""}`}
          style={{
            backgroundColor: 'color-mix(in oklab, var(--color-primary) 20%, transparent)'
          }}
        >
          {t(badgeKey)}
        </span>

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
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary-dark text-white font-semibold hover:bg-primary-dark transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-primary/30 bg-primary/10 text-foreground font-medium hover:bg-primary/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            {t(secondaryKey)}
          </a>
        </div>
      </div>
    </section>
  );
}
