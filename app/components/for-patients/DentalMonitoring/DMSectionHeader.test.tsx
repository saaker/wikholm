import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DMSectionHeader } from './DMSectionHeader'

describe('DMSectionHeader', () => {
  describe('rendering', () => {
    it('should render all content when provided', () => {
      render(
        <DMSectionHeader
          label="DENTAL MONITORING"
          title1="Smart"
          title2="Övervakning"
          intro="En beskrivning av tjänsten"
        />
      )

      expect(screen.getByText('DENTAL MONITORING')).toBeInTheDocument()
      expect(screen.getByText(/Smart/)).toBeInTheDocument()
      expect(screen.getByText('Övervakning')).toBeInTheDocument()
      expect(screen.getByText('En beskrivning av tjänsten')).toBeInTheDocument()
    })

    it('should render without label', () => {
      render(
        <DMSectionHeader
          title1="Smart"
          title2="Övervakning"
          intro="En beskrivning"
        />
      )

      expect(screen.getByText(/Smart/)).toBeInTheDocument()
      expect(screen.getByText('Övervakning')).toBeInTheDocument()
      const label = screen.queryByText(/DENTAL/)
      expect(label).not.toBeInTheDocument()
    })

    it('should render without intro', () => {
      render(
        <DMSectionHeader
          label="LABEL"
          title1="Title"
          title2="Highlighted"
        />
      )

      expect(screen.getByText('LABEL')).toBeInTheDocument()
      expect(screen.getByText(/Title/)).toBeInTheDocument()
      expect(screen.getByText('Highlighted')).toBeInTheDocument()
    })

    it('should handle empty strings', () => {
      const { container } = render(
        <DMSectionHeader
          label=""
          title1="Title"
          title2=""
          intro=""
        />
      )

      expect(container.querySelector('p.text-sm')).not.toBeInTheDocument()
      expect(screen.getByText(/Title/)).toBeInTheDocument()
    })

    it('should return null when all fields are empty', () => {
      const { container } = render(
        <DMSectionHeader
          label=""
          title1=""
          title2=""
          intro=""
        />
      )

      expect(container.firstChild).toBeNull()
    })

    it('should return null when all fields are undefined', () => {
      const { container } = render(<DMSectionHeader />)

      expect(container.firstChild).toBeNull()
    })

    it('should not render h2 when both title1 and title2 are empty', () => {
      const { container } = render(
        <DMSectionHeader
          label="LABEL"
          title1=""
          title2=""
          intro="Intro text"
        />
      )

      expect(screen.getByText('LABEL')).toBeInTheDocument()
      expect(screen.getByText('Intro text')).toBeInTheDocument()
      expect(container.querySelector('h2')).not.toBeInTheDocument()
    })

    it('should render with only label', () => {
      const { container } = render(
        <DMSectionHeader label="ONLY LABEL" />
      )

      expect(screen.getByText('ONLY LABEL')).toBeInTheDocument()
      expect(container.querySelector('h2')).not.toBeInTheDocument()
    })

    it('should render with only intro', () => {
      const { container } = render(
        <DMSectionHeader intro="Only intro text" />
      )

      expect(screen.getByText('Only intro text')).toBeInTheDocument()
      expect(container.querySelector('h2')).not.toBeInTheDocument()
    })

    it('should render h2 with only title1', () => {
      render(
        <DMSectionHeader
          title1="Only first title"
        />
      )

      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toBeInTheDocument()
      expect(heading.textContent).toContain('Only first title')
    })

    it('should render h2 with only title2', () => {
      render(
        <DMSectionHeader
          title2="Only second title"
        />
      )

      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toBeInTheDocument()
      expect(heading.textContent).toContain('Only second title')
    })
  })

  describe('styling', () => {
    it('should have sticky positioning classes', () => {
      const { container } = render(
        <DMSectionHeader title1="Title" title2="Highlighted" />
      )

      const header = container.firstChild as HTMLElement
      expect(header.className).toContain('md:sticky')
      expect(header.className).toContain('md:top-30')
      expect(header.className).toContain('md:pt-[18%]')
    })

    it('should have text alignment classes', () => {
      const { container } = render(
        <DMSectionHeader title1="Title" title2="Highlighted" />
      )

      const header = container.firstChild as HTMLElement
      expect(header.className).toContain('text-center')
      expect(header.className).toContain('md:text-left')
    })

    it('should render label with uppercase and tracking', () => {
      const { container } = render(
        <DMSectionHeader label="Label Text" title1="Title" title2="Highlighted" />
      )

      const label = container.querySelector('p.uppercase.tracking-wider')
      expect(label).toBeInTheDocument()
      expect(label?.className).toContain('text-primary')
    })

    it('should render title with serif font', () => {
      const { container } = render(
        <DMSectionHeader title1="Title" title2="Highlighted" />
      )

      const title = container.querySelector('h2.font-serif')
      expect(title).toBeInTheDocument()
      expect(title?.className).toContain('text-3xl')
      expect(title?.className).toContain('sm:text-4xl')
    })

    it('should render title2 with primary color', () => {
      const { container } = render(
        <DMSectionHeader title1="Regular" title2="Highlighted" />
      )

      const highlightedSpan = container.querySelector('span.text-primary')
      expect(highlightedSpan).toBeInTheDocument()
      expect(highlightedSpan?.textContent).toBe('Highlighted')
    })

    it('should render intro with muted color', () => {
      const { container } = render(
        <DMSectionHeader
          title1="Title"
          title2="Highlighted"
          intro="Introduction text"
        />
      )

      const intro = container.querySelector('p.text-muted-dark')
      expect(intro).toBeInTheDocument()
      expect(intro?.textContent).toBe('Introduction text')
    })
  })

  describe('className composition', () => {
    it('should apply custom className', () => {
      const { container } = render(
        <DMSectionHeader
          title1="Title"
          title2="Highlighted"
          className="custom-class"
        />
      )

      const header = container.firstChild as HTMLElement
      expect(header.className).toContain('custom-class')
    })

    it('should combine default and custom classes', () => {
      const { container } = render(
        <DMSectionHeader
          title1="Title"
          title2="Highlighted"
          className="animate-fade-up visible"
        />
      )

      const header = container.firstChild as HTMLElement
      expect(header.className).toContain('md:sticky')
      expect(header.className).toContain('animate-fade-up')
      expect(header.className).toContain('visible')
    })

    it('should work without className prop', () => {
      const { container } = render(
        <DMSectionHeader title1="Title" title2="Highlighted" />
      )

      const header = container.firstChild as HTMLElement
      expect(header.className).not.toContain('undefined')
    })
  })

  describe('accessibility', () => {
    it('should use semantic heading element', () => {
      const { container } = render(
        <DMSectionHeader title1="Title" title2="Highlighted" />
      )

      const heading = container.querySelector('h2')
      expect(heading).toBeInTheDocument()
    })

    it('should maintain heading structure with both title parts', () => {
      render(
        <DMSectionHeader
          title1="Smart"
          title2="Övervakning"
        />
      )

      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toBeInTheDocument()
      expect(heading.textContent).toContain('Smart')
      expect(heading.textContent).toContain('Övervakning')
    })
  })

  describe('layout variations', () => {
    it('should handle long label text', () => {
      render(
        <DMSectionHeader
          label="VERY LONG LABEL TEXT THAT MIGHT WRAP"
          title1="Title"
          title2="Highlighted"
        />
      )

      expect(screen.getByText('VERY LONG LABEL TEXT THAT MIGHT WRAP')).toBeInTheDocument()
    })

    it('should handle long title text', () => {
      render(
        <DMSectionHeader
          title1="A very long title that might span multiple lines on smaller screens"
          title2="And continues here"
        />
      )

      expect(screen.getByText(/A very long title/)).toBeInTheDocument()
      expect(screen.getByText('And continues here')).toBeInTheDocument()
    })

    it('should handle long intro text', () => {
      const longIntro = 'This is a very long introduction paragraph that contains multiple sentences and might wrap across several lines depending on the viewport width.'

      render(
        <DMSectionHeader
          title1="Title"
          title2="Highlighted"
          intro={longIntro}
        />
      )

      expect(screen.getByText(longIntro)).toBeInTheDocument()
    })
  })
})
