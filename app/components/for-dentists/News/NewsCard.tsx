import type { NewsItem } from "@/lib/sectionsDefaults";

/**
 * Reusable News Card component
 * Used in the News section and admin preview
 */
export function NewsCard({
  article,
  onClick,
  locale = "sv",
  className = "",
}: {
  article: NewsItem;
  onClick?: () => void;
  locale?: "sv" | "en";
  className?: string;
}) {
  const text = article[locale];
  const hasBody = Boolean(article[locale].body);

  return (
    <article
      className={`group bg-surface rounded-2xl border border-border shadow-md hover:shadow-lg transition-all overflow-hidden ${className} ${
        hasBody ? "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" : ""
      }`}
      {...(hasBody && onClick
        ? {
            onClick,
            role: "button",
            tabIndex: 0,
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            },
          }
        : {})}
    >
      {/* Colored top bar */}
      <div className="h-1.5 bg-primary" />

      {/* Content */}
      <div className="p-6">
        {/* Badge and date */}
        <div className="flex items-center flex-wrap gap-3 mb-4">
          <span
            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full whitespace-nowrap ${article.color}`}
          >
            {text.tag}
          </span>
          <span className="text-xs text-muted-dark">{text.date}</span>
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-foreground font-sans mb-2 leading-snug">
          {text.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-dark leading-relaxed mb-4 line-clamp-3">
          {text.desc}
        </p>

        {/* Read more link */}
        {hasBody && (
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all">
            {locale === "sv" ? "Läs mer" : "Read more"}
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        )}
      </div>
    </article>
  );
}
