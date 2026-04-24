import Image from "next/image";
import basePath from "@/lib/basePath";
import type { BeforeAfterItem } from "@/lib/sectionsDefaults";

type BeforeAfterCardPreviewProps = {
  item: BeforeAfterItem;
};

export function BeforeAfterCardPreview({ item }: BeforeAfterCardPreviewProps) {
  return (
    <div className="bg-surface rounded-2xl border border-border/50 overflow-hidden shadow-sm">
      <div className="grid grid-cols-2">
        <div className="relative">
          <div className="aspect-square overflow-hidden bg-muted">
            {item.before ? (
              <Image
                src={`${basePath}${item.before}`}
                alt="Före"
                width={600}
                height={600}
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
              <Image
                src={`${basePath}${item.after}`}
                alt="Efter"
                width={600}
                height={600}
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
