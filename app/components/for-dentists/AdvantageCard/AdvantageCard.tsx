import { Icon } from "@/lib/icons";
import type { AdvantageItem } from "@/lib/sectionsDefaults";

type AdvantageCardProps = {
  item: AdvantageItem;
  locale: "sv" | "en";
  className?: string;
  preview?: boolean;
};

export function AdvantageCard({
  item,
  locale,
  className = "",
  preview = false,
}: AdvantageCardProps) {
  const text = item[locale];
  const hasTitle = text.title?.trim();
  const hasDesc = text.desc?.trim();

  // Don't render if no content (non-preview mode)
  if (!preview && !hasTitle && !hasDesc) return null;

  return (
    <div className={`flex gap-5 items-start ${className}`}>
      <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary-dark dark:text-primary shrink-0">
        <Icon name="check" className="w-5 h-5" />
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
