type ProcessCardProps = {
  step: {
    id: string;
    sv: { title: string; desc: string };
    en: { title: string; desc: string };
  };
  locale?: "sv" | "en";
  number: string;
  className?: string;
};

export function ProcessCard({
  step,
  locale = "sv",
  number,
  className = "",
}: ProcessCardProps) {
  const text = step[locale];

  return (
    <div className={`relative ${className}`}>
      <div className="relative z-10">
        <span
          className="text-5xl font-serif font-bold leading-none"
          style={{ color: 'var(--color-primary)', opacity: 0.8 }}
        >
          {number}
        </span>
        <h3 className="text-lg font-semibold text-foreground font-sans mt-2 mb-2">
          {text.title}
        </h3>
        <p className="text-sm text-muted-dark leading-relaxed">
          {text.desc}
        </p>
      </div>
    </div>
  );
}
