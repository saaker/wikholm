import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCardTracking } from "./useCardTracking";
import type { SectionsData } from "@/lib/sectionsDefaults";

describe("useCardTracking", () => {
  describe("initialization", () => {
    it("should initialize with empty movedCardIds", () => {
      const sectionsData = {
        news: [
          { id: "1", hidden: false, sv: { title: "Title" }, en: { title: "" } },
        ],
      } as unknown as SectionsData;

      const { result } = renderHook(() =>
        useCardTracking({
          sectionsData,
          sectionKey: "news",
        })
      );

      expect(result.current.movedCardIds.size).toBe(0);
    });

    it("should store original data on mount", () => {
      const sectionsData = {
        news: [
          { id: "1", hidden: false, sv: { title: "Original" }, en: { title: "" } },
        ],
      } as unknown as SectionsData;

      const { result } = renderHook(() =>
        useCardTracking({
          sectionsData,
          sectionKey: "news",
        })
      );

      // Original data should be captured (tested via hasFieldChanges)
      expect(result.current.hasFieldChanges(0)).toBe(false);
    });
  });

  describe("hasFieldChanges", () => {
    it("should return false when no changes have been made", () => {
      const sectionsData = {
        news: [
          { id: "1", hidden: false, sv: { title: "Title" }, en: { title: "" } },
        ],
      } as unknown as SectionsData;

      const { result } = renderHook(() =>
        useCardTracking({
          sectionsData,
          sectionKey: "news",
        })
      );

      expect(result.current.hasFieldChanges(0)).toBe(false);
    });

    it("should return true when field has changed", () => {
      const sectionsData = {
        news: [
          { id: "1", hidden: false, sv: { title: "Original" }, en: { title: "" } },
        ],
      } as unknown as SectionsData;

      const { result, rerender } = renderHook(
        ({ sectionsData }) =>
          useCardTracking({
            sectionsData,
            sectionKey: "news",
          }),
        { initialProps: { sectionsData } }
      );

      // Change the data
      const updatedData: SectionsData = {
        news: [
          { id: "1", hidden: false, sv: { title: "Changed" }, en: { title: "" } },
        ],
      } as unknown as SectionsData;

      rerender({ sectionsData: updatedData });

      expect(result.current.hasFieldChanges(0)).toBe(true);
    });

    it("should return true for new cards (not in original data)", () => {
      const sectionsData = {
        news: [
          { id: "1", hidden: false, sv: { title: "Original" }, en: { title: "" } },
        ],
      } as unknown as SectionsData;

      const { result, rerender } = renderHook(
        ({ sectionsData }) =>
          useCardTracking({
            sectionsData,
            sectionKey: "news",
          }),
        { initialProps: { sectionsData } }
      );

      // Add a new card
      const updatedData: SectionsData = {
        news: [
          { id: "1", hidden: false, sv: { title: "Original" }, en: { title: "" } },
          { id: "2", hidden: false, sv: { title: "New" }, en: { title: "" } },
        ],
      } as unknown as SectionsData;

      rerender({ sectionsData: updatedData });

      expect(result.current.hasFieldChanges(1)).toBe(true);
    });

    it("should return false when sectionsData is null", () => {
      const { result } = renderHook(() =>
        useCardTracking({
          sectionsData: null,
          sectionKey: "news",
        })
      );

      expect(result.current.hasFieldChanges(0)).toBe(false);
    });

    it("should detect changes in nested fields", () => {
      const sectionsData = {
        news: [
          { id: "1", hidden: false, sv: { title: "Title", desc: "Desc" }, en: { title: "" } },
        ],
      } as unknown as SectionsData;

      const { result, rerender } = renderHook(
        ({ sectionsData }) =>
          useCardTracking({
            sectionsData,
            sectionKey: "news",
          }),
        { initialProps: { sectionsData } }
      );

      const updatedData: SectionsData = {
        news: [
          { id: "1", hidden: false, sv: { title: "Title", desc: "Changed" }, en: { title: "" } },
        ],
      } as unknown as SectionsData;

      rerender({ sectionsData: updatedData });

      expect(result.current.hasFieldChanges(0)).toBe(true);
    });

    it("should detect changes in boolean fields", () => {
      const sectionsData = {
        news: [
          { id: "1", hidden: false, sv: { title: "" }, en: { title: "" } },
        ],
      } as unknown as SectionsData;

      const { result, rerender } = renderHook(
        ({ sectionsData }) =>
          useCardTracking({
            sectionsData,
            sectionKey: "news",
          }),
        { initialProps: { sectionsData } }
      );

      const updatedData: SectionsData = {
        news: [
          { id: "1", hidden: true, sv: { title: "" }, en: { title: "" } },
        ],
      } as unknown as SectionsData;

      rerender({ sectionsData: updatedData });

      expect(result.current.hasFieldChanges(0)).toBe(true);
    });
  });

  describe("hasBeenMoved", () => {
    it("should return false when card has not been moved", () => {
      const sectionsData = {
        news: [
          { id: "1", hidden: false, sv: { title: "" }, en: { title: "" } },
        ],
      } as unknown as SectionsData;

      const { result } = renderHook(() =>
        useCardTracking({
          sectionsData,
          sectionKey: "news",
        })
      );

      expect(result.current.hasBeenMoved(0)).toBe(false);
    });

    it("should return true when card has been moved to different position", () => {
      const sectionsData = {
        news: [
          { id: "1", hidden: false, sv: { title: "First" }, en: { title: "" } },
          { id: "2", hidden: false, sv: { title: "Second" }, en: { title: "" } },
        ],
      } as unknown as SectionsData;

      const { result, rerender } = renderHook(
        ({ sectionsData }) =>
          useCardTracking({
            sectionsData,
            sectionKey: "news",
          }),
        { initialProps: { sectionsData } }
      );

      // Mark card as moved
      act(() => {
        result.current.setMovedCardIds(new Set(["2"]));
      });

      // Swap cards
      const updatedData: SectionsData = {
        news: [
          { id: "2", hidden: false, sv: { title: "Second" }, en: { title: "" } },
          { id: "1", hidden: false, sv: { title: "First" }, en: { title: "" } },
        ],
      } as unknown as SectionsData;

      rerender({ sectionsData: updatedData });

      expect(result.current.hasBeenMoved(0)).toBe(true);
    });

    it("should return false when card is in movedCardIds but at same position", () => {
      const sectionsData = {
        news: [
          { id: "1", hidden: false, sv: { title: "First" }, en: { title: "" } },
          { id: "2", hidden: false, sv: { title: "Second" }, en: { title: "" } },
        ],
      } as unknown as SectionsData;

      const { result } = renderHook(() =>
        useCardTracking({
          sectionsData,
          sectionKey: "news",
        })
      );

      act(() => {
        result.current.setMovedCardIds(new Set(["1"]));
      });

      expect(result.current.hasBeenMoved(0)).toBe(false);
    });

    it("should return false when sectionsData is null", () => {
      const { result } = renderHook(() =>
        useCardTracking({
          sectionsData: null,
          sectionKey: "news",
        })
      );

      expect(result.current.hasBeenMoved(0)).toBe(false);
    });

    it("should return false when card is not in movedCardIds", () => {
      const sectionsData = {
        news: [
          { id: "1", hidden: false, sv: { title: "First" }, en: { title: "" } },
          { id: "2", hidden: false, sv: { title: "Second" }, en: { title: "" } },
        ],
      } as unknown as SectionsData;

      const { result, rerender } = renderHook(
        ({ sectionsData }) =>
          useCardTracking({
            sectionsData,
            sectionKey: "news",
          }),
        { initialProps: { sectionsData } }
      );

      // Swap cards but don't mark as moved
      const updatedData: SectionsData = {
        news: [
          { id: "2", hidden: false, sv: { title: "Second" }, en: { title: "" } },
          { id: "1", hidden: false, sv: { title: "First" }, en: { title: "" } },
        ],
      } as unknown as SectionsData;

      rerender({ sectionsData: updatedData });

      expect(result.current.hasBeenMoved(0)).toBe(false);
    });
  });

  describe("resetTracking", () => {
    it("should reset original data to current state", () => {
      const sectionsData = {
        news: [
          { id: "1", hidden: false, sv: { title: "Original" }, en: { title: "" } },
        ],
      } as unknown as SectionsData;

      const { result, rerender } = renderHook(
        ({ sectionsData }) =>
          useCardTracking({
            sectionsData,
            sectionKey: "news",
          }),
        { initialProps: { sectionsData } }
      );

      // Change the data
      const updatedData: SectionsData = {
        news: [
          { id: "1", hidden: false, sv: { title: "Changed" }, en: { title: "" } },
        ],
      } as unknown as SectionsData;

      rerender({ sectionsData: updatedData });

      expect(result.current.hasFieldChanges(0)).toBe(true);

      // Reset tracking
      act(() => {
        result.current.resetTracking();
      });

      expect(result.current.hasFieldChanges(0)).toBe(false);
    });

    it("should clear movedCardIds", () => {
      const sectionsData = {
        news: [
          { id: "1", hidden: false, sv: { title: "" }, en: { title: "" } },
        ],
      } as unknown as SectionsData;

      const { result } = renderHook(() =>
        useCardTracking({
          sectionsData,
          sectionKey: "news",
        })
      );

      act(() => {
        result.current.setMovedCardIds(new Set(["1"]));
      });

      expect(result.current.movedCardIds.size).toBe(1);

      act(() => {
        result.current.resetTracking();
      });

      expect(result.current.movedCardIds.size).toBe(0);
    });

    it("should handle null sectionsData gracefully", () => {
      const { result } = renderHook(() =>
        useCardTracking({
          sectionsData: null,
          sectionKey: "news",
        })
      );

      act(() => {
        result.current.resetTracking();
      });

      // Should not throw
      expect(result.current.movedCardIds.size).toBe(0);
    });
  });

  describe("section key changes", () => {
    it("should reset original data when section key changes", () => {
      const sectionsData = {
        news: [
          { id: "1", hidden: false, sv: { title: "News" }, en: { title: "" } },
        ],
        faq: [
          { id: "2", hidden: false, sv: { question: "Q", answer: "A" }, en: { question: "", answer: "" } },
        ],
      } as unknown as SectionsData;

      const { result, rerender } = renderHook(
        ({ sectionKey }) =>
          useCardTracking({
            sectionsData,
            sectionKey,
          }),
        { initialProps: { sectionKey: "news" as keyof SectionsData } }
      );

      expect(result.current.hasFieldChanges(0)).toBe(false);

      // Change section key
      rerender({ sectionKey: "faq" as keyof SectionsData });

      // Should have reset and captured new section's data
      expect(result.current.hasFieldChanges(0)).toBe(false);
    });

    it("should preserve tracking state when sectionKey stays the same", () => {
      const sectionsData = {
        news: [
          { id: "1", hidden: false, sv: { title: "News" }, en: { title: "" } },
        ],
      } as unknown as SectionsData;

      const { result, rerender } = renderHook(
        ({ sectionsData }) =>
          useCardTracking({
            sectionsData,
            sectionKey: "news",
          }),
        { initialProps: { sectionsData } }
      );

      // Make changes
      const updatedData: SectionsData = {
        news: [
          { id: "1", hidden: false, sv: { title: "Changed" }, en: { title: "" } },
        ],
      } as unknown as SectionsData;

      rerender({ sectionsData: updatedData });

      expect(result.current.hasFieldChanges(0)).toBe(true);

      // Rerender with same section key but different data object
      rerender({ sectionsData: updatedData });

      // Should still detect changes
      expect(result.current.hasFieldChanges(0)).toBe(true);
    });
  });
});
