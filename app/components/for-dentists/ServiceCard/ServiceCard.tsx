import { Icon } from "@/lib/icons";
import type { ServiceItem } from "@/lib/sectionsDefaults";
import { forwardRef } from "react";

type ServiceCardProps = {
  item: ServiceItem;
  locale: "sv" | "en";
  className?: string;
  preview?: boolean;
  onClick?: () => void;
  showClickPrompt?: boolean;
};

export const ServiceCard = forwardRef<HTMLDivElement | HTMLButtonElement, ServiceCardProps>(
  function ServiceCard(
    { item, locale, className = "", preview = false, onClick, showClickPrompt = false },
    ref
  ) {
    const text = item[locale];
    const isHighlight = item.highlight;
    const isClickable = !!onClick;

    const hasTitle = text.title?.trim();
    const hasDesc = text.desc?.trim();

    if (!preview && !hasTitle && !hasDesc) return null;

    // Highlight card gets special styling
    if (isHighlight) {
      const Component = isClickable ? "button" : "div";
      const clickProps = isClickable
        ? {
            type: "button" as const,
            onClick,
          }
        : {};

      return (
        <Component
          {...clickProps}
          ref={ref as React.Ref<HTMLButtonElement> & React.Ref<HTMLDivElement>}
          className={`relative ${preview ? "" : "w-full"} text-left bg-linear-to-br from-primary/5 via-surface to-primary/5 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border-2 border-primary/40 ring-2 ring-primary/20 ${isClickable ? "cursor-pointer" : ""} group ${isClickable ? "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" : ""} ${className}`}
        >
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Icon */}
            <div className="w-16 h-16 rounded-xl bg-primary/30 flex items-center justify-center case-icon shrink-0 group-hover:scale-110 transition-transform">
              <Icon name={item.icon} className="w-9 h-9" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                {hasTitle && (
                  <h3 className="text-2xl font-semibold text-foreground font-sans">
                    {text.title}
                  </h3>
                )}
                {text.tag && (
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide service-badge-text"
                    style={{
                      backgroundColor:
                        "color-mix(in oklab, var(--color-primary) 20%, transparent)",
                    }}
                  >
                    {text.tag}
                  </span>
                )}
              </div>
              {hasDesc && (
                <p className="text-base text-muted-dark leading-relaxed mb-4">
                  {text.desc}
                </p>
              )}
              {showClickPrompt && text.clickPrompt && (
                <span className="inline-flex items-center gap-2 text-base font-semibold text-primary group-hover:gap-3 transition-all">
                  {text.clickPrompt}
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
                    backgroundColor:
                      "color-mix(in oklab, var(--color-primary) 20%, transparent)",
                  }}
                >
                  {text.price}
                </span>
              )}
            </div>
          </div>
        </Component>
      );
    }

    // Regular grid card
    const Component = isClickable ? "button" : "div";
    const clickProps = isClickable
      ? {
          type: "button" as const,
          onClick,
        }
      : {};

    return (
      <Component
        {...clickProps}
        ref={ref as React.Ref<HTMLDivElement> & React.Ref<HTMLButtonElement>}
        className={`relative ${isClickable ? "w-full text-left cursor-pointer" : ""} bg-surface rounded-2xl p-8 shadow-sm hover:shadow-md transition-all border border-border/50 ${isClickable ? "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" : ""} ${className}`}
      >
        <div className="flex gap-5">
          <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center text-primary-dark dark:text-primary shrink-0">
            <Icon name={item.icon} className="w-7 h-7" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {hasTitle && (
                <h3 className="text-lg font-semibold text-foreground font-sans">
                  {text.title}
                </h3>
              )}
              {text.tag && (
                <span
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide service-badge-text"
                  style={{
                    backgroundColor:
                      "color-mix(in oklab, var(--color-primary) 20%, transparent)",
                  }}
                >
                  {text.tag}
                </span>
              )}
            </div>
            {hasDesc && (
              <p className="text-sm text-muted-dark leading-relaxed mb-3">
                {text.desc}
              </p>
            )}
            {text.price && (
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold service-badge-text"
                style={{
                  backgroundColor:
                    "color-mix(in oklab, var(--color-primary) 20%, transparent)",
                }}
              >
                {text.price}
              </span>
            )}
          </div>
        </div>
      </Component>
    );
  }
);
