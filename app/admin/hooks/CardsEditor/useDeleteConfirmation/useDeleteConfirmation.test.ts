import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useDeleteConfirmation } from "./useDeleteConfirmation";
import type { SectionsData } from "@/lib/sectionsDefaults";

describe("useDeleteConfirmation", () => {
  let onQuickSave: () => Promise<void>;
  let resetTracking: () => void;
  let sectionsData: SectionsData | null;

  beforeEach(() => {
    vi.useFakeTimers();
    onQuickSave = vi.fn().mockResolvedValue(undefined);
    resetTracking = vi.fn();
    sectionsData = {
      news: [
        { id: "1", hidden: false, sv: { title: "" }, en: { title: "" } },
      ],
    } as unknown as SectionsData;
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  describe("initialization", () => {
    it("should initialize with no delete confirmation", () => {
      const { result } = renderHook(() =>
        useDeleteConfirmation({
          onQuickSave,
          sectionsData,
          sectionKey: "news",
          resetTracking,
        })
      );

      expect(result.current.deleteConfirming).toBeNull();
    });
  });

  describe("handleDeleteClick", () => {
    it("should set deleteConfirming on first click", () => {
      const { result } = renderHook(() =>
        useDeleteConfirmation({
          onQuickSave,
          sectionsData,
          sectionKey: "news",
          resetTracking,
        })
      );

      const onDelete = vi.fn();

      act(() => {
        result.current.handleDeleteClick(0, onDelete);
      });

      expect(result.current.deleteConfirming).toBe(0);
      expect(onDelete).not.toHaveBeenCalled();
    });

    it("should call onDelete on second click (confirmation)", () => {
      const { result } = renderHook(() =>
        useDeleteConfirmation({
          onQuickSave,
          sectionsData,
          sectionKey: "news",
          resetTracking,
        })
      );

      const onDelete = vi.fn();

      // First click - confirm
      act(() => {
        result.current.handleDeleteClick(0, onDelete);
      });

      // Second click - delete
      act(() => {
        result.current.handleDeleteClick(0, onDelete);
      });

      expect(onDelete).toHaveBeenCalledOnce();
      expect(result.current.deleteConfirming).toBeNull();
    });

    it("should trigger save after delete confirmation", async () => {
      vi.useRealTimers(); // Use real timers for async operations

      const { result } = renderHook(() =>
        useDeleteConfirmation({
          onQuickSave,
          sectionsData,
          sectionKey: "news",
          resetTracking,
        })
      );

      const onDelete = vi.fn();

      // First click
      act(() => {
        result.current.handleDeleteClick(0, onDelete);
      });

      // Second click (confirm delete)
      act(() => {
        result.current.handleDeleteClick(0, onDelete);
      });

      await waitFor(() => {
        expect(onQuickSave).toHaveBeenCalledOnce();
        expect(resetTracking).toHaveBeenCalledOnce();
      });

      vi.useFakeTimers(); // Restore fake timers
    });

    it("should handle different card indices", () => {
      const { result } = renderHook(() =>
        useDeleteConfirmation({
          onQuickSave,
          sectionsData,
          sectionKey: "news",
          resetTracking,
        })
      );

      const onDelete1 = vi.fn();
      const onDelete2 = vi.fn();

      // Click card at index 1
      act(() => {
        result.current.handleDeleteClick(1, onDelete1);
      });

      expect(result.current.deleteConfirming).toBe(1);

      // Click different card at index 2 (should change confirmation)
      act(() => {
        result.current.handleDeleteClick(2, onDelete2);
      });

      expect(result.current.deleteConfirming).toBe(2);
      expect(onDelete1).not.toHaveBeenCalled();
      expect(onDelete2).not.toHaveBeenCalled();
    });
  });

  describe("timeout auto-reset", () => {
    it("should reset deleteConfirming after 5 seconds", () => {
      const { result } = renderHook(() =>
        useDeleteConfirmation({
          onQuickSave,
          sectionsData,
          sectionKey: "news",
          resetTracking,
        })
      );

      const onDelete = vi.fn();

      act(() => {
        result.current.handleDeleteClick(0, onDelete);
      });

      expect(result.current.deleteConfirming).toBe(0);

      // Fast-forward 5 seconds
      act(() => {
        vi.advanceTimersByTime(5000);
      });

      expect(result.current.deleteConfirming).toBeNull();
    });

    it("should not reset before 5 seconds elapse", () => {
      const { result } = renderHook(() =>
        useDeleteConfirmation({
          onQuickSave,
          sectionsData,
          sectionKey: "news",
          resetTracking,
        })
      );

      const onDelete = vi.fn();

      act(() => {
        result.current.handleDeleteClick(0, onDelete);
      });

      // Fast-forward 4.9 seconds
      act(() => {
        vi.advanceTimersByTime(4900);
      });

      expect(result.current.deleteConfirming).toBe(0);
    });

    it("should clear timeout on unmount", () => {
      const { result, unmount } = renderHook(() =>
        useDeleteConfirmation({
          onQuickSave,
          sectionsData,
          sectionKey: "news",
          resetTracking,
        })
      );

      const onDelete = vi.fn();

      act(() => {
        result.current.handleDeleteClick(0, onDelete);
      });

      unmount();

      // Timer should be cleared, so advancing time shouldn't cause issues
      expect(() => {
        vi.advanceTimersByTime(5000);
      }).not.toThrow();
    });
  });

  describe("click outside listener", () => {
    it("should reset deleteConfirming when clicking outside", () => {
      const { result } = renderHook(() =>
        useDeleteConfirmation({
          onQuickSave,
          sectionsData,
          sectionKey: "news",
          resetTracking,
        })
      );

      const onDelete = vi.fn();

      act(() => {
        result.current.handleDeleteClick(0, onDelete);
      });

      expect(result.current.deleteConfirming).toBe(0);

      // Simulate click outside
      act(() => {
        document.dispatchEvent(new MouseEvent("click"));
      });

      expect(result.current.deleteConfirming).toBeNull();
    });

    it("should remove event listener on unmount", () => {
      const { result, unmount } = renderHook(() =>
        useDeleteConfirmation({
          onQuickSave,
          sectionsData,
          sectionKey: "news",
          resetTracking,
        })
      );

      const onDelete = vi.fn();

      act(() => {
        result.current.handleDeleteClick(0, onDelete);
      });

      const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith("click", expect.any(Function));

      removeEventListenerSpy.mockRestore();
    });

    it("should not add event listener when deleteConfirming is null", () => {
      const addEventListenerSpy = vi.spyOn(document, "addEventListener");

      renderHook(() =>
        useDeleteConfirmation({
          onQuickSave,
          sectionsData,
          sectionKey: "news",
          resetTracking,
        })
      );

      expect(addEventListenerSpy).not.toHaveBeenCalled();

      addEventListenerSpy.mockRestore();
    });
  });

  describe("pending delete save", () => {
    it("should not save when sectionsData is null", async () => {
      const { result } = renderHook(() =>
        useDeleteConfirmation({
          onQuickSave,
          sectionsData: null,
          sectionKey: "news",
          resetTracking,
        })
      );

      const onDelete = vi.fn();

      act(() => {
        result.current.handleDeleteClick(0, onDelete);
      });

      act(() => {
        result.current.handleDeleteClick(0, onDelete);
      });

      await act(async () => {
        await vi.runAllTimersAsync();
      });

      // Should not call save when sectionsData is null
      expect(onQuickSave).not.toHaveBeenCalled();
    });

  });

  describe("setDeleteConfirming", () => {
    it("should allow manually setting deleteConfirming", () => {
      const { result } = renderHook(() =>
        useDeleteConfirmation({
          onQuickSave,
          sectionsData,
          sectionKey: "news",
          resetTracking,
        })
      );

      act(() => {
        result.current.setDeleteConfirming(3);
      });

      expect(result.current.deleteConfirming).toBe(3);
    });

    it("should allow manually clearing deleteConfirming", () => {
      const { result } = renderHook(() =>
        useDeleteConfirmation({
          onQuickSave,
          sectionsData,
          sectionKey: "news",
          resetTracking,
        })
      );

      const onDelete = vi.fn();

      act(() => {
        result.current.handleDeleteClick(0, onDelete);
      });

      expect(result.current.deleteConfirming).toBe(0);

      act(() => {
        result.current.setDeleteConfirming(null);
      });

      expect(result.current.deleteConfirming).toBeNull();
    });
  });
});
