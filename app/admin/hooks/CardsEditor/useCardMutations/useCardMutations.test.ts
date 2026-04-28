import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCardMutations } from "./useCardMutations";
import type { SectionsData } from "@/lib/sectionsDefaults";
import type React from "react";

describe("useCardMutations", () => {
  let setSectionsData: React.Dispatch<React.SetStateAction<SectionsData | null>>;
  let setEditingCard: (i: number | null) => void;
  let setMovedCardIds: React.Dispatch<React.SetStateAction<Set<string>>>;
  let mockSectionsData: SectionsData | null;

  beforeEach(() => {
    setSectionsData = vi.fn((updater) => {
      if (typeof updater === "function") {
        mockSectionsData = updater(mockSectionsData);
      } else {
        mockSectionsData = updater;
      }
    });
    setEditingCard = vi.fn();
    setMovedCardIds = vi.fn();
    mockSectionsData = null;
  });

  describe("addCard", () => {
    it("should add a new card to the section", () => {
      mockSectionsData = {
        news: [{ id: "1", hidden: false, sv: { title: "" }, en: { title: "" } }],
      } as unknown as SectionsData;

      const { result } = renderHook(() =>
        useCardMutations({
          setSectionsData,
          sectionKey: "news",
          setEditingCard,
          setMovedCardIds,
          itemsLength: 1,
        })
      );

      act(() => {
        result.current.addCard();
      });

      expect(setSectionsData).toHaveBeenCalled();
      expect(setEditingCard).toHaveBeenCalledWith(1);
    });

    it("should set editing card to the new card index", () => {
      mockSectionsData = {
        news: [
          { id: "1", hidden: false, sv: { title: "" }, en: { title: "" } },
          { id: "2", hidden: false, sv: { title: "" }, en: { title: "" } },
        ],
      } as unknown as SectionsData;

      const { result } = renderHook(() =>
        useCardMutations({
          setSectionsData,
          sectionKey: "news",
          setEditingCard,
          setMovedCardIds,
          itemsLength: 2,
        })
      );

      act(() => {
        result.current.addCard();
      });

      expect(setEditingCard).toHaveBeenCalledWith(2);
    });
  });

  describe("handleItemUpdate", () => {
    describe("simple field updates", () => {
      it("should update a simple field", () => {
        mockSectionsData = {
          news: [{ id: "1", hidden: false, sv: { title: "Old" }, en: { title: "" } }],
        } as unknown as SectionsData;

        const { result } = renderHook(() =>
          useCardMutations({
            setSectionsData,
            sectionKey: "news",
            setEditingCard,
            setMovedCardIds,
            itemsLength: 1,
          })
        );

        act(() => {
          result.current.handleItemUpdate(0, "hidden", true);
        });

        expect(setSectionsData).toHaveBeenCalled();
        expect(mockSectionsData?.news[0]).toMatchObject({ hidden: true });
      });

      it("should update a nested field", () => {
        mockSectionsData = {
          news: [{ id: "1", hidden: false, sv: { title: "Old" }, en: { title: "" } }],
        } as unknown as SectionsData;

        const { result } = renderHook(() =>
          useCardMutations({
            setSectionsData,
            sectionKey: "news",
            setEditingCard,
            setMovedCardIds,
            itemsLength: 1,
          })
        );

        act(() => {
          result.current.handleItemUpdate(0, "sv.title", "New Title");
        });

        expect(setSectionsData).toHaveBeenCalled();
        expect(mockSectionsData?.news[0].sv.title).toBe("New Title");
      });

      it("should preserve other fields when updating", () => {
        mockSectionsData = {
          news: [
            {
              id: "1",
              hidden: false,
              sv: { title: "Title", desc: "Desc" },
              en: { title: "", desc: "" },
            },
          ],
        } as unknown as SectionsData;

        const { result } = renderHook(() =>
          useCardMutations({
            setSectionsData,
            sectionKey: "news",
            setEditingCard,
            setMovedCardIds,
            itemsLength: 1,
          })
        );

        act(() => {
          result.current.handleItemUpdate(0, "sv.title", "New Title");
        });

        expect(mockSectionsData?.news[0].sv.desc).toBe("Desc");
        expect(mockSectionsData?.news[0].hidden).toBe(false);
      });
    });

    describe("highlight checkbox logic (services section)", () => {
      it("should clear all highlights and set one card as highlight", () => {
        mockSectionsData = {
          services: [
            { id: "1", highlight: true, hidden: false, sv: { title: "" }, en: { title: "" } },
            { id: "2", highlight: false, hidden: false, sv: { title: "" }, en: { title: "" } },
            { id: "3", highlight: false, hidden: false, sv: { title: "" }, en: { title: "" } },
          ],
        } as unknown as SectionsData;

        const { result } = renderHook(() =>
          useCardMutations({
            setSectionsData,
            sectionKey: "services",
            setEditingCard,
            setMovedCardIds,
            itemsLength: 3,
          })
        );

        act(() => {
          result.current.handleItemUpdate(2, "highlight", true);
        });

        expect(mockSectionsData?.services[0].highlight).toBe(true); // Moved to top
        expect(mockSectionsData?.services[1].highlight).toBe(false);
        expect(mockSectionsData?.services[2].highlight).toBe(false);
        expect(mockSectionsData?.services[0].id).toBe("3"); // ID of moved card
      });

      it("should move highlighted card to the top", () => {
        mockSectionsData = {
          services: [
            { id: "1", highlight: false, hidden: false, sv: { title: "First" }, en: { title: "" } },
            {
              id: "2",
              highlight: false,
              hidden: false,
              sv: { title: "Second" },
              en: { title: "" },
            },
          ],
        } as unknown as SectionsData;

        const { result } = renderHook(() =>
          useCardMutations({
            setSectionsData,
            sectionKey: "services",
            setEditingCard,
            setMovedCardIds,
            itemsLength: 2,
          })
        );

        act(() => {
          result.current.handleItemUpdate(1, "highlight", true);
        });

        expect(mockSectionsData?.services[0].id).toBe("2");
        expect(mockSectionsData?.services[1].id).toBe("1");
        expect(mockSectionsData?.services[0].highlight).toBe(true);
      });

      it("should not move card if already at top", () => {
        mockSectionsData = {
          services: [
            { id: "1", highlight: false, hidden: false, sv: { title: "" }, en: { title: "" } },
            { id: "2", highlight: false, hidden: false, sv: { title: "" }, en: { title: "" } },
          ],
        } as unknown as SectionsData;

        const { result } = renderHook(() =>
          useCardMutations({
            setSectionsData,
            sectionKey: "services",
            setEditingCard,
            setMovedCardIds,
            itemsLength: 2,
          })
        );

        act(() => {
          result.current.handleItemUpdate(0, "highlight", true);
        });

        expect(mockSectionsData?.services[0].id).toBe("1");
        expect(mockSectionsData?.services[1].id).toBe("2");
        expect(setEditingCard).not.toHaveBeenCalled();
        expect(setMovedCardIds).not.toHaveBeenCalled();
      });

      it("should uncheck all highlights when unchecking", () => {
        mockSectionsData = {
          services: [
            { id: "1", highlight: true, hidden: false, sv: { title: "" }, en: { title: "" } },
            { id: "2", highlight: false, hidden: false, sv: { title: "" }, en: { title: "" } },
          ],
        } as unknown as SectionsData;

        const { result } = renderHook(() =>
          useCardMutations({
            setSectionsData,
            sectionKey: "services",
            setEditingCard,
            setMovedCardIds,
            itemsLength: 2,
          })
        );

        act(() => {
          result.current.handleItemUpdate(0, "highlight", false);
        });

        expect(mockSectionsData?.services[0].highlight).toBe(false);
        expect(mockSectionsData?.services[1].highlight).toBe(false);
      });

      it("should update editing card to index 0 when card moved to top", () => {
        mockSectionsData = {
          services: [
            { id: "1", highlight: false, hidden: false, sv: { title: "" }, en: { title: "" } },
            { id: "2", highlight: false, hidden: false, sv: { title: "" }, en: { title: "" } },
          ],
        } as unknown as SectionsData;

        const { result } = renderHook(() =>
          useCardMutations({
            setSectionsData,
            sectionKey: "services",
            setEditingCard,
            setMovedCardIds,
            itemsLength: 2,
          })
        );

        act(() => {
          result.current.handleItemUpdate(1, "highlight", true);
        });

        expect(setEditingCard).toHaveBeenCalledWith(0);
      });

      it("should set moved card ID when card is moved", () => {
        mockSectionsData = {
          services: [
            { id: "1", highlight: false, hidden: false, sv: { title: "" }, en: { title: "" } },
            { id: "2", highlight: false, hidden: false, sv: { title: "" }, en: { title: "" } },
          ],
        } as unknown as SectionsData;

        const { result } = renderHook(() =>
          useCardMutations({
            setSectionsData,
            sectionKey: "services",
            setEditingCard,
            setMovedCardIds,
            itemsLength: 2,
          })
        );

        act(() => {
          result.current.handleItemUpdate(1, "highlight", true);
        });

        expect(setMovedCardIds).toHaveBeenCalledWith(new Set(["2"]));
      });

      it("should only apply special logic to services section", () => {
        mockSectionsData = {
          news: [
            { id: "1", highlight: false, hidden: false, sv: { title: "" }, en: { title: "" } },
            { id: "2", highlight: false, hidden: false, sv: { title: "" }, en: { title: "" } },
          ],
        } as unknown as SectionsData;

        const { result } = renderHook(() =>
          useCardMutations({
            setSectionsData,
            sectionKey: "news",
            setEditingCard,
            setMovedCardIds,
            itemsLength: 2,
          })
        );

        act(() => {
          result.current.handleItemUpdate(1, "highlight", true);
        });

        // Should not move card or update editing state for non-services sections
        expect(mockSectionsData?.news[0].id).toBe("1");
        expect(mockSectionsData?.news[1].id).toBe("2");
        expect(setEditingCard).not.toHaveBeenCalled();
        expect(setMovedCardIds).not.toHaveBeenCalled();
      });
    });
  });

  describe("updateSectionArray", () => {
    it("should update section array using updater function", () => {
      mockSectionsData = {
        news: [
          { id: "1", hidden: false, sv: { title: "First" }, en: { title: "" } },
          { id: "2", hidden: false, sv: { title: "Second" }, en: { title: "" } },
        ],
      } as unknown as SectionsData;

      const { result } = renderHook(() =>
        useCardMutations({
          setSectionsData,
          sectionKey: "news",
          setEditingCard,
          setMovedCardIds,
          itemsLength: 2,
        })
      );

      act(() => {
        result.current.updateSectionArray((arr) => arr.slice(0, 1));
      });

      expect(setSectionsData).toHaveBeenCalled();
      expect(mockSectionsData?.news).toHaveLength(1);
    });

    it("should handle null sectionsData gracefully", () => {
      mockSectionsData = null;

      const { result } = renderHook(() =>
        useCardMutations({
          setSectionsData,
          sectionKey: "news",
          setEditingCard,
          setMovedCardIds,
          itemsLength: 0,
        })
      );

      act(() => {
        result.current.updateSectionArray((arr) => [...arr, { id: "new" }]);
      });

      expect(mockSectionsData).toBeNull();
    });
  });
});
