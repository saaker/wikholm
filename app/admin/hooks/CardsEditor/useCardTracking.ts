import { useState, useEffect, useRef } from "react";
import type { SectionsData } from "@/lib/sectionsDefaults";
import { asCardArray } from "../../shared/cardHelpers";

type UseCardTrackingProps = {
  sectionsData: SectionsData | null;
  sectionKey: keyof SectionsData;
};

export function useCardTracking({ sectionsData, sectionKey }: UseCardTrackingProps) {
  const [originalData, setOriginalData] = useState<Array<Record<string, unknown>>>([]);
  const [movedCardIds, setMovedCardIds] = useState<Set<string>>(new Set());
  const previousSectionKeyRef = useRef<string | null>(null);

  // Initialize original data only when section changes
  useEffect(() => {
    if (!sectionsData) return;
    if (previousSectionKeyRef.current !== sectionKey) {
      const items = asCardArray(sectionsData[sectionKey]);
      // This setState is intentional - we're syncing with prop changes
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOriginalData(JSON.parse(JSON.stringify(items)));
      previousSectionKeyRef.current = sectionKey;
    }
  }, [sectionsData, sectionKey]);

  function hasBeenMoved(currentIndex: number): boolean {
    if (!sectionsData) return false;
    const items = asCardArray(sectionsData[sectionKey]);
    const currentId = items[currentIndex].id as string;

    if (!movedCardIds.has(currentId)) return false;

    const originalIndex = originalData.findIndex(item => item.id === currentId);
    return originalIndex !== -1 && originalIndex !== currentIndex;
  }

  function hasFieldChanges(currentIndex: number): boolean {
    if (!sectionsData) return false;
    const items = asCardArray(sectionsData[sectionKey]);
    const currentCard = items[currentIndex];
    const originalCard = originalData.find(item => item.id === currentCard.id);
    if (!originalCard) return true;

    return JSON.stringify(currentCard) !== JSON.stringify(originalCard);
  }

  function resetTracking() {
    if (!sectionsData) return;
    const items = asCardArray(sectionsData[sectionKey]);
    setOriginalData(JSON.parse(JSON.stringify(items)));
    setMovedCardIds(new Set());
  }

  return {
    hasBeenMoved,
    hasFieldChanges,
    resetTracking,
    movedCardIds,
    setMovedCardIds,
  };
}
