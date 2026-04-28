import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { useAnimateIn } from "./useAnimateIn";

// Test component that uses the hook
function TestComponent({ threshold }: { threshold?: number }) {
  const { ref, visible } = useAnimateIn(threshold);
  return (
    <div ref={ref} data-testid="animated-element">
      {visible ? "visible" : "hidden"}
    </div>
  );
}

describe("useAnimateIn", () => {
  let mockObserver: {
    observe: ReturnType<typeof vi.fn>;
    unobserve: ReturnType<typeof vi.fn>;
    disconnect: ReturnType<typeof vi.fn>;
  };
  let observerCallback: IntersectionObserverCallback;
  let IntersectionObserverSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.useFakeTimers();

    mockObserver = {
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    };

    // Mock IntersectionObserver
    class MockIntersectionObserver {
      constructor(callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) {
        observerCallback = callback;
        Object.assign(this, mockObserver);
      }
    }

    IntersectionObserverSpy = vi.fn(MockIntersectionObserver);
    global.IntersectionObserver = IntersectionObserverSpy as unknown as typeof IntersectionObserver;
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  describe("initialization", () => {
    it("should initialize with visible as false", () => {
      render(<TestComponent />);

      expect(screen.getByTestId("animated-element")).toHaveTextContent("hidden");
    });

    it("should create a ref object and attach it to the element", () => {
      render(<TestComponent />);

      const element = screen.getByTestId("animated-element");
      expect(element).toBeInTheDocument();
    });

    it("should use default threshold of 0.15", () => {
      render(<TestComponent />);

      expect(IntersectionObserverSpy).toHaveBeenCalledWith(
        expect.any(Function),
        { threshold: 0.15 }
      );
    });

    it("should use custom threshold when provided", () => {
      render(<TestComponent threshold={0.5} />);

      expect(IntersectionObserverSpy).toHaveBeenCalledWith(
        expect.any(Function),
        { threshold: 0.5 }
      );
    });
  });

  describe("observer setup", () => {
    it("should observe element when component mounts", () => {
      render(<TestComponent />);

      const element = screen.getByTestId("animated-element");
      expect(mockObserver.observe).toHaveBeenCalledWith(element);
    });

    it("should create IntersectionObserver with correct options", () => {
      const threshold = 0.3;
      render(<TestComponent threshold={threshold} />);

      expect(IntersectionObserverSpy).toHaveBeenCalledWith(
        expect.any(Function),
        { threshold }
      );
    });
  });

  describe("intersection handling", () => {
    it("should set visible to true after 50ms delay when element intersects", () => {
      render(<TestComponent />);

      const element = screen.getByTestId("animated-element");

      // Should be hidden initially
      expect(element).toHaveTextContent("hidden");

      // Simulate intersection
      const mockEntry = {
        isIntersecting: true,
        target: element,
      } as unknown as IntersectionObserverEntry;

      observerCallback([mockEntry], mockObserver as unknown as IntersectionObserver);

      // Should still be hidden before timeout
      expect(element).toHaveTextContent("hidden");

      // Fast-forward time by 50ms
      act(() => {
        vi.advanceTimersByTime(50);
      });

      // Should be visible after timeout
      expect(element).toHaveTextContent("visible");
    });

    it("should not set visible when element does not intersect", () => {
      render(<TestComponent />);

      const element = screen.getByTestId("animated-element");

      // Simulate non-intersection
      const mockEntry = {
        isIntersecting: false,
        target: element,
      } as unknown as IntersectionObserverEntry;

      observerCallback([mockEntry], mockObserver as unknown as IntersectionObserver);

      vi.advanceTimersByTime(100);

      expect(element).toHaveTextContent("hidden");
    });

    it("should unobserve element after intersection", () => {
      render(<TestComponent />);

      const element = screen.getByTestId("animated-element");

      const mockEntry = {
        isIntersecting: true,
        target: element,
      } as unknown as IntersectionObserverEntry;

      observerCallback([mockEntry], mockObserver as unknown as IntersectionObserver);

      expect(mockObserver.unobserve).toHaveBeenCalledWith(element);
    });

    it("should unobserve before setting visible (one-time animation)", () => {
      render(<TestComponent />);

      const element = screen.getByTestId("animated-element");

      const mockEntry = {
        isIntersecting: true,
        target: element,
      } as unknown as IntersectionObserverEntry;

      observerCallback([mockEntry], mockObserver as unknown as IntersectionObserver);

      // Unobserve should be called immediately
      expect(mockObserver.unobserve).toHaveBeenCalledWith(element);

      // But element should still show "hidden"
      expect(element).toHaveTextContent("hidden");

      // Until the timeout completes
      act(() => {
        vi.advanceTimersByTime(50);
      });
      expect(element).toHaveTextContent("visible");
    });
  });

  describe("cleanup", () => {
    it("should disconnect observer on unmount", () => {
      const { unmount } = render(<TestComponent />);

      unmount();

      expect(mockObserver.disconnect).toHaveBeenCalled();
    });

    it("should disconnect observer even if element never intersects", () => {
      const { unmount } = render(<TestComponent />);

      unmount();

      expect(mockObserver.disconnect).toHaveBeenCalled();
    });
  });

  describe("threshold changes", () => {
    it("should recreate observer when threshold changes", () => {
      const { rerender } = render(<TestComponent threshold={0.15} />);

      expect(global.IntersectionObserver).toHaveBeenCalledTimes(1);
      expect(IntersectionObserverSpy).toHaveBeenCalledWith(
        expect.any(Function),
        { threshold: 0.15 }
      );

      // Change threshold
      rerender(<TestComponent threshold={0.5} />);

      expect(global.IntersectionObserver).toHaveBeenCalledTimes(2);
      expect(global.IntersectionObserver).toHaveBeenLastCalledWith(
        expect.any(Function),
        { threshold: 0.5 }
      );
    });

    it("should disconnect old observer when threshold changes", () => {
      const { rerender } = render(<TestComponent threshold={0.15} />);

      const firstDisconnect = mockObserver.disconnect;

      // Change threshold
      rerender(<TestComponent threshold={0.5} />);

      expect(firstDisconnect).toHaveBeenCalled();
    });
  });

  describe("generic type support", () => {
    it("should work with HTMLDivElement by default", () => {
      render(<TestComponent />);

      const element = screen.getByTestId("animated-element");
      expect(element.tagName).toBe("DIV");
    });

    it("should work with custom element types", () => {
      function ButtonTestComponent() {
        const { ref, visible } = useAnimateIn<HTMLButtonElement>();
        return (
          <button ref={ref} data-testid="animated-button">
            {visible ? "visible" : "hidden"}
          </button>
        );
      }

      render(<ButtonTestComponent />);

      const element = screen.getByTestId("animated-button");
      expect(element.tagName).toBe("BUTTON");
    });

    it("should work with HTMLSectionElement", () => {
      function SectionTestComponent() {
        const { ref, visible } = useAnimateIn<HTMLElement>();
        return (
          <section ref={ref} data-testid="animated-section">
            {visible ? "visible" : "hidden"}
          </section>
        );
      }

      render(<SectionTestComponent />);

      const element = screen.getByTestId("animated-section");
      expect(element.tagName).toBe("SECTION");
    });
  });

  describe("timing", () => {
    it("should use exactly 50ms delay", () => {
      render(<TestComponent />);

      const element = screen.getByTestId("animated-element");

      const mockEntry = {
        isIntersecting: true,
        target: element,
      } as unknown as IntersectionObserverEntry;

      observerCallback([mockEntry], mockObserver as unknown as IntersectionObserver);

      // After 49ms, should still be hidden
      act(() => {
        vi.advanceTimersByTime(49);
      });
      expect(element).toHaveTextContent("hidden");

      // After 50ms, should be visible
      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(element).toHaveTextContent("visible");
    });

    it("should not be affected by additional time passing", () => {
      render(<TestComponent />);

      const element = screen.getByTestId("animated-element");

      const mockEntry = {
        isIntersecting: true,
        target: element,
      } as unknown as IntersectionObserverEntry;

      observerCallback([mockEntry], mockObserver as unknown as IntersectionObserver);

      act(() => {
        vi.advanceTimersByTime(50);
      });
      expect(element).toHaveTextContent("visible");

      // Additional time should not change state
      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(element).toHaveTextContent("visible");
    });
  });
});
