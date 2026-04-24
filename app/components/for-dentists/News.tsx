"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { useI18n } from "../I18nProvider";
import { useSections } from "../SectionsProvider";
import { useAnimateIn } from "../hooks/useAnimateIn";
import type { NewsItem } from "@/lib/sectionsDefaults";
import basePath from "@/lib/basePath";
import { getDelayClass } from "../utils/animationHelpers";
import { NewsCard } from "./NewsCard";

export default function News() {
  const { t, locale } = useI18n();
  const { sections } = useSections();
  const { ref, visible } = useAnimateIn();
  const [selected, setSelected] = useState<NewsItem | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setSelected(null);
    // Return focus to the element that opened the modal
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  }, []);

  // Focus management and keyboard handling
  useEffect(() => {
    if (!selected) return;

    // Move focus to close button when modal opens
    closeButtonRef.current?.focus();

    // Handle Escape key
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);

    // Focus trap
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };
    document.addEventListener("keydown", handleTab);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("keydown", handleTab);
    };
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
            .map((article, i) => (
              <NewsCard
                key={article.id}
                article={article}
                locale={locale}
                onClick={() => {
                  triggerRef.current = document.activeElement as HTMLElement;
                  setSelected(article);
                }}
                className={`animate-fade-up ${getDelayClass(i, 3)} ${visible ? "visible" : ""}`}
              />
            ))}
        </div>
      </div>

      {/* Article modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            ref={modalRef}
            className="bg-surface rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto relative"
          >
            <div className="h-1.5 bg-primary rounded-t-2xl" />
            <button
              ref={closeButtonRef}
              onClick={close}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors text-muted-dark hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
              <div className="flex items-center flex-wrap gap-3 mb-4">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full whitespace-nowrap ${selected.color}`}
                >
                  {selected[locale].tag}
                </span>
                <span className="text-xs text-muted-dark">
                  {selected[locale].date}
                </span>
              </div>
              <h3
                id="modal-title"
                className="text-2xl font-serif font-semibold text-foreground mb-3 leading-snug"
              >
                {selected[locale].title}
              </h3>
              <p className="text-muted-dark leading-relaxed mb-6">
                {selected[locale].desc}
              </p>
              {selected.image && (
                <div className="relative w-full h-80 rounded-xl mb-6 overflow-hidden">
                  <Image
                    src={`${basePath}${selected.image}`}
                    alt={selected[locale].title}
                    fill
                    className="object-cover"
                  />
                </div>
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
