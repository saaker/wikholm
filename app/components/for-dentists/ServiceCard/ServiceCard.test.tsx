import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { ServiceCard } from "./ServiceCard";
import type { ServiceItem } from "@/lib/sectionsDefaults";

// Mock Icon component
vi.mock("@/lib/icons", () => ({
  Icon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid={`icon-${name}`} className={className}>
      Icon
    </span>
  ),
}));

describe("ServiceCard", () => {
  const mockHighlightService: ServiceItem = {
    id: "case",
    icon: "calendar",
    highlight: true,
    sv: {
      title: "Kostnadsfri fallbedömning",
      desc: "Skicka oss ditt fall så bedömer vi om du är lämplig för behandling.",
      tag: "Gratis",
      price: "0 kr",
      clickPrompt: "Se hur du skickar ditt fall",
    },
    en: {
      title: "Free case assessment",
      desc: "Send us your case and we'll assess if you're suitable for treatment.",
      tag: "Free",
      price: "0 kr",
      clickPrompt: "See how to submit your case",
    },
  };

  const mockRegularService: ServiceItem = {
    id: "invisalign",
    icon: "tooth",
    highlight: false,
    sv: {
      title: "Invisalign",
      desc: "Osynliga skenor för raka tänder.",
      tag: "Populär",
      price: "från 25 000 kr",
    },
    en: {
      title: "Invisalign",
      desc: "Invisible aligners for straight teeth.",
      tag: "Popular",
      price: "from 25 000 kr",
    },
  };

  const mockEmptyService: ServiceItem = {
    id: "empty",
    icon: "tooth",
    highlight: false,
    sv: { title: "", desc: "" },
    en: { title: "", desc: "" },
  };

  describe("highlight card rendering", () => {
    it("should render highlight card with full width styling", () => {
      const { container } = render(<ServiceCard item={mockHighlightService} locale="sv" />);

      const card = container.firstChild as HTMLElement;
      expect(card?.className).toContain("border-primary/40");
      expect(card?.className).toContain("ring-2");
      expect(card?.className).toContain("shadow-lg");
    });

    it("should render large icon for highlight card", () => {
      render(<ServiceCard item={mockHighlightService} locale="sv" />);

      const icon = screen.getByTestId("icon-calendar");
      expect(icon.className).toContain("w-9");
      expect(icon.className).toContain("h-9");
    });

    it("should render title, desc, tag, and price for highlight card", () => {
      render(<ServiceCard item={mockHighlightService} locale="sv" />);

      expect(screen.getByText("Kostnadsfri fallbedömning")).toBeInTheDocument();
      expect(
        screen.getByText("Skicka oss ditt fall så bedömer vi om du är lämplig för behandling.")
      ).toBeInTheDocument();
      expect(screen.getByText("Gratis")).toBeInTheDocument();
      expect(screen.getByText("0 kr")).toBeInTheDocument();
    });

    it("should render as button when onClick is provided", () => {
      const handleClick = vi.fn();
      render(<ServiceCard item={mockHighlightService} locale="sv" onClick={handleClick} />);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button.className).toContain("cursor-pointer");
    });

    it("should render as div when onClick is not provided", () => {
      const { container } = render(<ServiceCard item={mockHighlightService} locale="sv" />);

      const button = screen.queryByRole("button");
      expect(button).not.toBeInTheDocument();

      const card = container.querySelector("div.border-primary\\/40");
      expect(card?.tagName).toBe("DIV");
    });

    it("should call onClick when clickable highlight card is clicked", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<ServiceCard item={mockHighlightService} locale="sv" onClick={handleClick} />);

      const button = screen.getByRole("button");
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should show click prompt when showClickPrompt is true", () => {
      render(
        <ServiceCard
          item={mockHighlightService}
          locale="sv"
          onClick={vi.fn()}
          showClickPrompt={true}
        />
      );

      expect(screen.getByText("Se hur du skickar ditt fall")).toBeInTheDocument();
    });

    it("should show English click prompt for English locale", () => {
      render(
        <ServiceCard
          item={mockHighlightService}
          locale="en"
          onClick={vi.fn()}
          showClickPrompt={true}
        />
      );

      expect(screen.getByText("See how to submit your case")).toBeInTheDocument();
    });

    it("should not show click prompt when showClickPrompt is false", () => {
      render(
        <ServiceCard
          item={mockHighlightService}
          locale="sv"
          onClick={vi.fn()}
          showClickPrompt={false}
        />
      );

      expect(screen.queryByText("Se hur du skickar ditt fall")).not.toBeInTheDocument();
    });
  });

  describe("regular card rendering", () => {
    it("should render regular card with standard styling", () => {
      const { container } = render(<ServiceCard item={mockRegularService} locale="sv" />);

      const card = container.firstChild as HTMLElement;
      expect(card?.className).toContain("border-border/50");
      expect(card?.className).toContain("shadow-sm");
    });

    it("should render smaller icon for regular card", () => {
      render(<ServiceCard item={mockRegularService} locale="sv" />);

      const icon = screen.getByTestId("icon-tooth");
      expect(icon.className).toContain("w-7");
      expect(icon.className).toContain("h-7");
    });

    it("should render title, desc, tag, and price for regular card", () => {
      render(<ServiceCard item={mockRegularService} locale="sv" />);

      expect(screen.getByText("Invisalign")).toBeInTheDocument();
      expect(screen.getByText("Osynliga skenor för raka tänder.")).toBeInTheDocument();
      expect(screen.getByText("Populär")).toBeInTheDocument();
      expect(screen.getByText("från 25 000 kr")).toBeInTheDocument();
    });
  });

  describe("empty content handling", () => {
    it("should return null when content is empty and not in preview mode", () => {
      const { container } = render(<ServiceCard item={mockEmptyService} locale="sv" />);

      expect(container.firstChild).toBeNull();
    });

    it("should render when content is empty but in preview mode", () => {
      render(<ServiceCard item={mockEmptyService} locale="sv" preview />);

      // Should render the card structure even with empty content
      const icon = screen.getByTestId("icon-tooth");
      expect(icon).toBeInTheDocument();
    });

    it("should render when only title is provided", () => {
      const serviceWithTitle: ServiceItem = {
        ...mockEmptyService,
        sv: { title: "Title only", desc: "" },
      };

      render(<ServiceCard item={serviceWithTitle} locale="sv" />);

      expect(screen.getByText("Title only")).toBeInTheDocument();
    });

    it("should render when only description is provided", () => {
      const serviceWithDesc: ServiceItem = {
        ...mockEmptyService,
        sv: { title: "", desc: "Description only" },
      };

      render(<ServiceCard item={serviceWithDesc} locale="sv" />);

      expect(screen.getByText("Description only")).toBeInTheDocument();
    });
  });

  describe("locale handling", () => {
    it("should render Swedish content when locale is sv", () => {
      render(<ServiceCard item={mockHighlightService} locale="sv" />);

      expect(screen.getByText("Kostnadsfri fallbedömning")).toBeInTheDocument();
      expect(screen.getByText("Gratis")).toBeInTheDocument();
    });

    it("should render English content when locale is en", () => {
      render(<ServiceCard item={mockHighlightService} locale="en" />);

      expect(screen.getByText("Free case assessment")).toBeInTheDocument();
      expect(screen.getByText("Free")).toBeInTheDocument();
    });
  });

  describe("optional fields", () => {
    it("should not render tag when not provided", () => {
      const serviceWithoutTag: ServiceItem = {
        ...mockRegularService,
        sv: { title: "Test", desc: "Test desc" },
      };

      render(<ServiceCard item={serviceWithoutTag} locale="sv" />);

      expect(screen.queryByText("Populär")).not.toBeInTheDocument();
    });

    it("should not render price when not provided", () => {
      const serviceWithoutPrice: ServiceItem = {
        ...mockRegularService,
        sv: { title: "Test", desc: "Test desc" },
      };

      render(<ServiceCard item={serviceWithoutPrice} locale="sv" />);

      expect(screen.queryByText("från 25 000 kr")).not.toBeInTheDocument();
    });

    it("should render both tag and price when provided", () => {
      render(<ServiceCard item={mockRegularService} locale="sv" />);

      expect(screen.getByText("Populär")).toBeInTheDocument();
      expect(screen.getByText("från 25 000 kr")).toBeInTheDocument();
    });
  });

  describe("custom className", () => {
    it("should apply custom className to highlight card", () => {
      const { container } = render(
        <ServiceCard item={mockHighlightService} locale="sv" className="custom-class" />
      );

      const card = container.querySelector(".custom-class");
      expect(card).toBeInTheDocument();
    });

    it("should apply custom className to regular card", () => {
      const { container } = render(
        <ServiceCard item={mockRegularService} locale="sv" className="custom-class" />
      );

      const card = container.querySelector(".custom-class");
      expect(card).toBeInTheDocument();
    });
  });

  describe("ref forwarding", () => {
    it("should forward ref to highlight button element when clickable", () => {
      const ref = vi.fn();
      render(<ServiceCard item={mockHighlightService} locale="sv" onClick={vi.fn()} ref={ref} />);

      expect(ref).toHaveBeenCalled();
      const element = ref.mock.calls[0][0];
      expect(element?.tagName).toBe("BUTTON");
    });

    it("should forward ref to highlight div element when not clickable", () => {
      const ref = vi.fn();
      render(<ServiceCard item={mockHighlightService} locale="sv" ref={ref} />);

      expect(ref).toHaveBeenCalled();
      const element = ref.mock.calls[0][0];
      expect(element?.tagName).toBe("DIV");
    });

    it("should forward ref to regular card div element", () => {
      const ref = vi.fn();
      render(<ServiceCard item={mockRegularService} locale="sv" ref={ref} />);

      expect(ref).toHaveBeenCalled();
      const element = ref.mock.calls[0][0];
      expect(element?.tagName).toBe("DIV");
    });
  });

  describe("styling", () => {
    it("should have focus-visible styles on clickable highlight card", () => {
      render(<ServiceCard item={mockHighlightService} locale="sv" onClick={vi.fn()} />);

      const button = screen.getByRole("button");
      expect(button.className).toContain("focus-visible:outline-none");
      expect(button.className).toContain("focus-visible:ring-2");
      expect(button.className).toContain("focus-visible:ring-primary");
    });

    it("should not have focus-visible styles on non-clickable highlight card", () => {
      const { container } = render(<ServiceCard item={mockHighlightService} locale="sv" />);

      const card = container.querySelector("div.border-primary\\/40");
      expect(card?.className).not.toContain("focus-visible:outline-none");
    });

    it("should have group-hover scale animation on highlight card icon container", () => {
      const { container } = render(<ServiceCard item={mockHighlightService} locale="sv" />);

      const iconContainer = container.querySelector(".case-icon");
      expect(iconContainer?.className).toContain("group-hover:scale-110");
    });

    it("should have service-badge-text class on tag elements", () => {
      const { container } = render(<ServiceCard item={mockRegularService} locale="sv" />);

      const tags = container.querySelectorAll(".service-badge-text");
      expect(tags.length).toBeGreaterThan(0);
    });
  });

  describe("icon rendering", () => {
    it("should render correct icon for highlight card", () => {
      render(<ServiceCard item={mockHighlightService} locale="sv" />);

      expect(screen.getByTestId("icon-calendar")).toBeInTheDocument();
    });

    it("should render correct icon for regular card", () => {
      render(<ServiceCard item={mockRegularService} locale="sv" />);

      expect(screen.getByTestId("icon-tooth")).toBeInTheDocument();
    });
  });
});
