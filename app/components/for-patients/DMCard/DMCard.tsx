import { Icon } from "@/lib/icons";
import type { DMItem } from "@/lib/sectionsDefaults";

type DMCardProps = {
  item: DMItem;
  locale: "sv" | "en";
  className?: string;
  preview?: boolean;
};

export function DMCard({ item, locale, className = "", preview = false }: DMCardProps) {
  const text = item[locale];

  // Don't render if both title and desc are empty for this locale
  // Exception: in preview mode, always show the card (with icon) for better UX
  const hasTitle = text.title?.trim();
  const hasDesc = text.desc?.trim();

  if (!preview && !hasTitle && !hasDesc) return null;

  return (
    <div className={`flex gap-5 items-start ${className}`}>
      <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary-dark dark:text-primary shrink-0">
        <Icon name={item.icon} className="w-6 h-6" />
      </div>
      <div>
        {hasTitle && (
          <h4 className="text-[1.05rem] font-semibold text-foreground font-sans mb-1">
            {text.title}
          </h4>
        )}
        {hasDesc && (
          <p className="text-[0.9rem] text-muted-dark leading-relaxed">
            {text.desc}
          </p>
        )}
      </div>
    </div>
  );
}
