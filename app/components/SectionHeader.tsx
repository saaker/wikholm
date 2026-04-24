type SectionHeaderProps = {
  label?: string;
  title1?: string;
  title2?: string;
  intro?: string;
  className?: string;
};

export function SectionHeader({
  label,
  title1,
  title2,
  intro,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`text-center ${className}`}>
      {label && (
        <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
          {label}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-foreground leading-tight mb-4">
        {title1} {title2 && <span className="text-primary">{title2}</span>}
      </h2>
      {intro && <p className="text-muted-dark leading-relaxed">{intro}</p>}
    </div>
  );
}
