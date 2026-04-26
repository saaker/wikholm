type AlignersCTAProps = {
  ctaReady: string;
  ctaBook: string;
  ctaViewClinics: string;
  ctaViewClinicsLink: string;
  className?: string;
};

export function AlignersCTA({
  ctaReady,
  ctaBook,
  ctaViewClinics,
  ctaViewClinicsLink,
  className = "mt-16",
}: AlignersCTAProps) {
  // Hide component if all fields are empty
  const hasContent =
    ctaReady?.trim() || ctaBook?.trim() || ctaViewClinics?.trim();
  if (!hasContent) return null;

  const hasTextContent = ctaReady?.trim() || ctaBook?.trim();

  return (
    <div className={`text-center ${className}`}>
      <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-8 rounded-2xl bg-surface border border-border/50 shadow-sm">
        {hasTextContent && (
          <div className="text-left">
            {ctaReady?.trim() && (
              <p className="font-semibold text-foreground">{ctaReady}</p>
            )}
            {ctaBook?.trim() && (
              <p className="text-sm text-muted-dark">{ctaBook}</p>
            )}
          </div>
        )}
        {ctaViewClinics?.trim() && (
          <a
            href={ctaViewClinicsLink || "#locations"}
            className="px-6 py-3 rounded-full bg-primary-dark text-white text-sm font-medium hover:bg-primary-dark/90 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            {ctaViewClinics}
          </a>
        )}
      </div>
    </div>
  );
}
