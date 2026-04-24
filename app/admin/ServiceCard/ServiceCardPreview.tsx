import { Icon } from "@/lib/icons";
import type { ServiceItem } from "@/lib/sectionsDefaults";

type ServiceCardPreviewProps = {
  item: ServiceItem;
  locale: "sv" | "en";
};

export function ServiceCardPreview({
  item,
  locale,
}: ServiceCardPreviewProps) {
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
