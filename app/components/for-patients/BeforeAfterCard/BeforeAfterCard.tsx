import { forwardRef } from "react";
import Image from "next/image";
import basePath from "@/lib/basePath";
import type { BeforeAfterItem } from "@/lib/sectionsDefaults";

type BeforeAfterCardProps = {
  item: BeforeAfterItem;
  beforeLabel: string;
  afterLabel: string;
  onClick?: () => void;
  className?: string;
  preview?: boolean;
  noImageText?: string;
};

export const BeforeAfterCard = forwardRef<
  HTMLButtonElement | HTMLDivElement,
  BeforeAfterCardProps
>(function BeforeAfterCard(
  {
    item,
    beforeLabel,
    afterLabel,
    onClick,
    className = "",
    preview = false,
    noImageText = "No image",
  },
  ref
) {
  // Don't render if both images are missing (non-preview mode)
  if (!preview && !item.before && !item.after) return null;

  const Component = onClick ? "button" : "div";
  const interactiveClasses = onClick
    ? "cursor-pointer hover:shadow-md hover:scale-[1.01] transition-all text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    : "";

  return (
    <Component
      ref={ref as never}
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={`bg-surface rounded-2xl border border-border/50 overflow-hidden shadow-sm ${interactiveClasses} ${className}`}
    >
      <div className="grid grid-cols-2">
        {/* Before */}
        <div className="relative">
          <div className="aspect-square overflow-hidden bg-muted">
            {item.before ? (
              <Image
                src={`${basePath}${item.before}`}
                alt={`${beforeLabel} – Patient ${item.id}`}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-dark text-xs">
                {noImageText}
              </div>
            )}
          </div>
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-foreground/80 text-background">
            {beforeLabel}
          </span>
        </div>

        {/* After */}
        <div className="relative">
          <div className="aspect-square overflow-hidden bg-muted">
            {item.after ? (
              <Image
                src={`${basePath}${item.after}`}
                alt={`${afterLabel} – Patient ${item.id}`}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-dark text-xs">
                {noImageText}
              </div>
            )}
          </div>
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-primary-dark text-white dark:bg-primary-dark">
            {afterLabel}
          </span>
        </div>
      </div>
    </Component>
  );
});
