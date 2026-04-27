type AdvantagesSectionHeaderProps = {
  label?: string;
  title1?: string;
  title2?: string;
  intro?: string;
  className?: string;
};

export function AdvantagesSectionHeader({
  label,
  title1,
  title2,
  intro,
  className = "",
}: AdvantagesSectionHeaderProps) {
  const hasContent =
    label?.trim() || title1?.trim() || title2?.trim() || intro?.trim();
  if (!hasContent) return null;

  const hasTitle = title1?.trim() || title2?.trim();

  return (
    <div className={`md:pt-[18%] md:sticky md:top-30 text-center md:text-left ${className}`}>
      {label && (
        <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
          {label}
        </p>
      )}
      {hasTitle && (
        <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-foreground leading-tight mb-4">
          {title1} <span className="text-primary">{title2}</span>
        </h2>
      )}
      {intro && <p className="text-muted-dark leading-relaxed">{intro}</p>}
    </div>
  );
}
