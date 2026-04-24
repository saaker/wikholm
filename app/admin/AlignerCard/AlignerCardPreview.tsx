import { Icon } from "@/lib/icons";
import type { AlignerItem } from "@/lib/sectionsDefaults";

type AlignerCardPreviewProps = {
  item: AlignerItem;
  locale: "sv" | "en";
};

export function AlignerCardPreview({
  item,
  locale,
}: AlignerCardPreviewProps) {
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
