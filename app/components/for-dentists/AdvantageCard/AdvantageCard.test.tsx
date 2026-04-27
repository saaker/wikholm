import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AdvantageCard } from './AdvantageCard'
import type { AdvantageItem } from '@/lib/sectionsDefaults'

describe('AdvantageCard', () => {
  const mockItem: AdvantageItem = {
    id: '1',
    sv: {
      title: 'Swedish Title',
      desc: 'Swedish Description',
    },
    en: {
      title: 'English Title',
      desc: 'English Description',
    },
  }

  describe('rendering with content', () => {
    it('should render title and description in Swedish', () => {
      render(<AdvantageCard item={mockItem} locale="sv" />)

      expect(screen.getByText('Swedish Title')).toBeInTheDocument()
      expect(screen.getByText('Swedish Description')).toBeInTheDocument()
    })

    it('should render title and description in English', () => {
      render(<AdvantageCard item={mockItem} locale="en" />)

      expect(screen.getByText('English Title')).toBeInTheDocument()
      expect(screen.getByText('English Description')).toBeInTheDocument()
    })

    it('should render check icon', () => {
      const { container } = render(<AdvantageCard item={mockItem} locale="sv" />)

      const iconWrapper = container.querySelector('.bg-primary-light')
      expect(iconWrapper).toBeInTheDocument()
      expect(iconWrapper?.querySelector('svg')).toBeInTheDocument()
    })

    it('should apply custom className', () => {
      const { container } = render(
        <AdvantageCard item={mockItem} locale="sv" className="custom-class" />
      )

      const card = container.firstChild as HTMLElement
      expect(card.className).toContain('custom-class')
    })
  })

  describe('empty content handling', () => {
    it('should not render title when title is missing', () => {
      const itemWithoutTitle: AdvantageItem = {
        ...mockItem,
        sv: { ...mockItem.sv, title: '' },
      }

      render(<AdvantageCard item={itemWithoutTitle} locale="sv" />)

      expect(screen.queryByRole('heading')).not.toBeInTheDocument()
      expect(screen.getByText('Swedish Description')).toBeInTheDocument()
    })

    it('should not render description when description is missing', () => {
      const itemWithoutDesc: AdvantageItem = {
        ...mockItem,
        sv: { ...mockItem.sv, desc: '' },
      }

      render(<AdvantageCard item={itemWithoutDesc} locale="sv" />)

      expect(screen.getByText('Swedish Title')).toBeInTheDocument()
      expect(screen.queryByText('Swedish Description')).not.toBeInTheDocument()
    })

    it('should return null when both title and description are missing (non-preview)', () => {
      const emptyItem: AdvantageItem = {
        ...mockItem,
        sv: { title: '', desc: '' },
      }

      const { container } = render(<AdvantageCard item={emptyItem} locale="sv" />)

      expect(container.firstChild).toBeNull()
    })

    it('should return null when both are whitespace (non-preview)', () => {
      const whitespaceItem: AdvantageItem = {
        ...mockItem,
        sv: { title: '   ', desc: '  ' },
      }

      const { container } = render(
        <AdvantageCard item={whitespaceItem} locale="sv" />
      )

      expect(container.firstChild).toBeNull()
    })

    it('should render in preview mode even when content is missing', () => {
      const emptyItem: AdvantageItem = {
        ...mockItem,
        sv: { title: '', desc: '' },
      }

      const { container } = render(
        <AdvantageCard item={emptyItem} locale="sv" preview />
      )

      expect(container.firstChild).not.toBeNull()
      const iconWrapper = container.querySelector('.bg-primary-light')
      expect(iconWrapper).toBeInTheDocument()
    })
  })

  describe('locale handling', () => {
    it('should use Swedish content when locale is sv', () => {
      render(<AdvantageCard item={mockItem} locale="sv" />)

      expect(screen.getByText('Swedish Title')).toBeInTheDocument()
      expect(screen.queryByText('English Title')).not.toBeInTheDocument()
    })

    it('should use English content when locale is en', () => {
      render(<AdvantageCard item={mockItem} locale="en" />)

      expect(screen.getByText('English Title')).toBeInTheDocument()
      expect(screen.queryByText('Swedish Title')).not.toBeInTheDocument()
    })
  })

  describe('styling', () => {
    it('should have correct container classes', () => {
      const { container } = render(<AdvantageCard item={mockItem} locale="sv" />)

      const card = container.firstChild as HTMLElement
      expect(card.className).toContain('flex')
      expect(card.className).toContain('gap-5')
      expect(card.className).toContain('items-start')
    })

    it('should have correct icon wrapper styling', () => {
      const { container } = render(<AdvantageCard item={mockItem} locale="sv" />)

      const iconWrapper = container.querySelector('.w-10.h-10')
      expect(iconWrapper).toBeInTheDocument()
      expect(iconWrapper?.className).toContain('rounded-full')
      expect(iconWrapper?.className).toContain('bg-primary-light')
      expect(iconWrapper?.className).toContain('shrink-0')
    })

    it('should have correct title styling', () => {
      render(<AdvantageCard item={mockItem} locale="sv" />)

      const title = screen.getByText('Swedish Title')
      expect(title.className).toContain('font-semibold')
      expect(title.className).toContain('text-foreground')
      expect(title.className).toContain('font-sans')
    })

    it('should have correct description styling', () => {
      render(<AdvantageCard item={mockItem} locale="sv" />)

      const desc = screen.getByText('Swedish Description')
      expect(desc.className).toContain('text-muted-dark')
      expect(desc.className).toContain('leading-relaxed')
    })
  })

  describe('semantic HTML', () => {
    it('should render title as h4 element', () => {
      render(<AdvantageCard item={mockItem} locale="sv" />)

      const heading = screen.getByRole('heading', { level: 4 })
      expect(heading).toHaveTextContent('Swedish Title')
    })

    it('should render description as paragraph', () => {
      render(<AdvantageCard item={mockItem} locale="sv" />)

      const paragraph = screen.getByText('Swedish Description')
      expect(paragraph.tagName).toBe('P')
    })
  })

  describe('partial content', () => {
    it('should render only title when description is empty', () => {
      const titleOnlyItem: AdvantageItem = {
        ...mockItem,
        sv: { title: 'Only Title', desc: '' },
      }

      render(<AdvantageCard item={titleOnlyItem} locale="sv" />)

      expect(screen.getByText('Only Title')).toBeInTheDocument()
      expect(screen.queryByRole('paragraph')).not.toBeInTheDocument()
    })

    it('should render only description when title is empty', () => {
      const descOnlyItem: AdvantageItem = {
        ...mockItem,
        sv: { title: '', desc: 'Only Description' },
      }

      render(<AdvantageCard item={descOnlyItem} locale="sv" />)

      expect(screen.queryByRole('heading')).not.toBeInTheDocument()
      expect(screen.getByText('Only Description')).toBeInTheDocument()
    })
  })
})
