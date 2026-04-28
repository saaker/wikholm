"use client";

import type { SectionsData } from "@/lib/sectionsDefaults";
import { hasLanguageContent, isCardHidden } from "@/lib/cardHelpers/cardHelpers";
import { MoveButtons } from "../MoveButtons/MoveButtons";
import { renderPreview } from "../shared/renderPreview/renderPreview";
import { renderEditForm } from "../shared/renderEditForm/renderEditForm";
import { moveItem, deleteItem, asServiceItem, asCardArray } from "../shared/cardHelpers";
import { useCardTracking } from "../hooks/CardsEditor/useCardTracking/useCardTracking";
import { useDeleteConfirmation } from "../hooks/CardsEditor/useDeleteConfirmation/useDeleteConfirmation";
import { useCardMutations } from "../hooks/CardsEditor/useCardMutations/useCardMutations";
import { useState } from "react";
import CaseAssessmentModal from "../../components/CaseAssessmentModal";

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
  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);

  const tracking = useCardTracking({ sectionsData, sectionKey });

  const deletion = useDeleteConfirmation({
    onQuickSave,
    sectionsData,
    sectionKey,
    resetTracking: tracking.resetTracking,
  });

  const items = sectionsData ? asCardArray(sectionsData[sectionKey]) : [];

  const mutations = useCardMutations({
    setSectionsData,
    sectionKey,
    setEditingCard,
    setMovedCardIds: tracking.setMovedCardIds,
    itemsLength: items.length,
  });

  const locale = contentLocale;

  if (!sectionsData)
    return <p className="text-sm text-muted-dark">Laddar...</p>;

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
                {renderPreview(sectionKey, item, i, locale, () => setIsCaseModalOpen(true))}
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <div className="flex items-start gap-1">
                  {/* Show placeholder for highlight service cards, move buttons for others */}
                  {sectionKey === "services" && asServiceItem(item).highlight ? (
                    <div className="flex flex-col gap-1">
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary" title="Highlight-kort (alltid först)">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <MoveButtons
                      index={i}
                      total={items.length}
                      onMove={(from, to) => {
                        // Track which card was explicitly moved
                        const movedCardId = items[from].id as string;
                        tracking.setMovedCardIds(prev => new Set(prev).add(movedCardId));

                        mutations.updateSectionArray((arr) => moveItem(arr, from, to));
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
                      const cardHasMoved = tracking.hasBeenMoved(i);
                      const cardHasChanges = tracking.hasFieldChanges(i);
                      const hasUnsavedChanges = cardHasMoved || cardHasChanges;

                      if (isEditing || hasUnsavedChanges) {
                        // Card is open OR has unsaved changes - save and close
                        if (hasUnsavedChanges) {
                          await onQuickSave();
                          tracking.resetTracking();
                        }
                        if (isEditing) {
                          setEditingCard(null);
                        }
                      } else {
                        // Card is closed with no changes - check if another card has unsaved changes
                        if (editingCard !== null && editingCard !== i) {
                          // Another card is open - check if it has unsaved changes
                          const otherHasMoved = tracking.hasBeenMoved(editingCard);
                          const otherHasChanges = tracking.hasFieldChanges(editingCard);
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
                      isEditing || tracking.hasBeenMoved(i) || tracking.hasFieldChanges(i)
                        ? "bg-emerald-600 text-white hover:bg-emerald-700"
                        : "bg-slate-700 text-white hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-500"
                    }`}
                    title={isEditing || tracking.hasBeenMoved(i) || tracking.hasFieldChanges(i) ? "Spara & stäng" : "Redigera"}
                  >
                    {isEditing || tracking.hasBeenMoved(i) || tracking.hasFieldChanges(i) ? "✓" : "✎"}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deletion.handleDeleteClick(i, () => {
                        mutations.updateSectionArray((arr) => deleteItem(arr, i));
                        if (editingCard === i) setEditingCard(null);
                        else if (editingCard !== null && editingCard > i)
                          setEditingCard(editingCard - 1);
                      });
                    }}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
                      deletion.deleteConfirming === i
                        ? "bg-red-600 text-white hover:bg-red-700 animate-pulse"
                        : "bg-red-800 text-white hover:bg-red-900"
                    }`}
                    title={deletion.deleteConfirming === i ? "Bekräfta radering" : "Ta bort"}
                  >
                    {deletion.deleteConfirming === i ? (
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
                        Don&apos;t forget to add the <strong>{otherLang === "sv" ? "Swedish" : "English"}</strong> version of this card
                      </p>
                    </div>
                  );
                })()}
                {renderEditForm({
                  sectionKey,
                  item,
                  index: i,
                  locale,
                  onUpdate: mutations.handleItemUpdate,
                  allItems: items,
                })}
              </div>
            )}
          </div>
        );
      })}

      {/* Add button */}
      <button
        onClick={mutations.addCard}
        disabled={readOnly}
        className="w-full py-3 rounded-xl border-2 border-dashed border-primary/30 text-primary font-medium hover:bg-primary-light transition-colors text-sm disabled:opacity-50"
      >
        + Lägg till nytt kort
      </button>

      {/* Case Assessment Modal (for services section preview) */}
      {sectionKey === "services" && (
        <CaseAssessmentModal
          isOpen={isCaseModalOpen}
          onClose={() => setIsCaseModalOpen(false)}
        />
      )}
    </div>
  );
}
