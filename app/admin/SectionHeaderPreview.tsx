"use client";

/**
 * Renders a section header using actual component styling
 * This matches the real headers from components like Services, FAQ, etc.
 */
export function SectionHeaderPreview({
  label,
  title1,
  title2,
  intro,
  bgClass = "bg-muted",
}: {
  label?: string;
  title1?: string;
  title2?: string;
  intro?: string;
  bgClass?: string;
}) {
  return (
    <section className={`py-12 ${bgClass} rounded-xl`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          {label && (
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
              {label}
            </p>
          )}
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-foreground leading-tight mb-4">
            {title1} {title2 && <span className="text-primary">{title2}</span>}
          </h2>
          {intro && (
            <p className="text-muted-dark leading-relaxed">
              {intro}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
