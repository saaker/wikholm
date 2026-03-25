import { useEffect, useState, useCallback } from "react";
import { translations } from "@/lib/i18n";
import type { SectionsData } from "@/lib/sectionsDefaults";
import basePath from "@/lib/basePath";
import {
  type ContentOverrides,
  type SidebarItem,
  dentistContentSections,
  patientContentSections,
} from "../adminTypes";

export function useContentEditor(
  activeItem: SidebarItem | undefined,
  authHeaders: Record<string, string>,
  showMessage: (type: "success" | "error", text: string) => void,
) {
  const [contentOverrides, setContentOverrides] = useState<ContentOverrides>({
    sv: {},
    en: {},
  });
  const [contentLocale, setContentLocale] = useState<"sv" | "en">("sv");
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  /* ── Sections state ── */
  const [sectionsData, setSectionsData] = useState<SectionsData | null>(null);
  const [editingCard, setEditingCard] = useState<number | null>(null);

  async function fetchContent() {
    try {
      const res = await fetch(`${basePath}/api/content`);
      if (res.ok) setContentOverrides(await res.json());
    } catch {
      /* ignore */
    }
  }

  async function fetchSections() {
    try {
      const res = await fetch(`${basePath}/api/sections`);
      if (res.ok) setSectionsData(await res.json());
    } catch {
      /* ignore */
    }
  }

  // Rebuild content draft when section/locale changes
  useEffect(() => {
    if (activeItem?.type !== "content") return;
    const allSections = [...dentistContentSections, ...patientContentSections];
    const sec = allSections.find((s) => s.id === activeItem.sectionId);
    if (!sec) return;
    const next: Record<string, string> = {};
    for (const f of sec.fields) {
      next[f.key] =
        contentOverrides[contentLocale]?.[f.key] ||
        translations[contentLocale][f.key];
    }
    setDraft(next);
  }, [activeItem, contentLocale, contentOverrides]);

  const handleFieldChange = useCallback((key: string, value: string) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }, []);

  async function handleContentSave() {
    if (activeItem?.type !== "content") return;
    setSaving(true);
    const allSections = [...dentistContentSections, ...patientContentSections];
    const sec = allSections.find((s) => s.id === activeItem.sectionId);
    if (!sec) {
      setSaving(false);
      return;
    }

    const payload: ContentOverrides = {
      sv: { ...contentOverrides.sv },
      en: { ...contentOverrides.en },
    };
    for (const f of sec.fields) {
      let val = draft[f.key]?.trim() ?? "";
      if (f.multiline) {
        val = val
          .replace(/\r\n/g, "\n")
          .replace(/[^\S\n]+/g, " ")
          .replace(/ *\n */g, "\n")
          .trim();
      }
      const base = translations[contentLocale][f.key];
      if (val !== "" && val !== base) {
        payload[contentLocale][f.key] = val;
      } else {
        delete payload[contentLocale][f.key];
      }
    }

    try {
      const res = await fetch(`${basePath}/api/content`, {
        method: "PUT",
        headers: authHeaders,
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setContentOverrides(await res.json());
        showMessage("success", "Innehåll sparat!");
      } else showMessage("error", "Kunde inte spara innehåll");
    } catch {
      showMessage("error", "Nätverksfel");
    } finally {
      setSaving(false);
    }
  }

  async function handleSectionsSave() {
    if (!sectionsData) return;
    setSaving(true);
    try {
      const res = await fetch(`${basePath}/api/sections`, {
        method: "PUT",
        headers: authHeaders,
        body: JSON.stringify(sectionsData),
      });
      if (res.ok) {
        setSectionsData(await res.json());
        showMessage("success", "Kort sparade!");
      } else showMessage("error", "Kunde inte spara");
    } catch {
      showMessage("error", "Nätverksfel");
    } finally {
      setSaving(false);
    }
  }

  function resetDraft() {
    if (activeItem?.type !== "content") return;
    const allSections = [...dentistContentSections, ...patientContentSections];
    const sec = allSections.find((s) => s.id === activeItem.sectionId);
    if (!sec) return;
    const next: Record<string, string> = {};
    for (const f of sec.fields)
      next[f.key] = translations[contentLocale][f.key];
    setDraft(next);
  }

  return {
    contentOverrides,
    contentLocale,
    setContentLocale,
    draft,
    saving,
    sectionsData,
    setSectionsData,
    editingCard,
    setEditingCard,
    fetchContent,
    fetchSections,
    handleFieldChange,
    handleContentSave,
    handleSectionsSave,
    resetDraft,
  };
}
