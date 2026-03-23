"use client";

import { useI18n } from "./I18nProvider";
import { useAnimateIn } from "./useAnimateIn";
import type { TranslationKey } from "@/lib/i18n";

const articles: {
  tagKey: TranslationKey;
  dateKey: TranslationKey;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  color: string;
}[] = [
  {
    tagKey: "news1Tag",
    dateKey: "news1Date",
    titleKey: "news1Title",
    descKey: "news1Desc",
    color: "bg-primary/10 text-primary",
  },
  {
    tagKey: "news2Tag",
    dateKey: "news2Date",
    titleKey: "news2Title",
    descKey: "news2Desc",
    color: "bg-accent/20 text-accent",
  },
  {
    tagKey: "news3Tag",
    dateKey: "news3Date",
    titleKey: "news3Title",
    descKey: "news3Desc",
    color: "bg-primary-light text-primary-dark",
  },
];

export default function News() {
  const { t } = useI18n();
  const { ref, visible } = useAnimateIn();

  return (
    <section id="news" className="py-24 bg-surface">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-16 animate-fade-up ${visible ? "visible" : ""}`}
        >
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
            {t("newsLabel")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-foreground leading-tight mb-4">
            {t("newsTitle1")}{" "}
            <span className="text-primary">{t("newsTitle2")}</span>
          </h2>
          <p className="text-muted-dark leading-relaxed">{t("newsIntro")}</p>
        </div>

        {/* Article cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <article
              key={t(article.titleKey)}
              className={`group bg-surface rounded-2xl border border-border shadow-md hover:shadow-lg transition-all overflow-hidden animate-fade-up delay-${i + 1} ${visible ? "visible" : ""}`}
            >
              {/* Colored top bar */}
              <div className="h-1.5 bg-primary" />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${article.color}`}
                  >
                    {t(article.tagKey)}
                  </span>
                  <span className="text-xs text-muted-dark">
                    {t(article.dateKey)}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-foreground font-sans mb-2 leading-snug group-hover:text-primary transition-colors">
                  {t(article.titleKey)}
                </h3>
                <p className="text-sm text-muted-dark leading-relaxed mb-4">
                  {t(article.descKey)}
                </p>
                <span className="text-sm font-medium text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {t("newsReadMore")}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
