"use client";

import { useI18n } from "./I18nProvider";
import { useAnimateIn } from "./useAnimateIn";

export default function Hero() {
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
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-up ${visible ? "visible" : ""}`}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {t("heroBadge")}
        </div>

        {/* Main heading */}
        <h1
          className={`text-5xl sm:text-6xl lg:text-7xl font-serif font-semibold text-foreground leading-tight tracking-tight mb-6 animate-fade-up delay-1 ${visible ? "visible" : ""}`}
        >
          {t("heroTitle1")}{" "}
          <span className="text-primary">{t("heroTitle2")}</span>
        </h1>

        <p
          className={`max-w-2xl mx-auto text-lg sm:text-xl text-muted-dark leading-relaxed mb-10 animate-fade-up delay-2 ${visible ? "visible" : ""}`}
        >
          {t("heroSubtitle")}
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-3 ${visible ? "visible" : ""}`}
        >
          <a
            href="#locations"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-medium hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
          >
            {t("heroCta")}
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
            href="#about"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border text-foreground font-medium hover:bg-muted transition-colors"
          >
            {t("heroSecondary")}
          </a>
        </div>
      </div>
    </section>
  );
}
