"use client";

import { useState, useEffect, useRef } from "react";
import { NEWS_COLORS } from "@/lib/sectionsDefaults";
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
import { hasLanguageContent, isCardHidden } from "@/lib/cardHelpers";

import { inputCls } from "./adminTypes";
import {
  Field,
  IconPicker,
  ImagePickerField,
  MoveButtons,
} from "./adminComponents";
import { renderPreview } from "./CardPreviews";

/* ═══════════════════════════════════════════════════
   Props
   ═══════════════════════════════════════════════════ */
interface CardsEditorProps {
  sectionKey: keyof SectionsData;
  sectionsData: SectionsData | null;
  setSectionsData: React.Dispatch<React.SetStateAction<SectionsData | null>>;
  editingCard: number | null;
  setEditingCard: (i: number | null) => void;
  contentLocale: "sv" | "en";
  setContentLocale: (locale: "sv" | "en") => void;
  readOnly: boolean;
  onQuickSave: () => Promise<void>;
}

/* ═══════════════════════════════════════════════════
   Array helpers
   ═══════════════════════════════════════════════════ */
function moveItem<T>(arr: T[], from: number, to: number): T[] {
  const next = [...arr];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function deleteItem<T>(arr: T[], index: number): T[] {
  return arr.filter((_, i) => i !== index);
}

/* ═══════════════════════════════════════════════════
   Type guards and helpers
   ═══════════════════════════════════════════════════ */
// Type assertion helpers - encapsulate type casting for clarity
function asServiceItem(item: Record<string, unknown>): ServiceItem {
  return item as unknown as ServiceItem;
}

function asAlignerItem(item: Record<string, unknown>): AlignerItem {
  return item as unknown as AlignerItem;
}

function asNewsItem(item: Record<string, unknown>): NewsItem {
  return item as unknown as NewsItem;
}

function asDMItem(item: Record<string, unknown>): DMItem {
  return item as unknown as DMItem;
}

function asBeforeAfterItem(item: Record<string, unknown>): BeforeAfterItem {
  return item as unknown as BeforeAfterItem;
}

function asFAQItem(item: Record<string, unknown>): FAQItem {
  return item as unknown as FAQItem;
}

function asMythItem(item: Record<string, unknown>): MythItem {
  return item as unknown as MythItem;
}

function asCardArray(arr: unknown): Array<Record<string, unknown>> {
  return arr as Array<Record<string, unknown>>;
}

function asUnknownArray(arr: unknown): unknown[] {
  return arr as unknown[];
}

/* ═══════════════════════════════════════════════════
   Card factories
   ═══════════════════════════════════════════════════ */
function makeCard(sectionKey: keyof SectionsData): Record<string, unknown> {
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

/* ═══════════════════════════════════════════════════
   Edit form per card type
   ═══════════════════════════════════════════════════ */
function CardEditForm({
  sectionKey,
  item,
  index,
  locale,
  onUpdate,
  allItems,
}: {
  sectionKey: string;
  item: Record<string, unknown>;
  index: number;
  locale: "sv" | "en";
  onUpdate: (index: number, path: string, value: string | boolean) => void;
  allItems: Array<Record<string, unknown>>;
}) {
  const update = (path: string, value: string | boolean) =>
    onUpdate(index, path, value);
  const localData = (item[locale] || {}) as Record<string, string>;

  switch (sectionKey) {
    case "services": {
      const svc = asServiceItem(item);
      // Check if another card (not this one) has highlight checked
      const hasOtherHighlight = Boolean(
        allItems?.some(
          (otherItem, idx) => idx !== index && asServiceItem(otherItem).highlight
        )
      );

      return (
        <>
          <IconPicker value={svc.icon} onChange={(v) => update("icon", v)} />
          <Field
            label="Titel"
            value={localData.title || ""}
            onChange={(v) => update(`${locale}.title`, v)}
          />
          <Field
            label="Beskrivning"
            value={localData.desc || ""}
            onChange={(v) => update(`${locale}.desc`, v)}
            multiline
          />
          <Field
            label="Tagg"
            value={localData.tag || ""}
            onChange={(v) => update(`${locale}.tag`, v)}
          />
          <Field
            label="Pris"
            value={localData.price || ""}
            onChange={(v) => update(`${locale}.price`, v)}
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={svc.highlight}
              onChange={(e) => update("highlight", e.target.checked)}
              className="rounded"
              disabled={hasOtherHighlight && !svc.highlight}
            />
            <span className={hasOtherHighlight && !svc.highlight ? "line-through" : ""}>
              Markera som highlight
            </span>
            {hasOtherHighlight && !svc.highlight && (
              <span className="text-xs text-muted-dark">
                (En annan tjänst är redan markerad som highlight)
              </span>
            )}
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={!!svc.hidden}
              onChange={(e) => update("hidden", e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary"
            />
            <span className="font-medium text-foreground">
              Dold (visas inte på sidan)
            </span>
          </label>
        </>
      );
    }
    case "aligners": {
      const al = asAlignerItem(item);
      return (
        <>
          <IconPicker value={al.icon} onChange={(v) => update("icon", v)} />
          <Field
            label="Titel"
            value={localData.title || ""}
            onChange={(v) => update(`${locale}.title`, v)}
          />
          <Field
            label="Beskrivning"
            value={localData.desc || ""}
            onChange={(v) => update(`${locale}.desc`, v)}
            multiline
          />
        </>
      );
    }
    case "advantages":
      return (
        <>
          <Field
            label="Titel"
            value={localData.title || ""}
            onChange={(v) => update(`${locale}.title`, v)}
          />
          <Field
            label="Beskrivning"
            value={localData.desc || ""}
            onChange={(v) => update(`${locale}.desc`, v)}
            multiline
          />
        </>
      );
    case "process":
      return (
        <>
          <Field
            label="Titel"
            value={localData.title || ""}
            onChange={(v) => update(`${locale}.title`, v)}
          />
          <Field
            label="Beskrivning"
            value={localData.desc || ""}
            onChange={(v) => update(`${locale}.desc`, v)}
            multiline
          />
        </>
      );
    case "dm": {
      const dm = asDMItem(item);
      return (
        <>
          <IconPicker value={dm.icon} onChange={(v) => update("icon", v)} />
          <Field
            label="Titel"
            value={localData.title || ""}
            onChange={(v) => update(`${locale}.title`, v)}
          />
          <Field
            label="Beskrivning"
            value={localData.desc || ""}
            onChange={(v) => update(`${locale}.desc`, v)}
            multiline
          />
        </>
      );
    }
    case "faq": {
      const faq = asFAQItem(item);
      return (
        <>
          <Field
            label="Fråga"
            value={localData.question || ""}
            onChange={(v) => update(`${locale}.question`, v)}
          />
          <Field
            label="Svar"
            value={localData.answer || ""}
            onChange={(v) => update(`${locale}.answer`, v)}
            multiline
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={!!faq.hidden}
              onChange={(e) => update("hidden", e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary"
            />
            <span className="font-medium text-foreground">
              Dold (visas inte på sidan)
            </span>
          </label>
        </>
      );
    }
    case "myths": {
      const myth = asMythItem(item);
      return (
        <>
          <Field
            label="Myt"
            value={localData.myth || ""}
            onChange={(v) => update(`${locale}.myth`, v)}
          />
          <Field
            label="Sanning"
            value={localData.truth || ""}
            onChange={(v) => update(`${locale}.truth`, v)}
            multiline
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={!!myth.hidden}
              onChange={(e) => update("hidden", e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary"
            />
            <span className="font-medium text-foreground">
              Dold (visas inte på sidan)
            </span>
          </label>
        </>
      );
    }
    case "news": {
      const ns = asNewsItem(item);
      return (
        <>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={!!ns.hidden}
              onChange={(e) => update("hidden", e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary"
            />
            <span className="font-medium text-foreground">
              Dold (visas inte på sidan)
            </span>
          </label>
          <Field
            label="Tagg"
            value={localData.tag || ""}
            onChange={(v) => update(`${locale}.tag`, v)}
          />
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Tagg färg
            </label>
            <select
              value={ns.color}
              onChange={(e) => update("color", e.target.value)}
              className={inputCls}
            >
              {NEWS_COLORS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <Field
            label="Datum"
            value={localData.date || ""}
            onChange={(v) => update(`${locale}.date`, v)}
          />
          <Field
            label="Titel"
            value={localData.title || ""}
            onChange={(v) => update(`${locale}.title`, v)}
          />
          <Field
            label="Beskrivning"
            value={localData.desc || ""}
            onChange={(v) => update(`${locale}.desc`, v)}
            multiline
          />
          <ImagePickerField
            label="Bild (visas i modal)"
            value={ns.image || ""}
            onChange={(v) => update("image", v)}
            defaultFolder="news"
          />
          <Field
            label="Fulltext (visas i modal)"
            value={localData.body || ""}
            onChange={(v) => update(`${locale}.body`, v)}
            multiline
            large
          />
        </>
      );
    }
    case "beforeAfter": {
      const ba = asBeforeAfterItem(item);
      return (
        <>
          <ImagePickerField
            label="Före-bild"
            value={ba.before || ""}
            onChange={(v) => update("before", v)}
            defaultFolder="before-after"
          />
          <ImagePickerField
            label="Efter-bild"
            value={ba.after || ""}
            onChange={(v) => update("after", v)}
            defaultFolder="before-after"
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={!!ba.hidden}
              onChange={(e) => update("hidden", e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary"
            />
            <span className="font-medium text-foreground">
              Dold (visas inte på sidan)
            </span>
          </label>
        </>
      );
    }
    default:
      return null;
  }
}

/* ═══════════════════════════════════════════════════
   CardsEditor — full card list with CRUD
   ═══════════════════════════════════════════════════ */
export function CardsEditor({
  sectionKey,
  sectionsData,
  setSectionsData,
  editingCard,
  setEditingCard,
  contentLocale,
  setContentLocale,
  readOnly,
  onQuickSave,
}: CardsEditorProps) {
  // Track original data to detect moves and field changes
  const [originalData, setOriginalData] = useState<Array<Record<string, unknown>>>([]);
  const [deleteConfirming, setDeleteConfirming] = useState<number | null>(null);
  const [movedCardIds, setMovedCardIds] = useState<Set<string>>(new Set());
  const [pendingDeleteSave, setPendingDeleteSave] = useState(false);
  const previousSectionKeyRef = useRef<string | null>(null);

  // Initialize original data only when section changes, not when data changes
  useEffect(() => {
    if (!sectionsData) return;
    // Only initialize when switching to a different section
    if (previousSectionKeyRef.current !== sectionKey) {
      const items = asCardArray(sectionsData[sectionKey]);
      // This setState is intentional - we're syncing with prop changes
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOriginalData(JSON.parse(JSON.stringify(items)));
      previousSectionKeyRef.current = sectionKey;
    }
  }, [sectionsData, sectionKey]);

  // Reset delete confirmation on click outside or after timeout
  useEffect(() => {
    if (deleteConfirming === null) return;

    const handleClickOutside = () => setDeleteConfirming(null);
    const timer = setTimeout(() => setDeleteConfirming(null), 5000); // Auto-reset after 5s

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      clearTimeout(timer);
    };
  }, [deleteConfirming]);

  // Save after delete completes
  useEffect(() => {
    if (!pendingDeleteSave || !sectionsData) return;

    const performSave = async () => {
      await onQuickSave();
      // Update original data and clear moved cards after delete
      const items = asCardArray(sectionsData[sectionKey]);
      setOriginalData(JSON.parse(JSON.stringify(items)));
      setMovedCardIds(new Set());
      setPendingDeleteSave(false);
    };

    performSave();
  }, [pendingDeleteSave, sectionsData, sectionKey, onQuickSave]);

  // Early return after all hooks
  if (!sectionsData)
    return <p className="text-sm text-muted-dark">Laddar...</p>;

  const items = asCardArray(sectionsData[sectionKey]);
  const locale = contentLocale;

  // Helper function to check if a card has been explicitly moved AND is in different position
  function hasBeenMoved(currentIndex: number): boolean {
    if (!sectionsData) return false;
    const items = asCardArray(sectionsData[sectionKey]);
    const currentId = items[currentIndex].id as string;

    // Must be in the moved set AND actually in a different position
    if (!movedCardIds.has(currentId)) return false;

    const originalIndex = originalData.findIndex(item => item.id === currentId);
    return originalIndex !== -1 && originalIndex !== currentIndex;
  }

  // Helper function to check if card fields have changed
  function hasFieldChanges(currentIndex: number): boolean {
    if (!sectionsData) return false;
    const items = asCardArray(sectionsData[sectionKey]);
    const currentCard = items[currentIndex];
    const originalCard = originalData.find(item => item.id === currentCard.id);
    if (!originalCard) return true; // New card - needs to be saved

    // Deep comparison (excluding position)
    return JSON.stringify(currentCard) !== JSON.stringify(originalCard);
  }

  function updateSectionArray(updater: (arr: unknown[]) => unknown[]) {
    setSectionsData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [sectionKey]: updater(asUnknownArray(prev[sectionKey])),
      } as SectionsData;
    });
  }

  function handleItemUpdate(
    index: number,
    path: string,
    value: string | boolean,
  ) {
    // Special handling for highlight checkbox on services
    if (sectionKey === "services" && path === "highlight" && value === true) {
      const wasMovedToTop = index !== 0;
      let movedItemId: string | undefined;

      setSectionsData((prev) => {
        if (!prev) return prev;
        let arr = [...asUnknownArray(prev[sectionKey])];

        // Unset highlight on all other cards
        arr = arr.map((item) => ({
          ...item as Record<string, unknown>,
          highlight: false,
        }));

        // Set highlight on this card
        const copy = { ...(arr[index] as Record<string, unknown>) };
        copy[path] = value;
        arr[index] = copy;

        // Move to top if not already there
        if (index !== 0) {
          const [item] = arr.splice(index, 1);
          movedItemId = (item as Record<string, unknown>).id as string;
          arr.unshift(item);
        }

        return { ...prev, [sectionKey]: arr } as SectionsData;
      });

      // Update state outside of setSectionsData
      if (wasMovedToTop) {
        setEditingCard(0);
        if (movedItemId) {
          setMovedCardIds(new Set([movedItemId]));
        }
      }
      return;
    }

    // Normal update for all other fields
    setSectionsData((prev) => {
      if (!prev) return prev;
      const arr = [...asUnknownArray(prev[sectionKey])];
      const copy = { ...(arr[index] as Record<string, unknown>) };
      if (path.includes(".")) {
        const [a, b] = path.split(".");
        copy[a] = { ...(copy[a] as Record<string, unknown>), [b]: value };
      } else {
        copy[path] = value;
      }
      arr[index] = copy;
      return { ...prev, [sectionKey]: arr } as SectionsData;
    });
  }

  function addCard() {
    updateSectionArray((arr) => [...arr, makeCard(sectionKey)]);
    setEditingCard(items.length);
  }

  return (
    <div className="space-y-4">
      {/* Card list */}
      {items.map((item, i) => {
        const isEditing = editingCard === i;
        return (
          <div
            key={(item.id as string) || i}
            className={`rounded-2xl border ${isEditing ? "border-primary shadow-md" : "border-border"} overflow-hidden`}
          >
            {/* Preview + controls */}
            <div className="flex items-start gap-3 p-4 bg-muted/30">
              <div className={`flex-1 min-w-0 ${isCardHidden(item) ? "opacity-50" : ""}`}>
                {isCardHidden(item) && (
                  <span className="inline-block mb-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-muted text-muted-dark">
                    Dold
                  </span>
                )}
                {renderPreview(sectionKey, item, i, locale)}
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <div className="flex items-start gap-1">
                  {/* Hide move buttons for highlight service cards */}
                  {!(sectionKey === "services" && asServiceItem(item).highlight) && (
                    <MoveButtons
                      index={i}
                      total={items.length}
                      onMove={(from, to) => {
                        // Track which card was explicitly moved
                        const movedCardId = items[from].id as string;
                        setMovedCardIds(prev => new Set(prev).add(movedCardId));

                        updateSectionArray((arr) => moveItem(arr, from, to));
                        if (editingCard === from) setEditingCard(to);
                        else if (editingCard !== null) {
                          if (from < editingCard && to >= editingCard)
                            setEditingCard(editingCard - 1);
                          else if (from > editingCard && to <= editingCard)
                            setEditingCard(editingCard + 1);
                        }
                      }}
                    />
                  )}
                  <div className="flex flex-col gap-1">
                  <button
                    onClick={async () => {
                      const cardHasMoved = hasBeenMoved(i);
                      const cardHasChanges = hasFieldChanges(i);
                      const hasUnsavedChanges = cardHasMoved || cardHasChanges;

                      if (isEditing || hasUnsavedChanges) {
                        // Card is open OR has unsaved changes - save and close
                        if (hasUnsavedChanges) {
                          await onQuickSave();
                          // Update original data and clear moved cards after save
                          const items = asCardArray(sectionsData[sectionKey]);
                          setOriginalData(JSON.parse(JSON.stringify(items)));
                          setMovedCardIds(new Set());
                        }
                        if (isEditing) {
                          setEditingCard(null);
                        }
                      } else {
                        // Card is closed with no changes - check if another card has unsaved changes
                        if (editingCard !== null && editingCard !== i) {
                          // Another card is open - check if it has unsaved changes
                          const otherHasMoved = hasBeenMoved(editingCard);
                          const otherHasChanges = hasFieldChanges(editingCard);
                          if (otherHasMoved || otherHasChanges) {
                            // Don't switch cards - keep the unsaved card open
                            return;
                          }
                        }
                        // Open this card
                        setEditingCard(i);
                      }
                    }}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg text-lg font-medium transition-colors ${
                      isEditing || hasBeenMoved(i) || hasFieldChanges(i)
                        ? "bg-emerald-600 text-white hover:bg-emerald-700"
                        : "bg-slate-700 text-white hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-500"
                    }`}
                    title={isEditing || hasBeenMoved(i) || hasFieldChanges(i) ? "Spara & stäng" : "Redigera"}
                  >
                    {isEditing || hasBeenMoved(i) || hasFieldChanges(i) ? "✓" : "✎"}
                  </button>
                  <button
                    onClick={async (e) => {
                      e.stopPropagation();
                      const isConfirmingDelete = deleteConfirming === i;

                      if (isConfirmingDelete) {
                        // Second click - actually delete
                        updateSectionArray((arr) => deleteItem(arr, i));
                        if (editingCard === i) setEditingCard(null);
                        else if (editingCard !== null && editingCard > i)
                          setEditingCard(editingCard - 1);

                        // Trigger save via useEffect after state updates
                        setPendingDeleteSave(true);
                        setDeleteConfirming(null);
                      } else {
                        // First click - enter confirm mode
                        setDeleteConfirming(i);
                      }
                    }}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
                      deleteConfirming === i
                        ? "bg-red-600 text-white hover:bg-red-700 animate-pulse"
                        : "bg-red-800 text-white hover:bg-red-900"
                    }`}
                    title={deleteConfirming === i ? "Bekräfta radering" : "Ta bort"}
                  >
                    {deleteConfirming === i ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    )}
                  </button>
                  </div>
                </div>
                {/* Language toggle */}
                <div className="flex items-center justify-between gap-1 bg-muted rounded-lg p-0.5 mt-2 w-full">
                  {(["sv", "en"] as const).map((l) => {
                    const isMissing = !hasLanguageContent(sectionKey, item, l);
                    return (
                      <button
                        key={l}
                        onClick={() => setContentLocale(l)}
                        className={`w-1/2 py-1 rounded-md text-xs font-medium transition-colors relative ${contentLocale === l ? "bg-surface text-foreground shadow-sm" : "text-muted-dark"}`}
                      >
                        {l.toUpperCase()}
                        {isMissing && (
                          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-amber-500 rounded-full" title={`${l.toUpperCase()} version is missing`} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Edit form */}
            {isEditing && (
              <div className="p-4 border-t border-border space-y-3">
                {/* Language reminder */}
                {(() => {
                  const otherLang = locale === "sv" ? "en" : "sv";
                  return (
                    <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg text-sm">
                      <span className="text-amber-600 dark:text-amber-400">💡</span>
                      <p className="text-amber-800 dark:text-amber-200 leading-none">
                        Don't forget to add the <strong>{otherLang === "sv" ? "Swedish" : "English"}</strong> version of this card
                      </p>
                    </div>
                  );
                })()}
                <CardEditForm
                  sectionKey={sectionKey}
                  item={item}
                  index={i}
                  locale={locale}
                  onUpdate={handleItemUpdate}
                  allItems={items}
                />
              </div>
            )}
          </div>
        );
      })}

      {/* Add button */}
      <button
        onClick={addCard}
        disabled={readOnly}
        className="w-full py-3 rounded-xl border-2 border-dashed border-primary/30 text-primary font-medium hover:bg-primary-light transition-colors text-sm disabled:opacity-50"
      >
        + Lägg till nytt kort
      </button>
    </div>
  );
}
