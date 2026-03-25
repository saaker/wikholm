import { kvGet, kvSet } from "./store";

export type ContentOverrides = {
  sv: Record<string, string>;
  en: Record<string, string>;
};

const EMPTY: ContentOverrides = { sv: {}, en: {} };

export async function getContent(): Promise<ContentOverrides> {
  return kvGet<ContentOverrides>("content", EMPTY);
}

export async function saveContent(content: ContentOverrides): Promise<void> {
  await kvSet("content", content);
}
