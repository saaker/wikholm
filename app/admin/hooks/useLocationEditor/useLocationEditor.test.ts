import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLocationEditor } from "./useLocationEditor";
import type { Location } from "../../shared/adminTypes";

describe("useLocationEditor", () => {
  let mockFetch: ReturnType<typeof vi.fn>;
  let showMessage: (type: "success" | "error", text: string) => void;
  let setReadOnly: (v: boolean) => void;
  let authHeaders: Record<string, string>;
  let initialLocations: Location[];

  beforeEach(() => {
    mockFetch = vi.fn();
    global.fetch = mockFetch as unknown as typeof fetch;

    showMessage = vi.fn();
    setReadOnly = vi.fn();
    authHeaders = { Authorization: "Bearer test-secret" };
    initialLocations = [
      {
        id: "1",
        name: "Test Clinic",
        address: "Test Street 1",
        phone: "0701234567",
        hours: "Mon-Fri 9-17",
        lat: 59.3293,
        lng: 18.0686,
        website: "",
        type: "onsite" as const,
        alignerBrands: [],
      },
    ];

    // Mock window.confirm
    global.confirm = vi.fn(() => true);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("initialization", () => {
    it("should initialize with provided locations", () => {
      const { result } = renderHook(() =>
        useLocationEditor(initialLocations, authHeaders, showMessage, setReadOnly)
      );

      expect(result.current.locations).toEqual(initialLocations);
      expect(result.current.editing).toBeNull();
      expect(result.current.loading).toBe(false);
      expect(result.current.geocoding).toBe(false);
    });
  });

  describe("fetchLocations", () => {
    it("should fetch locations from API", async () => {
      const newLocations = [
        ...initialLocations,
        {
          id: "2",
          name: "New Clinic",
          address: "New Street 2",
          phone: "0709876543",
          hours: "Mon-Fri 8-16",
          lat: 59.3293,
          lng: 18.0686,
          website: "",
          type: "onsite" as const,
          alignerBrands: [],
        },
      ];

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => newLocations,
      });

      const { result } = renderHook(() =>
        useLocationEditor(initialLocations, authHeaders, showMessage, setReadOnly)
      );

      await act(async () => {
        await result.current.fetchLocations();
      });

      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("/api/locations"));
      expect(result.current.locations).toEqual(newLocations);
    });

    it("should set readOnly on fetch failure", async () => {
      mockFetch.mockRejectedValue(new Error("Network error"));

      const { result } = renderHook(() =>
        useLocationEditor(initialLocations, authHeaders, showMessage, setReadOnly)
      );

      await act(async () => {
        await result.current.fetchLocations();
      });

      expect(setReadOnly).toHaveBeenCalledWith(true);
      expect(result.current.locations).toEqual(initialLocations);
    });

    it("should fallback to initial locations on non-ok response", async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
      });

      const { result } = renderHook(() =>
        useLocationEditor(initialLocations, authHeaders, showMessage, setReadOnly)
      );

      await act(async () => {
        await result.current.fetchLocations();
      });

      expect(setReadOnly).toHaveBeenCalledWith(true);
      expect(result.current.locations).toEqual(initialLocations);
    });
  });

  describe("geocodeAddress", () => {
    it("should geocode address and update form", async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => [
          {
            lat: "59.3293",
            lon: "18.0686",
          },
        ],
      });

      const { result } = renderHook(() =>
        useLocationEditor(initialLocations, authHeaders, showMessage, setReadOnly)
      );

      act(() => {
        result.current.setLocForm({
          ...result.current.locForm,
          address: "Stockholm, Sweden",
        });
      });

      await act(async () => {
        await result.current.geocodeAddress();
      });

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("nominatim.openstreetmap.org"),
        expect.objectContaining({
          headers: { "User-Agent": "WikholmOrtodontiAdmin/1.0" },
        })
      );
      expect(result.current.locForm.lat).toBe(59.3293);
      expect(result.current.locForm.lng).toBe(18.0686);
      expect(showMessage).toHaveBeenCalledWith("success", "Koordinater hittade!");
    });

    it("should show error if address is empty", async () => {
      const { result } = renderHook(() =>
        useLocationEditor(initialLocations, authHeaders, showMessage, setReadOnly)
      );

      await act(async () => {
        await result.current.geocodeAddress();
      });

      expect(showMessage).toHaveBeenCalledWith("error", "Fyll i en adress först");
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it("should show error if no coordinates found", async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => [],
      });

      const { result } = renderHook(() =>
        useLocationEditor(initialLocations, authHeaders, showMessage, setReadOnly)
      );

      act(() => {
        result.current.setLocForm({
          ...result.current.locForm,
          address: "Invalid Address",
        });
      });

      await act(async () => {
        await result.current.geocodeAddress();
      });

      expect(showMessage).toHaveBeenCalledWith("error", "Kunde inte hitta koordinater");
    });

    it("should handle geocoding errors", async () => {
      mockFetch.mockRejectedValue(new Error("Network error"));

      const { result } = renderHook(() =>
        useLocationEditor(initialLocations, authHeaders, showMessage, setReadOnly)
      );

      act(() => {
        result.current.setLocForm({
          ...result.current.locForm,
          address: "Stockholm",
        });
      });

      await act(async () => {
        await result.current.geocodeAddress();
      });

      expect(showMessage).toHaveBeenCalledWith("error", "Fel vid uppslag");
    });

  });

  describe("handleLocSave", () => {
    it("should save location and show success message", async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({}),
      });

      const { result } = renderHook(() =>
        useLocationEditor(initialLocations, authHeaders, showMessage, setReadOnly)
      );

      const mockEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent;

      await act(async () => {
        await result.current.handleLocSave(mockEvent);
      });

      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(showMessage).toHaveBeenCalledWith("success", expect.any(String));
    });
  });

  describe("handleLocDelete", () => {
    it("should delete location on confirmation", async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({}),
      });

      const { result } = renderHook(() =>
        useLocationEditor(initialLocations, authHeaders, showMessage, setReadOnly)
      );

      await act(async () => {
        await result.current.handleLocDelete("1");
      });

      expect(global.confirm).toHaveBeenCalled();
      expect(showMessage).toHaveBeenCalledWith("success", expect.any(String));
    });
  });

  describe("startEdit and cancelEdit", () => {
    it("should populate form when starting edit", () => {
      const { result } = renderHook(() =>
        useLocationEditor(initialLocations, authHeaders, showMessage, setReadOnly)
      );

      act(() => {
        result.current.startEdit(initialLocations[0]);
      });

      expect(result.current.editing).toEqual(initialLocations[0]);
      expect(result.current.locForm.name).toBe(initialLocations[0].name);
    });

    it("should clear form when canceling edit", () => {
      const { result } = renderHook(() =>
        useLocationEditor(initialLocations, authHeaders, showMessage, setReadOnly)
      );

      act(() => {
        result.current.startEdit(initialLocations[0]);
      });

      act(() => {
        result.current.cancelEdit();
      });

      expect(result.current.editing).toBeNull();
      expect(result.current.locForm.name).toBe("");
    });
  });
});
