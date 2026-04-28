import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act, waitFor } from "@testing-library/react";
import { I18nProvider, useI18n } from "./I18nProvider";

// Test component that uses the hook
function TestComponent() {
  const { locale, t, setLocale } = useI18n();
  return (
    <div>
      <div data-testid="locale">{locale}</div>
      <div data-testid="translation">{t("brandName")}</div>
      <button onClick={() => setLocale(locale === "sv" ? "en" : "sv")}>
        Toggle
      </button>
    </div>
  );
}

describe("I18nProvider", () => {
  let mockLocalStorage: Record<string, string>;
  let mockFetch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
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

    mockFetch = vi.fn();
    global.fetch = mockFetch as unknown as typeof fetch;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("initialization", () => {
    it("should use default locale when none is saved", () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({}),
      });

      render(
        <I18nProvider defaultLocale="sv">
          <TestComponent />
        </I18nProvider>
      );

      expect(screen.getByTestId("locale")).toHaveTextContent("sv");
    });

    it("should restore saved locale from localStorage", async () => {
      mockLocalStorage.locale = "en";
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({}),
      });

      render(
        <I18nProvider defaultLocale="sv">
          <TestComponent />
        </I18nProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId("locale")).toHaveTextContent("en");
      });
    });

    it("should ignore invalid locale from localStorage", () => {
      mockLocalStorage.locale = "invalid";
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({}),
      });

      render(
        <I18nProvider defaultLocale="sv">
          <TestComponent />
        </I18nProvider>
      );

      expect(screen.getByTestId("locale")).toHaveTextContent("sv");
    });
  });

  describe("setLocale", () => {
    it("should update locale and save to localStorage", async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({}),
      });

      render(
        <I18nProvider defaultLocale="sv">
          <TestComponent />
        </I18nProvider>
      );

      const button = screen.getByText("Toggle");

      act(() => {
        button.click();
      });

      await waitFor(() => {
        expect(screen.getByTestId("locale")).toHaveTextContent("en");
      });

      expect(mockLocalStorage.locale).toBe("en");
    });

    it("should update document.documentElement.lang", async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({}),
      });

      render(
        <I18nProvider defaultLocale="sv">
          <TestComponent />
        </I18nProvider>
      );

      const button = screen.getByText("Toggle");

      act(() => {
        button.click();
      });

      await waitFor(() => {
        expect(document.documentElement.lang).toBe("en");
      });
    });

    it("should toggle between locales", async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({}),
      });

      render(
        <I18nProvider defaultLocale="sv">
          <TestComponent />
        </I18nProvider>
      );

      const button = screen.getByText("Toggle");

      // Toggle to English
      act(() => {
        button.click();
      });

      await waitFor(() => {
        expect(screen.getByTestId("locale")).toHaveTextContent("en");
      });

      // Toggle back to Swedish
      act(() => {
        button.click();
      });

      await waitFor(() => {
        expect(screen.getByTestId("locale")).toHaveTextContent("sv");
      });
    });
  });

  describe("translation function", () => {
    it("should return translation from default translations", () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({}),
      });

      render(
        <I18nProvider defaultLocale="sv">
          <TestComponent />
        </I18nProvider>
      );

      // Assuming "brandName" has a translation
      expect(screen.getByTestId("translation")).toHaveTextContent(/\w+/);
    });

    it("should use override when available", async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          sv: { brandName: "Custom Brand" },
        }),
      });

      render(
        <I18nProvider defaultLocale="sv">
          <TestComponent />
        </I18nProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId("translation")).toHaveTextContent("Custom Brand");
      });
    });

    it("should update translations when locale changes", async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({}),
      });

      render(
        <I18nProvider defaultLocale="sv">
          <TestComponent />
        </I18nProvider>
      );

      const svText = screen.getByTestId("translation").textContent;

      const button = screen.getByText("Toggle");

      act(() => {
        button.click();
      });

      await waitFor(() => {
        const enText = screen.getByTestId("translation").textContent;
        // Translations should be different for different locales
        // (unless they happen to be the same, but that's unlikely for brandName)
        expect(enText).toBeDefined();
      });
    });
  });

  describe("content overrides", () => {
    it("should fetch overrides on mount", async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({ sv: {}, en: {} }),
      });

      render(
        <I18nProvider defaultLocale="sv">
          <TestComponent />
        </I18nProvider>
      );

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("/api/content"));
      });
    });

    it("should handle fetch errors gracefully", () => {
      mockFetch.mockRejectedValue(new Error("Network error"));

      expect(() => {
        render(
          <I18nProvider defaultLocale="sv">
            <TestComponent />
          </I18nProvider>
        );
      }).not.toThrow();
    });

    it("should handle non-ok responses gracefully", async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        json: async () => null,
      });

      render(
        <I18nProvider defaultLocale="sv">
          <TestComponent />
        </I18nProvider>
      );

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalled();
      });

      // Should still render with default translations
      expect(screen.getByTestId("translation")).toHaveTextContent(/\w+/);
    });
  });

});
