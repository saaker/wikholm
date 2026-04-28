import type { SectionsData } from "@/lib/sectionsDefaults";
import { asUnknownArray, makeCard } from "../../../shared/cardHelpers";

type UseCardMutationsProps = {
  setSectionsData: React.Dispatch<React.SetStateAction<SectionsData | null>>;
  sectionKey: keyof SectionsData;
  setEditingCard: (i: number | null) => void;
  setMovedCardIds: React.Dispatch<React.SetStateAction<Set<string>>>;
  itemsLength: number;
};

export function useCardMutations({
  setSectionsData,
  sectionKey,
  setEditingCard,
  setMovedCardIds,
  itemsLength,
}: UseCardMutationsProps) {

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
    // Special handling for highlight checkbox on services (checking or unchecking)
    if (sectionKey === "services" && path === "highlight") {
      const wasMovedToTop = value === true && index !== 0;
      let movedItemId: string | undefined;

      setSectionsData((prev) => {
        if (!prev) return prev;
        let arr = [...asUnknownArray(prev[sectionKey])];

        // Always unset highlight on all cards first
        arr = arr.map((item) => ({
          ...item as Record<string, unknown>,
          highlight: false,
        }));

        // If checking (not unchecking), set highlight on this card
        if (value === true) {
          const copy = { ...(arr[index] as Record<string, unknown>) };
          copy.highlight = true;
          arr[index] = copy;

          // Move to top if not already there
          if (index !== 0) {
            const [item] = arr.splice(index, 1);
            movedItemId = (item as Record<string, unknown>).id as string;
            arr.unshift(item);
          }
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
    setEditingCard(itemsLength);
  }

  return {
    updateSectionArray,
    handleItemUpdate,
    addCard,
  };
}
