"use client";

import { NEWS_COLORS } from "@/lib/sectionsDefaults";
import type {
  SectionsData,
  ServiceItem,
  AlignerItem,
  BeforeAfterItem,
  DMItem,
  NewsItem,
} from "@/lib/sectionsDefaults";

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
  saving: boolean;
  readOnly: boolean;
  onSave: () => void;
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
        color: "bg-primary/10 text-primary",
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
}: {
  sectionKey: string;
  item: Record<string, unknown>;
  index: number;
  locale: "sv" | "en";
  onUpdate: (index: number, path: string, value: string | boolean) => void;
}) {
  const update = (path: string, value: string | boolean) =>
    onUpdate(index, path, value);
  const localData = (item[locale] || {}) as Record<string, string>;

  switch (sectionKey) {
    case "services": {
      const svc = item as unknown as ServiceItem;
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
            />
            Markera som highlight
          </label>
        </>
      );
    }
    case "aligners": {
      const al = item as unknown as AlignerItem;
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
      const dm = item as unknown as DMItem;
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
    case "faq":
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
        </>
      );
    case "myths":
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
        </>
      );
    case "news": {
      const ns = item as unknown as NewsItem;
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
      const ba = item as unknown as BeforeAfterItem;
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
  saving,
  readOnly,
  onSave,
}: CardsEditorProps) {
  if (!sectionsData)
    return <p className="text-sm text-muted-dark">Laddar...</p>;

  const items = sectionsData[sectionKey] as unknown as Array<
    Record<string, unknown>
  >;
  const locale = contentLocale;

  function updateSectionArray(updater: (arr: unknown[]) => unknown[]) {
    setSectionsData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [sectionKey]: updater(prev[sectionKey] as unknown as unknown[]),
      } as SectionsData;
    });
  }

  function handleItemUpdate(
    index: number,
    path: string,
    value: string | boolean,
  ) {
    setSectionsData((prev) => {
      if (!prev) return prev;
      const arr = [...(prev[sectionKey] as unknown as unknown[])];
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
      {/* Save button */}
      <div className="flex justify-start">
        <button
          onClick={onSave}
          disabled={saving || readOnly}
          className="px-5 py-2 rounded-xl bg-primary text-white dark:text-black text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-50"
        >
          {saving ? "Sparar..." : "Spara kort"}
        </button>
      </div>

      {/* Card list */}
      {items.map((item, i) => {
        const isEditing = editingCard === i;
        return (
          <div
            key={(item.id as string) || i}
            className={`rounded-2xl border ${isEditing ? "border-primary shadow-md" : "border-border"} overflow-hidden`}
          >
            {/* Preview + controls */}
            <div
              className={`flex items-start gap-3 p-4 bg-muted/30 ${sectionKey === "news" && (item as unknown as NewsItem).hidden ? "opacity-50" : ""}`}
            >
              <div className="flex-1 min-w-0">
                {sectionKey === "news" &&
                  (item as unknown as NewsItem).hidden && (
                    <span className="inline-block mb-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-muted text-muted-dark">
                      Dold
                    </span>
                  )}
                {renderPreview(sectionKey, item, i, locale)}
              </div>
              <div className="flex items-start gap-1 shrink-0">
                <MoveButtons
                  index={i}
                  total={items.length}
                  onMove={(from, to) => {
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
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => setEditingCard(isEditing ? null : i)}
                    className={`w-[40px] h-[40px] flex items-center justify-center rounded-lg text-lg font-medium transition-colors ${isEditing ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-slate-700 text-white hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-500"}`}
                    title={isEditing ? "Spara & stäng" : "Redigera"}
                  >
                    {isEditing ? "✓" : "✎"}
                  </button>
                  <button
                    onClick={() => {
                      if (!confirm("Ta bort detta kort?")) return;
                      updateSectionArray((arr) => deleteItem(arr, i));
                      if (editingCard === i) setEditingCard(null);
                      else if (editingCard !== null && editingCard > i)
                        setEditingCard(editingCard - 1);
                    }}
                    className="w-[40px] h-[40px] flex items-center justify-center rounded-lg bg-red-800 text-white hover:bg-red-900 transition-colors"
                    title="Ta bort"
                  >
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
                  </button>
                </div>
              </div>
            </div>

            {/* Edit form */}
            {isEditing && (
              <div className="p-4 border-t border-border space-y-3">
                <CardEditForm
                  sectionKey={sectionKey}
                  item={item}
                  index={i}
                  locale={locale}
                  onUpdate={handleItemUpdate}
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
