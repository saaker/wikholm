import type { FAQItem } from "@/lib/sectionsDefaults";

type FAQCardProps = {
  item: FAQItem;
  locale?: "sv" | "en";
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
};

export function FAQCard({
  item,
  locale = "sv",
  isOpen = false,
  onToggle,
  className = "",
}: FAQCardProps) {
  const text = item[locale] || { question: "", answer: "" };

  return (
    <div
      className={`bg-surface rounded-xl border border-border/50 shadow-sm overflow-hidden has-focus-visible:ring-2 has-focus-visible:ring-primary has-focus-visible:ring-offset-2 transition-shadow ${className}`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left gap-4 hover:bg-muted/30 focus-visible:outline-none focus-visible:bg-muted/30 rounded-t-xl transition-colors"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
      >
        <span className="text-sm font-semibold text-foreground leading-snug">
          {text.question || "—"}
        </span>
        <svg
          className={`w-5 h-5 shrink-0 text-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        id={`faq-answer-${item.id}`}
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
        role="region"
        aria-labelledby={`faq-question-${item.id}`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 text-sm text-foreground/80 leading-relaxed border-t border-border/50 pt-4">
            {text.answer || "—"}
          </div>
        </div>
      </div>
    </div>
  );
}
