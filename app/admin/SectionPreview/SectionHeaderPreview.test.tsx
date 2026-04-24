import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SectionHeaderPreview } from './SectionHeaderPreview'

describe('SectionHeaderPreview', () => {
  describe('rendering', () => {
    it('should render all provided content', () => {
      render(
        <SectionHeaderPreview
          label="SERVICES"
          title1="Our"
          title2="Services"
          intro="This is the intro text"
        />
      )

      expect(screen.getByText('SERVICES')).toBeInTheDocument()
      expect(screen.getByText(/Our/)).toBeInTheDocument()
      expect(screen.getByText(/Services/)).toBeInTheDocument()
      expect(screen.getByText('This is the intro text')).toBeInTheDocument()
    })

    it('should not render label when not provided', () => {
      render(
        <SectionHeaderPreview
          title1="Title"
          title2="Part 2"
        />
      )

      // Should not find any element with uppercase tracking (label styling)
      const labels = screen.queryByText(/^[A-Z]+$/)
      expect(labels).not.toBeInTheDocument()
    })

    it('should not render intro when not provided', () => {
      const { container } = render(
        <SectionHeaderPreview
          title1="Title Only"
        />
      )

      // Should only have the title
      const paragraphs = container.querySelectorAll('p')
      expect(paragraphs.length).toBe(0)
    })

    it('should render with only title1', () => {
      render(<SectionHeaderPreview title1="Solo Title" />)

      expect(screen.getByText('Solo Title')).toBeInTheDocument()
    })

    it('should apply custom background class', () => {
      const { container } = render(
        <SectionHeaderPreview
          title1="Test"
          bgClass="bg-surface"
        />
      )

      const section = container.querySelector('section')
      expect(section).toHaveClass('bg-surface')
    })

    it('should use default background class when not provided', () => {
      const { container } = render(
        <SectionHeaderPreview title1="Test" />
      )

      const section = container.querySelector('section')
      expect(section).toHaveClass('bg-muted')
    })
  })

  describe('styling', () => {
    it('should style title2 with primary color', () => {
      const { container } = render(
        <SectionHeaderPreview
          title1="Part 1"
          title2="Part 2"
        />
      )

      const primarySpan = container.querySelector('.text-primary')
      expect(primarySpan).toBeInTheDocument()
      expect(primarySpan?.textContent).toBe('Part 2')
    })

    it('should apply uppercase and tracking to label', () => {
      render(<SectionHeaderPreview label="test label" />)

      const label = screen.getByText('test label')
      expect(label).toHaveClass('uppercase')
      expect(label).toHaveClass('tracking-wider')
    })

    it('should center content', () => {
      const { container } = render(
        <SectionHeaderPreview title1="Centered" />
      )

      const wrapper = container.querySelector('.text-center')
      expect(wrapper).toBeInTheDocument()
    })

    it('should apply serif font to title', () => {
      const { container } = render(
        <SectionHeaderPreview title1="Serif Title" />
      )

      const heading = container.querySelector('h2')
      expect(heading).toHaveClass('font-serif')
    })
  })

  describe('real-world usage', () => {
    it('should render services header correctly', () => {
      render(
        <SectionHeaderPreview
          label="TJÄNSTER"
          title1="Professionell"
          title2="Behandlingsplanering"
          intro="För tandläkare som vill erbjuda sina patienter alignerbehandling"
          bgClass="bg-muted"
        />
      )

      expect(screen.getByText('TJÄNSTER')).toBeInTheDocument()
      expect(screen.getByText(/Professionell/)).toBeInTheDocument()
      expect(screen.getByText(/Behandlingsplanering/)).toBeInTheDocument()
      expect(screen.getByText(/För tandläkare som vill erbjuda/)).toBeInTheDocument()
    })

    it('should render FAQ header correctly', () => {
      render(
        <SectionHeaderPreview
          label="FAQ"
          title1="Vanliga"
          title2="Frågor"
          intro="Svar på de vanligaste frågorna om alignerbehandling"
          bgClass="bg-muted"
        />
      )

      expect(screen.getByText('FAQ')).toBeInTheDocument()
      expect(screen.getByText(/Vanliga/)).toBeInTheDocument()
      expect(screen.getByText(/Frågor/)).toBeInTheDocument()
    })
  })
})
