import type { ProcessItem } from "@/lib/sectionsDefaults";

type ProcessCardPreviewProps = {
  item: ProcessItem;
  index: number;
  locale: "sv" | "en";
};

export function ProcessCardPreview({
  item,
  index,
  locale,
}: ProcessCardPreviewProps) {
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
