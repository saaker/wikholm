import type { SectionsData } from "../sectionsDefaults";

/**
 * Check if a card has content in a specific language
 * Used to determine if language version is complete/missing
 */
export function hasLanguageContent(
  sectionKey: keyof SectionsData,
  item: Record<string, unknown>,
  lang: "sv" | "en"
): boolean {
  // beforeAfter cards don't have language versions
  if (sectionKey === "beforeAfter") {
    return true;
  }

  const langData = item[lang] as Record<string, string> | undefined;
  if (!langData) return false;

  switch (sectionKey) {
    case "services":
    case "aligners":
    case "advantages":
    case "process":
    case "dm":
      return !!(langData.title?.trim() || langData.desc?.trim());
    case "faq":
      return !!(langData.question?.trim() || langData.answer?.trim());
    case "myths":
      return !!(langData.myth?.trim() || langData.truth?.trim());
    case "news":
      return !!(langData.title?.trim() || langData.desc?.trim());
    default:
      return false;
  }
}

/**
 * Type guard to check if a card is hidden
 */
export function isCardHidden(item: Record<string, unknown>): boolean {
  return Boolean((item as { hidden?: boolean }).hidden);
}
