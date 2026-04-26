import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AlignersIntro } from './AlignersIntro'

describe('AlignersIntro', () => {
  describe('rendering', () => {
    it('should render with both fields populated', () => {
      render(<AlignersIntro what="What are aligners?" whatDesc="Description here" />)

      expect(screen.getByText('What are aligners?')).toBeInTheDocument()
      expect(screen.getByText('Description here')).toBeInTheDocument()
    })

    it('should render with only title', () => {
      render(<AlignersIntro what="Title only" whatDesc="" />)

      expect(screen.getByText('Title only')).toBeInTheDocument()
      expect(screen.queryByText('Description here')).not.toBeInTheDocument()
    })

    it('should render with only description', () => {
      render(<AlignersIntro what="" whatDesc="Description only" />)

      expect(screen.queryByText('Title')).not.toBeInTheDocument()
      expect(screen.getByText('Description only')).toBeInTheDocument()
    })
  })

  describe('conditional rendering', () => {
    it('should return null when both fields are empty', () => {
      const { container } = render(<AlignersIntro what="" whatDesc="" />)

      expect(container.firstChild).toBeNull()
    })

    it('should return null when both fields are whitespace', () => {
      const { container } = render(<AlignersIntro what="   " whatDesc="  " />)

      expect(container.firstChild).toBeNull()
    })

    it('should render when title has content after trim', () => {
      render(<AlignersIntro what="  Title  " whatDesc="" />)

      expect(screen.getByText('Title')).toBeInTheDocument()
    })

    it('should render when description has content after trim', () => {
      render(<AlignersIntro what="" whatDesc="  Description  " />)

      expect(screen.getByText('Description')).toBeInTheDocument()
    })
  })

  describe('styling', () => {
    it('should have proper container styling', () => {
      const { container } = render(<AlignersIntro what="Title" whatDesc="Desc" />)

      const card = container.querySelector('.bg-surface.rounded-2xl')
      expect(card).toBeInTheDocument()
      expect(card).toHaveClass('border-border/50')
      expect(card).toHaveClass('shadow-sm')
    })

    it('should have proper heading styling', () => {
      render(<AlignersIntro what="Heading" whatDesc="Desc" />)

      const heading = screen.getByText('Heading')
      expect(heading.tagName).toBe('H3')
      expect(heading).toHaveClass('text-lg')
      expect(heading).toHaveClass('font-semibold')
    })

    it('should have proper description styling', () => {
      render(<AlignersIntro what="Title" whatDesc="Description text" />)

      const desc = screen.getByText('Description text')
      expect(desc.tagName).toBe('P')
      expect(desc).toHaveClass('text-muted-dark')
      expect(desc).toHaveClass('leading-relaxed')
    })
  })

  describe('edge cases', () => {
    it('should handle very long title', () => {
      const longTitle = 'A'.repeat(200)
      render(<AlignersIntro what={longTitle} whatDesc="Desc" />)

      expect(screen.getByText(longTitle)).toBeInTheDocument()
    })

    it('should handle very long description', () => {
      const longDesc = 'B'.repeat(500)
      render(<AlignersIntro what="Title" whatDesc={longDesc} />)

      expect(screen.getByText(longDesc)).toBeInTheDocument()
    })

    it('should handle special characters in title', () => {
      render(<AlignersIntro what="<Title> & 'Quotes'" whatDesc="Desc" />)

      expect(screen.getByText("<Title> & 'Quotes'")).toBeInTheDocument()
    })

    it('should handle special characters in description', () => {
      render(<AlignersIntro what="Title" whatDesc='<script>alert("xss")</script>' />)

      expect(screen.getByText('<script>alert("xss")</script>')).toBeInTheDocument()
    })
  })
})
