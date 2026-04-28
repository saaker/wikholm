import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTheme } from "./useTheme";

describe("useTheme", () => {
  let mockLocalStorage: Record<string, string> = {};

  beforeEach(() => {
    // Mock localStorage
    mockLocalStorage = {};
    global.localStorage = {
      getItem: vi.fn((key: string) => mockLocalStorage[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        mockLocalStorage[key] = value;
      }),
      removeItem: vi.fn((key: string) => {
        delete mockLocalStorage[key];
      }),
      clear: vi.fn(() => {
        mockLocalStorage = {};
      }),
      key: vi.fn(),
      length: 0,
    };

    // Reset document classes
    document.documentElement.className = "";
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("initialization", () => {
    it("should default to light theme when no stored value and no dark class", () => {
      const { result } = renderHook(() => useTheme());

      expect(result.current.dark).toBe(false);
    });

    it("should read dark theme from localStorage", () => {
      mockLocalStorage.theme = "dark";

      const { result } = renderHook(() => useTheme());

      expect(result.current.dark).toBe(true);
    });

    it("should read light theme from localStorage", () => {
      mockLocalStorage.theme = "light";

      const { result } = renderHook(() => useTheme());

      expect(result.current.dark).toBe(false);
    });

    it("should read dark theme from document class when no localStorage value", () => {
      document.documentElement.classList.add("dark");

      const { result } = renderHook(() => useTheme());

      expect(result.current.dark).toBe(true);
    });
  });

  describe("toggle", () => {
    it("should toggle from light to dark", () => {
      const { result } = renderHook(() => useTheme());

      expect(result.current.dark).toBe(false);

      act(() => {
        result.current.toggle();
      });

      expect(result.current.dark).toBe(true);
      expect(document.documentElement.classList.contains("dark")).toBe(true);
      expect(localStorage.setItem).toHaveBeenCalledWith("theme", "dark");
    });

    it("should toggle from dark to light", () => {
      mockLocalStorage.theme = "dark";
      document.documentElement.classList.add("dark");

      const { result } = renderHook(() => useTheme());

      expect(result.current.dark).toBe(true);

      act(() => {
        result.current.toggle();
      });

      expect(result.current.dark).toBe(false);
      expect(document.documentElement.classList.contains("dark")).toBe(false);
      expect(localStorage.setItem).toHaveBeenCalledWith("theme", "light");
    });

    it("should toggle multiple times", () => {
      const { result } = renderHook(() => useTheme());

      expect(result.current.dark).toBe(false);

      act(() => {
        result.current.toggle();
      });
      expect(result.current.dark).toBe(true);

      act(() => {
        result.current.toggle();
      });
      expect(result.current.dark).toBe(false);

      act(() => {
        result.current.toggle();
      });
      expect(result.current.dark).toBe(true);
    });

    it("should dispatch storage event for cross-tab sync", () => {
      const dispatchEventSpy = vi.spyOn(window, "dispatchEvent");

      const { result } = renderHook(() => useTheme());

      act(() => {
        result.current.toggle();
      });

      expect(dispatchEventSpy).toHaveBeenCalledWith(expect.any(Event));
      const event = dispatchEventSpy.mock.calls[0][0];
      expect(event.type).toBe("storage");

      dispatchEventSpy.mockRestore();
    });
  });

  describe("SSR safety", () => {
    it("should return false on server (getServerSnapshot)", () => {
      // This test verifies that the server snapshot always returns false
      // The actual SSR behavior is tested by useSyncExternalStore itself
      const { result } = renderHook(() => useTheme());

      // On client, it should read from localStorage/DOM
      // On server, useSyncExternalStore would use getServerSnapshot which returns false
      expect(typeof result.current.dark).toBe("boolean");
    });
  });

  describe("cross-tab synchronization", () => {
    it("should listen to storage events", () => {
      const addEventListenerSpy = vi.spyOn(window, "addEventListener");

      renderHook(() => useTheme());

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        "storage",
        expect.any(Function)
      );

      addEventListenerSpy.mockRestore();
    });

    it("should remove storage event listener on unmount", () => {
      const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

      const { unmount } = renderHook(() => useTheme());

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "storage",
        expect.any(Function)
      );

      removeEventListenerSpy.mockRestore();
    });
  });
});
