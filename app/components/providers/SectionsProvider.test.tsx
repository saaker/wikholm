import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { SectionsProvider, useSections } from "./SectionsProvider";
import { DEFAULT_SECTIONS } from "@/lib/sectionsDefaults";

// Test component that uses the hook
function TestComponent() {
  const { sections } = useSections();
  return (
    <div>
      <div data-testid="news-count">{sections.news.length}</div>
      <div data-testid="services-count">{sections.services.length}</div>
    </div>
  );
}

describe("SectionsProvider", () => {
  let mockFetch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockFetch = vi.fn();
    global.fetch = mockFetch as unknown as typeof fetch;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("initialization", () => {
    it("should provide default sections initially", () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => DEFAULT_SECTIONS,
      });

      render(
        <SectionsProvider>
          <TestComponent />
        </SectionsProvider>
      );

      expect(screen.getByTestId("news-count")).toHaveTextContent(
        String(DEFAULT_SECTIONS.news.length)
      );
      expect(screen.getByTestId("services-count")).toHaveTextContent(
        String(DEFAULT_SECTIONS.services.length)
      );
    });
  });

  describe("data fetching", () => {
    it("should fetch sections from API on mount", async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => DEFAULT_SECTIONS,
      });

      render(
        <SectionsProvider>
          <TestComponent />
        </SectionsProvider>
      );

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringContaining("/api/sections")
        );
      });
    });

    it("should update sections when API returns data", async () => {
      const customSections = {
        ...DEFAULT_SECTIONS,
        news: [
          ...DEFAULT_SECTIONS.news,
          {
            id: "custom",
            hidden: false,
            sv: { title: "Custom News", desc: "" },
            en: { title: "Custom News", desc: "" },
          },
        ],
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => customSections,
      });

      render(
        <SectionsProvider>
          <TestComponent />
        </SectionsProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId("news-count")).toHaveTextContent(
          String(customSections.news.length)
        );
      });
    });

    it("should handle fetch errors gracefully", async () => {
      mockFetch.mockRejectedValue(new Error("Network error"));

      expect(() => {
        render(
          <SectionsProvider>
            <TestComponent />
          </SectionsProvider>
        );
      }).not.toThrow();

      // Should still provide default sections
      expect(screen.getByTestId("news-count")).toHaveTextContent(
        String(DEFAULT_SECTIONS.news.length)
      );
    });

    it("should handle non-ok responses gracefully", async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => null,
      });

      render(
        <SectionsProvider>
          <TestComponent />
        </SectionsProvider>
      );

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalled();
      });

      // Should keep default sections
      expect(screen.getByTestId("news-count")).toHaveTextContent(
        String(DEFAULT_SECTIONS.news.length)
      );
    });
  });

  describe("useSections hook", () => {
    it("should provide sections context", () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => DEFAULT_SECTIONS,
      });

      render(
        <SectionsProvider>
          <TestComponent />
        </SectionsProvider>
      );

      expect(screen.getByTestId("news-count")).toBeDefined();
      expect(screen.getByTestId("services-count")).toBeDefined();
    });

    it("should provide default sections when used outside provider", () => {
      // useSections doesn't throw, it returns default context value
      render(<TestComponent />);

      expect(screen.getByTestId("news-count")).toHaveTextContent(
        String(DEFAULT_SECTIONS.news.length)
      );
    });
  });
});
