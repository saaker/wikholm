import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useAdminAuth } from "./useAdminAuth";

describe("useAdminAuth", () => {
  let mockSessionStorage: Record<string, string>;
  let mockFetch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.useFakeTimers();

    mockSessionStorage = {};
    global.sessionStorage = {
      getItem: vi.fn((key: string) => mockSessionStorage[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        mockSessionStorage[key] = value;
      }),
      removeItem: vi.fn((key: string) => {
        delete mockSessionStorage[key];
      }),
      clear: vi.fn(() => {
        mockSessionStorage = {};
      }),
      key: vi.fn(),
      length: 0,
    };

    mockFetch = vi.fn();
    global.fetch = mockFetch as unknown as typeof fetch;
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  describe("initialization", () => {
    it("should initialize unauthenticated", () => {
      const { result } = renderHook(() => useAdminAuth());

      expect(result.current.authenticated).toBe(false);
      expect(result.current.secret).toBe("");
      expect(result.current.readOnly).toBe(false);
      expect(result.current.message).toBeNull();
    });

    it("should restore session from sessionStorage", async () => {
      vi.useRealTimers(); // Use real timers for microtask
      mockSessionStorage.admin_secret = "test-secret";

      const { result } = renderHook(() => useAdminAuth());

      await waitFor(() => {
        expect(result.current.secret).toBe("test-secret");
        expect(result.current.authenticated).toBe(true);
      });

      vi.useFakeTimers(); // Restore fake timers
    });

    it("should not restore if no session exists", () => {
      const { result } = renderHook(() => useAdminAuth());

      expect(result.current.authenticated).toBe(false);
      expect(result.current.secret).toBe("");
    });
  });

  describe("handleLogin", () => {
    it("should authenticate on successful login", async () => {
      mockFetch.mockResolvedValue({
        status: 200,
        ok: true,
      });

      const { result } = renderHook(() => useAdminAuth());

      act(() => {
        result.current.setSecret("correct-password");
      });

      const mockEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent;

      await act(async () => {
        await result.current.handleLogin(mockEvent);
      });

      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/auth-check"),
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            Authorization: "Bearer correct-password",
          }),
        })
      );
      expect(result.current.authenticated).toBe(true);
      expect(mockSessionStorage.admin_secret).toBe("correct-password");
    });

    it("should show error message on wrong password", async () => {
      mockFetch.mockResolvedValue({
        status: 401,
        ok: false,
      });

      const { result } = renderHook(() => useAdminAuth());

      act(() => {
        result.current.setSecret("wrong-password");
      });

      const mockEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent;

      await act(async () => {
        await result.current.handleLogin(mockEvent);
      });

      expect(result.current.authenticated).toBe(false);
      expect(result.current.message).toEqual({
        type: "error",
        text: "Fel lösenord",
      });
    });

    it("should show error message on network error", async () => {
      mockFetch.mockRejectedValue(new Error("Network error"));

      const { result } = renderHook(() => useAdminAuth());

      act(() => {
        result.current.setSecret("test-password");
      });

      const mockEvent = {
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent;

      await act(async () => {
        await result.current.handleLogin(mockEvent);
      });

      expect(result.current.authenticated).toBe(false);
      expect(result.current.message).toEqual({
        type: "error",
        text: "Kunde inte ansluta till servern",
      });
    });
  });

  describe("logout", () => {
    it("should clear session and reset state", async () => {
      vi.useRealTimers();
      mockSessionStorage.admin_secret = "test-secret";

      const { result } = renderHook(() => useAdminAuth());

      await waitFor(() => {
        expect(result.current.authenticated).toBe(true);
      });

      act(() => {
        result.current.logout();
      });

      expect(result.current.authenticated).toBe(false);
      expect(result.current.secret).toBe("");
      expect(result.current.readOnly).toBe(false);
      expect(mockSessionStorage.admin_secret).toBeUndefined();

      vi.useFakeTimers();
    });
  });

  describe("showMessage", () => {
    it("should set message", () => {
      const { result } = renderHook(() => useAdminAuth());

      act(() => {
        result.current.showMessage("success", "Test message");
      });

      expect(result.current.message).toEqual({
        type: "success",
        text: "Test message",
      });
    });

    it("should auto-dismiss message after 3500ms", () => {
      const { result } = renderHook(() => useAdminAuth());

      act(() => {
        result.current.showMessage("error", "Test error");
      });

      expect(result.current.message).toEqual({
        type: "error",
        text: "Test error",
      });

      act(() => {
        vi.advanceTimersByTime(3500);
      });

      expect(result.current.message).toBeNull();
    });

    it("should not dismiss before 3500ms", () => {
      const { result } = renderHook(() => useAdminAuth());

      act(() => {
        result.current.showMessage("success", "Test");
      });

      act(() => {
        vi.advanceTimersByTime(3400);
      });

      expect(result.current.message).toEqual({
        type: "success",
        text: "Test",
      });
    });
  });

  describe("authHeaders", () => {
    it("should generate correct auth headers", () => {
      const { result } = renderHook(() => useAdminAuth());

      act(() => {
        result.current.setSecret("my-secret");
      });

      expect(result.current.authHeaders).toEqual({
        "Content-Type": "application/json",
        Authorization: "Bearer my-secret",
      });
    });

    it("should update headers when secret changes", () => {
      const { result } = renderHook(() => useAdminAuth());

      act(() => {
        result.current.setSecret("secret-1");
      });

      expect(result.current.authHeaders.Authorization).toBe("Bearer secret-1");

      act(() => {
        result.current.setSecret("secret-2");
      });

      expect(result.current.authHeaders.Authorization).toBe("Bearer secret-2");
    });
  });

  describe("readOnly state", () => {
    it("should allow setting readOnly", () => {
      const { result } = renderHook(() => useAdminAuth());

      expect(result.current.readOnly).toBe(false);

      act(() => {
        result.current.setReadOnly(true);
      });

      expect(result.current.readOnly).toBe(true);
    });

    it("should reset readOnly on logout", async () => {
      vi.useRealTimers();
      mockSessionStorage.admin_secret = "test-secret";

      const { result } = renderHook(() => useAdminAuth());

      await waitFor(() => {
        expect(result.current.authenticated).toBe(true);
      });

      act(() => {
        result.current.setReadOnly(true);
      });

      expect(result.current.readOnly).toBe(true);

      act(() => {
        result.current.logout();
      });

      expect(result.current.readOnly).toBe(false);

      vi.useFakeTimers();
    });
  });
});
