import { Icon } from "@/lib/icons";
import type { AdvantageItem } from "@/lib/sectionsDefaults";

type AdvantageCardPreviewProps = {
  item: AdvantageItem;
  locale: "sv" | "en";
};

export function AdvantageCardPreview({
  item,
  locale,
}: AdvantageCardPreviewProps) {
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
