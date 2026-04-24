import { useEffect, useState, useCallback, useRef } from "react";
import { translations } from "@/lib/i18n";
import type { SectionsData } from "@/lib/sectionsDefaults";
import { DEFAULT_SECTIONS, mergeSections } from "@/lib/sectionsDefaults";
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
  const [draft, setDraft] = useState<Record<string, string | boolean>>({});
  const [saving, setSaving] = useState(false);
  const justSaved = useRef(false);

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
      if (res.ok) {
        setSectionsData(mergeSections(await res.json()));
      } else {
        setSectionsData(DEFAULT_SECTIONS);
      }
    } catch {
      setSectionsData(DEFAULT_SECTIONS);
    }
  }

  // Rebuild content draft when section/locale/overrides change
  useEffect(() => {
    if (activeItem?.type !== "content") return;

    // Skip rebuild if we just saved (prevents visual jump)
    if (justSaved.current) {
      justSaved.current = false;
      return;
    }

    const allSections = [...dentistContentSections, ...patientContentSections];
    const sec = allSections.find((s) => s.id === activeItem.sectionId);
    if (!sec) return;

    const next: Record<string, string | boolean> = {};
    for (const f of sec.fields) {
      const value =
        contentOverrides[contentLocale]?.[f.key] ||
        translations[contentLocale][f.key];

      // Convert string "true"/"false" to boolean for checkbox fields
      if (f.checkbox) {
        next[f.key] = value === "true";
      } else {
        next[f.key] = value;
      }
    }

    setDraft(next);
  }, [activeItem, contentLocale, contentOverrides]);

  const handleFieldChange = useCallback((key: string, value: string | boolean) => {
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
      const rawValue = draft[f.key];

      // Checkbox fields are global settings, not translations - save to both languages
      if (f.checkbox) {
        // Convert boolean to string "true"/"false" for storage
        const checkboxValue = rawValue === true ? "true" : "false";
        payload.sv[f.key] = checkboxValue;
        payload.en[f.key] = checkboxValue;
      } else {
        // Regular translation fields - language-specific
        let val = (rawValue as string) ?? "";
        val = val.trim();

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
    }

    try {
      const res = await fetch(`${basePath}/api/content`, {
        method: "PUT",
        headers: authHeaders,
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        // Set flag to skip next draft rebuild (prevents visual jump)
        justSaved.current = true;
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

  async function handleQuickSave() {
    if (!sectionsData) return;
    try {
      const res = await fetch(`${basePath}/api/sections`, {
        method: "PUT",
        headers: authHeaders,
        body: JSON.stringify(sectionsData),
      });
      if (res.ok) {
        setSectionsData(await res.json());
        // Silent save - no success message to avoid spam
      } else {
        throw new Error("Failed to save");
      }
    } catch {
      showMessage("error", "Kunde inte spara");
    }
  }

  function resetDraft() {
    if (activeItem?.type !== "content") return;
    const allSections = [...dentistContentSections, ...patientContentSections];
    const sec = allSections.find((s) => s.id === activeItem.sectionId);
    if (!sec) return;
    const next: Record<string, string | boolean> = {};
    for (const f of sec.fields) {
      if (f.checkbox) {
        // Checkbox fields: default to false (no translation fallback)
        next[f.key] = false;
      } else {
        // Regular fields: use translation
        next[f.key] = translations[contentLocale][f.key];
      }
    }
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
    handleQuickSave,
    resetDraft,
  };
}
