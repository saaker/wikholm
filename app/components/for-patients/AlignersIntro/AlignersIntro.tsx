type AlignersIntroProps = {
  what: string;
  whatDesc: string;
};

export function AlignersIntro({ what, whatDesc }: AlignersIntroProps) {
  // Hide component if both fields are empty
  const hasContent = what?.trim() || whatDesc?.trim();
  if (!hasContent) return null;

  return (
    <div className="bg-surface rounded-2xl p-8 sm:p-10 border border-border/50 shadow-sm">
      {what?.trim() && (
        <h3 className="text-lg sm:text-xl font-semibold text-foreground font-sans mb-3">
          {what}
        </h3>
      )}
      {whatDesc?.trim() && (
        <p className="text-muted-dark leading-relaxed">{whatDesc}</p>
      )}
    </div>
  );
}
