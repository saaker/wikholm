import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServicesSectionHeader } from "./ServicesSectionHeader";

describe("ServicesSectionHeader", () => {
  describe("rendering with all content", () => {
    it("should render all elements when all props are provided", () => {
      render(
        <ServicesSectionHeader
          label="Våra tjänster"
          title1="Professionell tandvård"
          title2="för alla"
          intro="Vi erbjuder ett brett utbud av tandvårdstjänster."
        />
      );

      expect(screen.getByText("Våra tjänster")).toBeInTheDocument();
      expect(screen.getByText("Professionell tandvård")).toBeInTheDocument();
      expect(screen.getByText("för alla")).toBeInTheDocument();
      expect(screen.getByText("Vi erbjuder ett brett utbud av tandvårdstjänster.")).toBeInTheDocument();
    });

    it("should render label in uppercase with primary color", () => {
      render(<ServicesSectionHeader label="Våra tjänster" />);

      const label = screen.getByText("Våra tjänster");
      expect(label.tagName).toBe("P");
      expect(label.className).toContain("uppercase");
      expect(label.className).toContain("text-primary");
    });

    it("should render title parts in h2 with title2 in primary color", () => {
      const { container } = render(
        <ServicesSectionHeader title1="Professionell tandvård" title2="för alla" />
      );

      const h2 = container.querySelector("h2");
      expect(h2).toBeInTheDocument();
      expect(h2?.textContent).toContain("Professionell tandvård");
      expect(h2?.textContent).toContain("för alla");

      const span = h2?.querySelector("span");
      expect(span?.className).toContain("text-primary");
      expect(span?.textContent).toBe("för alla");
    });
  });

  describe("empty content handling", () => {
    it("should return null when all fields are empty", () => {
      const { container } = render(<ServicesSectionHeader />);

      expect(container.firstChild).toBeNull();
    });

    it("should return null when all fields are whitespace", () => {
      const { container } = render(
        <ServicesSectionHeader label="   " title1="  " title2="   " intro="  " />
      );

      expect(container.firstChild).toBeNull();
    });

    it("should not render label when empty", () => {
      render(
        <ServicesSectionHeader
          title1="Professionell tandvård"
          title2="för alla"
          intro="Intro text"
        />
      );

      const label = screen.queryByText((content, element) => {
        return element?.tagName === "P" && element.className.includes("uppercase");
      });
      expect(label).not.toBeInTheDocument();
    });

    it("should not render h2 when both title parts are empty", () => {
      const { container } = render(
        <ServicesSectionHeader label="Label" intro="Intro text" />
      );

      const h2 = container.querySelector("h2");
      expect(h2).not.toBeInTheDocument();
    });

    it("should not render intro paragraph when empty", () => {
      render(<ServicesSectionHeader label="Label" title1="Title" />);

      const introParagraphs = screen.queryAllByText((content, element) => {
        return (
          element?.tagName === "P" &&
          element.className.includes("text-muted-dark") &&
          element.className.includes("leading-relaxed")
        );
      });
      expect(introParagraphs).toHaveLength(0);
    });

    it("should render when only label has content", () => {
      render(<ServicesSectionHeader label="Våra tjänster" />);

      expect(screen.getByText("Våra tjänster")).toBeInTheDocument();
    });

    it("should render when only title1 has content", () => {
      render(<ServicesSectionHeader title1="Professionell tandvård" />);

      expect(screen.getByText("Professionell tandvård")).toBeInTheDocument();
    });

    it("should render when only title2 has content", () => {
      render(<ServicesSectionHeader title2="för alla" />);

      expect(screen.getByText("för alla")).toBeInTheDocument();
    });

    it("should render when only intro has content", () => {
      render(<ServicesSectionHeader intro="Vi erbjuder ett brett utbud." />);

      expect(screen.getByText("Vi erbjuder ett brett utbud.")).toBeInTheDocument();
    });

    it("should render h2 with only title1", () => {
      const { container } = render(<ServicesSectionHeader title1="Only title1" />);

      const h2 = container.querySelector("h2");
      expect(h2).toBeInTheDocument();
      expect(h2?.textContent).toContain("Only title1");
    });

    it("should render h2 with only title2", () => {
      const { container } = render(<ServicesSectionHeader title2="Only title2" />);

      const h2 = container.querySelector("h2");
      expect(h2).toBeInTheDocument();

      const span = h2?.querySelector("span");
      expect(span?.textContent).toBe("Only title2");
    });
  });

  describe("custom className", () => {
    it("should apply custom className", () => {
      const { container } = render(
        <ServicesSectionHeader label="Label" className="custom-class" />
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain("custom-class");
    });

    it("should preserve default classes when adding custom className", () => {
      const { container } = render(
        <ServicesSectionHeader label="Label" className="custom-class" />
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain("text-center");
      expect(wrapper.className).toContain("max-w-2xl");
      expect(wrapper.className).toContain("custom-class");
    });
  });

  describe("styling", () => {
    it("should have centered text layout", () => {
      const { container } = render(<ServicesSectionHeader label="Label" />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain("text-center");
      expect(wrapper.className).toContain("max-w-2xl");
      expect(wrapper.className).toContain("mx-auto");
      expect(wrapper.className).toContain("mb-16");
    });

    it("should render label with correct styling", () => {
      render(<ServicesSectionHeader label="Label" />);

      const label = screen.getByText("Label");
      expect(label.className).toContain("text-sm");
      expect(label.className).toContain("font-medium");
      expect(label.className).toContain("text-primary");
      expect(label.className).toContain("uppercase");
      expect(label.className).toContain("tracking-wider");
      expect(label.className).toContain("mb-3");
    });

    it("should render h2 with correct styling", () => {
      const { container } = render(<ServicesSectionHeader title1="Title" />);

      const h2 = container.querySelector("h2");
      expect(h2?.className).toContain("text-3xl");
      expect(h2?.className).toContain("sm:text-4xl");
      expect(h2?.className).toContain("font-serif");
      expect(h2?.className).toContain("font-semibold");
      expect(h2?.className).toContain("text-foreground");
      expect(h2?.className).toContain("leading-tight");
      expect(h2?.className).toContain("mb-4");
    });

    it("should render intro with correct styling", () => {
      render(<ServicesSectionHeader intro="Intro text" />);

      const intro = screen.getByText("Intro text");
      expect(intro.className).toContain("text-muted-dark");
      expect(intro.className).toContain("leading-relaxed");
    });
  });
});
