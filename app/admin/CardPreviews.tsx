"use client";

import { Icon } from "@/lib/icons";
import basePath from "@/lib/basePath";
import { NewsCard } from "../components/for-dentists/NewsCard";
import { FAQCard } from "../components/for-patients/FAQCard";
import type {
  ServiceItem,
  AlignerItem,
  AdvantageItem,
  ProcessItem,
  DMItem,
  FAQItem,
  MythItem,
  NewsItem,
  BeforeAfterItem,
} from "@/lib/sectionsDefaults";

export function ServiceCardPreview({
  item,
  locale,
}: {
  item: ServiceItem;
  locale: "sv" | "en";
}) {
  const text = item[locale];
  return (
    <div
      className={`bg-surface rounded-2xl p-8 shadow-sm border ${item.highlight ? "border-primary/30 ring-1 ring-primary/10" : "border-border/50"}`}
    >
      <div className="flex gap-5">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${item.id === "case" ? "w-16 h-16 bg-primary/30 case-icon" : "bg-primary-light text-primary-dark dark:text-primary"}`}>
          <Icon name={item.icon} className={item.id === "case" ? "w-9 h-9" : "w-7 h-7"} />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-foreground font-sans">
              {text.title || "—"}
            </h3>
            {text.tag && (
              <span
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide service-badge-text"
                style={{
                  backgroundColor: 'color-mix(in oklab, var(--color-primary) 20%, transparent)'
                }}
              >
                {text.tag}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-dark leading-relaxed mb-3 line-clamp-3">
            {text.desc || "—"}
          </p>
          {item.id === "case" && (
            <span className="inline-flex items-center gap-2 text-base font-semibold text-primary">
              {locale === "sv" ? "Se hur du skickar ditt fall" : "See how to submit your case"}
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          )}
          {text.price && (
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold service-badge-text"
              style={{
                backgroundColor: 'color-mix(in oklab, var(--color-primary) 20%, transparent)'
              }}
            >
              {text.price}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function AlignerCardPreview({
  item,
  locale,
}: {
  item: AlignerItem;
  locale: "sv" | "en";
}) {
  const text = item[locale];
  return (
    <div className="bg-surface rounded-2xl p-8 shadow-sm border border-border/50">
      <div className="flex gap-5">
        <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center text-primary-dark dark:text-primary shrink-0">
          <Icon name={item.icon} className="w-6 h-6" />
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-foreground font-sans mb-2">
            {text.title || "—"}
          </h3>
          <p className="text-sm text-muted-dark leading-relaxed line-clamp-3">
            {text.desc || "—"}
          </p>
        </div>
      </div>
    </div>
  );
}

export function AdvantageCardPreview({
  item,
  locale,
}: {
  item: AdvantageItem;
  locale: "sv" | "en";
}) {
  const text = item[locale];
  return (
    <div className="flex gap-5 items-start py-3">
      <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary-dark dark:text-primary shrink-0">
        <Icon name="check" className="w-5 h-5" />
      </div>
      <div>
        <h4 className="text-[1.05rem] font-semibold text-foreground font-sans mb-1">
          {text.title || "—"}
        </h4>
        <p className="text-[0.9rem] text-muted-dark leading-relaxed line-clamp-2">
          {text.desc || "—"}
        </p>
      </div>
    </div>
  );
}

export function ProcessCardPreview({
  item,
  index,
  locale,
}: {
  item: ProcessItem;
  index: number;
  locale: "sv" | "en";
}) {
  const text = item[locale];
  return (
    <div className="py-3">
      <span
        className="text-5xl font-serif font-bold leading-none"
        style={{ color: 'var(--color-primary)', opacity: 0.8 }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="text-lg font-semibold text-foreground font-sans mt-2 mb-2">
        {text.title || "—"}
      </h3>
      <p className="text-sm text-muted-dark leading-relaxed line-clamp-2">
        {text.desc || "—"}
      </p>
    </div>
  );
}

export function DMCardPreview({
  item,
  locale,
}: {
  item: DMItem;
  locale: "sv" | "en";
}) {
  const text = item[locale];
  return (
    <div className="flex gap-5 items-start py-3">
      <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary-dark dark:text-primary shrink-0">
        <Icon name={item.icon} className="w-6 h-6" />
      </div>
      <div>
        <h4 className="text-[1.05rem] font-semibold text-foreground font-sans mb-1">
          {text.title || "—"}
        </h4>
        <p className="text-[0.9rem] text-muted-dark leading-relaxed line-clamp-2">
          {text.desc || "—"}
        </p>
      </div>
    </div>
  );
}

export function FAQCardPreview({
  item,
  locale,
}: {
  item: FAQItem;
  locale: "sv" | "en";
}) {
  // Use the actual FAQCard component - single source of truth!
  // Show it in open state for preview
  return <FAQCard item={item} locale={locale} isOpen={true} />;
}

export function MythCardPreview({
  item,
  locale,
}: {
  item: MythItem;
  locale: "sv" | "en";
}) {
  const text = item[locale];
  const mythLabel = locale === "sv" ? "MYT" : "MYTH";
  const truthLabel = locale === "sv" ? "SANNING" : "TRUTH";

  return (
    <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-5 gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-myth-bg text-myth-text shrink-0">
            {mythLabel}
          </span>
          <span className="text-sm font-semibold text-foreground leading-snug">
            {text.myth || "—"}
          </span>
        </div>
        <svg
          className="w-5 h-5 shrink-0 text-primary"
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
      </div>
      <div className="px-5 pb-5 flex gap-3 items-start border-t border-border pt-4">
        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-truth-bg text-truth-text shrink-0 mt-0.5">
          {truthLabel}
        </span>
        <p className="text-sm text-foreground/80 leading-relaxed line-clamp-2">
          {text.truth || "—"}
        </p>
      </div>
    </div>
  );
}

export function NewsCardPreview({
  item,
  locale,
}: {
  item: NewsItem;
  locale: "sv" | "en";
}) {
  // Use the actual NewsCard component - single source of truth!
  return <NewsCard article={item} locale={locale} />;
}

export function BeforeAfterCardPreview({ item }: { item: BeforeAfterItem }) {
  return (
    <div className="bg-surface rounded-2xl border border-border/50 overflow-hidden shadow-sm">
      <div className="grid grid-cols-2">
        <div className="relative">
          <div className="aspect-square overflow-hidden bg-muted">
            {item.before ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={`${basePath}${item.before}`}
                alt="Före"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-dark text-xs">
                Ingen bild
              </div>
            )}
          </div>
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-foreground/80 text-background">
            FÖRE
          </span>
        </div>
        <div className="relative">
          <div className="aspect-square overflow-hidden bg-muted">
            {item.after ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={`${basePath}${item.after}`}
                alt="Efter"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-dark text-xs">
                Ingen bild
              </div>
            )}
          </div>
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-primary-dark text-white dark:bg-primary-dark">
            EFTER
          </span>
        </div>
      </div>
    </div>
  );
}

/* Dispatch helper: renders the correct preview for a section key */
export function renderPreview(
  key: string,
  item: Record<string, unknown>,
  i: number,
  locale: "sv" | "en",
) {
  switch (key) {
    case "services":
      return (
        <ServiceCardPreview
          item={item as unknown as ServiceItem}
          locale={locale}
        />
      );
    case "aligners":
      return (
        <AlignerCardPreview
          item={item as unknown as AlignerItem}
          locale={locale}
        />
      );
    case "advantages":
      return (
        <AdvantageCardPreview
          item={item as unknown as AdvantageItem}
          locale={locale}
        />
      );
    case "process":
      return (
        <ProcessCardPreview
          item={item as unknown as ProcessItem}
          index={i}
          locale={locale}
        />
      );
    case "dm":
      return <DMCardPreview item={item as unknown as DMItem} locale={locale} />;
    case "faq":
      return (
        <FAQCardPreview item={item as unknown as FAQItem} locale={locale} />
      );
    case "myths":
      return (
        <MythCardPreview item={item as unknown as MythItem} locale={locale} />
      );
    case "news":
      return (
        <NewsCardPreview item={item as unknown as NewsItem} locale={locale} />
      );
    case "beforeAfter":
      return (
        <BeforeAfterCardPreview item={item as unknown as BeforeAfterItem} />
      );
    default:
      return null;
  }
}
