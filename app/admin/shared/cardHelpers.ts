import type {
  SectionsData,
  ServiceItem,
  AlignerItem,
  BeforeAfterItem,
  DMItem,
  NewsItem,
  FAQItem,
  MythItem,
} from "@/lib/sectionsDefaults";

export function moveItem<T>(arr: T[], from: number, to: number): T[] {
  const next = [...arr];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

export function deleteItem<T>(arr: T[], index: number): T[] {
  return arr.filter((_, i) => i !== index);
}

export function asServiceItem(item: Record<string, unknown>): ServiceItem {
  return item as unknown as ServiceItem;
}

export function asAlignerItem(item: Record<string, unknown>): AlignerItem {
  return item as unknown as AlignerItem;
}

export function asNewsItem(item: Record<string, unknown>): NewsItem {
  return item as unknown as NewsItem;
}

export function asDMItem(item: Record<string, unknown>): DMItem {
  return item as unknown as DMItem;
}

export function asBeforeAfterItem(item: Record<string, unknown>): BeforeAfterItem {
  return item as unknown as BeforeAfterItem;
}

export function asFAQItem(item: Record<string, unknown>): FAQItem {
  return item as unknown as FAQItem;
}

export function asMythItem(item: Record<string, unknown>): MythItem {
  return item as unknown as MythItem;
}

export function asCardArray(arr: unknown): Array<Record<string, unknown>> {
  return arr as Array<Record<string, unknown>>;
}

export function asUnknownArray(arr: unknown): unknown[] {
  return arr as unknown[];
}

export function makeCard(sectionKey: keyof SectionsData): Record<string, unknown> {
  const ts = Date.now();
  switch (sectionKey) {
    case "services":
      return {
        id: `svc-${ts}`,
        icon: "star",
        highlight: false,
        sv: { title: "", desc: "" },
        en: { title: "", desc: "" },
      };
    case "aligners":
      return {
        id: `al-${ts}`,
        icon: "star",
        sv: { title: "", desc: "" },
        en: { title: "", desc: "" },
      };
    case "advantages":
      return {
        id: `adv-${ts}`,
        sv: { title: "", desc: "" },
        en: { title: "", desc: "" },
      };
    case "process":
      return {
        id: `proc-${ts}`,
        sv: { title: "", desc: "" },
        en: { title: "", desc: "" },
      };
    case "dm":
      return {
        id: `dm-${ts}`,
        icon: "star",
        sv: { title: "", desc: "" },
        en: { title: "", desc: "" },
      };
    case "faq":
      return {
        id: `faq-${ts}`,
        sv: { question: "", answer: "" },
        en: { question: "", answer: "" },
      };
    case "myths":
      return {
        id: `myth-${ts}`,
        sv: { myth: "", truth: "" },
        en: { myth: "", truth: "" },
      };
    case "news":
      return {
        id: `news-${ts}`,
        color: "bg-amber-900 text-white",
        image: "",
        hidden: false,
        sv: { tag: "", date: "", title: "", desc: "", body: "" },
        en: { tag: "", date: "", title: "", desc: "", body: "" },
      };
    case "beforeAfter":
      return {
        id: `ba-${ts}`,
        before: "",
        after: "",
      };
  }
}
