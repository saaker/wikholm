"use client";

import { useState, useEffect, useCallback } from "react";
import { useI18n } from "../I18nProvider";
import { useSections } from "../SectionsProvider";
import { useAnimateIn } from "../hooks/useAnimateIn";
import type { NewsItem } from "@/lib/sectionsDefaults";
import basePath from "@/lib/basePath";

export default function News() {
  const { t, locale } = useI18n();
  const { sections } = useSections();
  const { ref, visible } = useAnimateIn();
  const [selected, setSelected] = useState<NewsItem | null>(null);

  const close = useCallback(() => setSelected(null), []);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [selected, close]);

  return (
    <section id="news" className="py-24 bg-muted">
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
          {sections.news
            .filter((a) => !a.hidden)
            .map((article, i) => {
              const text = article[locale];
              const hasBody = !!text.body?.trim();
              return (
                <article
                  key={article.id}
                  className={`group bg-surface rounded-2xl border border-border shadow-md hover:shadow-lg transition-all overflow-hidden animate-fade-up delay-${i + 1} ${visible ? "visible" : ""} ${hasBody ? "cursor-pointer" : ""}`}
                  {...(hasBody
                    ? {
                        onClick: () => setSelected(article),
                        role: "button",
                        tabIndex: 0,
                        onKeyDown: (e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setSelected(article);
                          }
                        },
                      }
                    : {})}
                >
                  {/* Colored top bar */}
                  <div className="h-1.5 bg-primary" />
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${article.color}`}
                      >
                        {text.tag}
                      </span>
                      <span className="text-xs text-muted-dark">
                        {text.date}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-foreground font-sans mb-2 leading-snug group-hover:text-primary transition-colors">
                      {text.title}
                    </h3>
                    <p className="text-sm text-muted-dark leading-relaxed mb-4">
                      {text.desc}
                    </p>
                    {hasBody && (
                      <span className="text-sm font-medium text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                        {t("newsReadMore")}
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
        </div>
      </div>

      {/* Article modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="bg-surface rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto relative">
            <div className="h-1.5 bg-primary rounded-t-2xl" />
            <button
              onClick={close}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors text-muted-dark hover:text-foreground"
              aria-label="Stäng"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${selected.color}`}
                >
                  {selected[locale].tag}
                </span>
                <span className="text-xs text-muted-dark">
                  {selected[locale].date}
                </span>
              </div>
              <h3 className="text-2xl font-serif font-semibold text-foreground mb-3 leading-snug">
                {selected[locale].title}
              </h3>
              <p className="text-muted-dark leading-relaxed mb-6">
                {selected[locale].desc}
              </p>
              {selected.image && (
                <img
                  src={`${basePath}${selected.image}`}
                  alt={selected[locale].title}
                  className="w-full rounded-xl mb-6 object-cover max-h-80"
                />
              )}
              <div className="border-t border-border pt-6 space-y-4">
                {selected[locale].body?.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="text-foreground/90 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
