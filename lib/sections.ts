/* Server-only store for sections data */
import { kvGet, kvSet } from "./store";
import { DEFAULT_SECTIONS, mergeSections } from "./sectionsDefaults";

// Re-export types for convenience
export type {
  SectionsData,
  ServiceItem,
  AlignerItem,
  AdvantageItem,
  ProcessItem,
  DMItem,
  FAQItem,
  MythItem,
  NewsItem,
} from "./sectionsDefaults";

export { DEFAULT_SECTIONS } from "./sectionsDefaults";

import type { SectionsData } from "./sectionsDefaults";

export async function getSections(): Promise<SectionsData> {
  const saved = await kvGet<Partial<SectionsData>>("sections", DEFAULT_SECTIONS);
  return mergeSections(saved);
}

export async function saveSections(data: SectionsData): Promise<void> {
  await kvSet("sections", data);
}
