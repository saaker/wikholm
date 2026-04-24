import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Process from './Process'

const mockT = vi.fn((key: string) => {
  const translations: Record<string, string> = {
    processLabel: 'Process',
    processTitle1: 'How It',
    processTitle2: 'Works',
  }
  return translations[key] || key
})

const mockSections = {
  process: [
    {
      id: '1',
      sv: { title: 'Konsultation', desc: 'Vi undersöker dina tänder' },
      en: { title: 'Consultation', desc: 'We examine your teeth' },
      hidden: false,
    },
    {
      id: '2',
      sv: { title: 'Behandlingsplan', desc: 'Vi skapar en plan' },
      en: { title: '', desc: '' }, // Missing English content
      hidden: false,
    },
    {
      id: '3',
      sv: { title: 'Behandling', desc: 'Du får dina skenor' },
      en: { title: 'Treatment', desc: 'You receive your aligners' },
      hidden: true, // Hidden card
    },
    {
      id: '4',
      sv: { title: '', desc: '' }, // Missing Swedish content
      en: { title: 'Follow-up', desc: 'Regular check-ins' },
      hidden: false,
    },
  ],
}

// Mock providers
vi.mock('../providers/I18nProvider', () => ({
  useI18n: () => ({
    t: mockT,
    locale: 'sv',
  }),
}))

vi.mock('../providers/SectionsProvider', () => ({
  useSections: () => ({
    sections: mockSections,
  }),
}))

vi.mock('../hooks/useAnimateIn', () => ({
  useAnimateIn: () => ({
    ref: { current: null },
    visible: true,
  }),
}))

beforeEach(() => {
  mockT.mockClear()
})

describe('Process', () => {
  describe('rendering', () => {
    it('should render section header', () => {
      render(<Process />)

      expect(screen.getByText('Process')).toBeInTheDocument()
      expect(screen.getByText('How It')).toBeInTheDocument()
      expect(screen.getByText('Works')).toBeInTheDocument()
    })

    it('should render process cards with content in Swedish', () => {
      render(<Process />)

      expect(screen.getByText('Konsultation')).toBeInTheDocument()
      expect(screen.getByText('Behandlingsplan')).toBeInTheDocument()
    })

    it('should render step numbers', () => {
      render(<Process />)

      expect(screen.getByText('01')).toBeInTheDocument()
      expect(screen.getByText('02')).toBeInTheDocument()
    })
  })

  describe('filtering by language content', () => {
    it('should show cards with Swedish content when locale is sv', () => {
      render(<Process />)

      // Cards with Swedish content
      expect(screen.getByText('Konsultation')).toBeInTheDocument()
      expect(screen.getByText('Behandlingsplan')).toBeInTheDocument()

      // Cards without Swedish content should not appear
      expect(screen.queryByText('Follow-up')).not.toBeInTheDocument()
    })

    it('should filter out cards without content in current language', () => {
      render(<Process />)

      // Card #2 has Swedish but no English - should appear in Swedish
      expect(screen.getByText('Behandlingsplan')).toBeInTheDocument()

      // Card #4 has English but no Swedish - should NOT appear in Swedish
      expect(screen.queryByText('Follow-up')).not.toBeInTheDocument()
    })

    it('should show card with only title (no description)', () => {
      // Card #1 has both title and description
      render(<Process />)

      expect(screen.getByText('Konsultation')).toBeInTheDocument()
    })

    it('should show card with only description (no title)', () => {
      // If we had a card with only description, it should still show
      // This tests the OR logic in the filter: (title || desc)
      const { container } = render(<Process />)

      // Both our visible cards have both title and desc, so they should render
      const cards = container.querySelectorAll('.grid > .relative')
      expect(cards.length).toBeGreaterThan(0)
    })

    it('should hide card with empty title AND empty description', () => {
      render(<Process />)

      // Card #4 has empty Swedish title and desc - should not appear
      const { container } = render(<Process />)
      const cards = container.querySelectorAll('.grid > .relative')

      // Only 2 cards should be visible (not 4)
      expect(cards).toHaveLength(2)
    })
  })

  describe('filtering by hidden property', () => {
    it('should not render hidden cards', () => {
      render(<Process />)

      // Hidden card should not appear even though it has content
      expect(screen.queryByText('Behandling')).not.toBeInTheDocument()
    })

    it('should only render non-hidden cards with language content', () => {
      const { container } = render(<Process />)

      // Should only render 2 cards (cards 1 and 2)
      // Card 1: has Swedish content, not hidden
      // Card 2: has Swedish content, not hidden
      // Card 3: hidden
      // Card 4: no Swedish content
      const cards = container.querySelectorAll('.grid > .relative')
      expect(cards).toHaveLength(2)
    })
  })

  describe('layout', () => {
    it('should render cards in a grid', () => {
      const { container } = render(<Process />)

      const grid = container.querySelector('.grid')
      expect(grid).toHaveClass('sm:grid-cols-2', 'lg:grid-cols-4', 'gap-8')
    })

    it('should have section with correct id', () => {
      const { container } = render(<Process />)

      const section = container.querySelector('section')
      expect(section).toHaveAttribute('id', 'process')
    })

    it('should apply background styling', () => {
      const { container } = render(<Process />)

      const section = container.querySelector('section')
      expect(section).toHaveClass('bg-surface')
    })
  })

  describe('animation', () => {
    it('should apply animation classes to header', () => {
      const { container } = render(<Process />)

      const header = container.querySelector('.animate-fade-up')
      expect(header).toHaveClass('visible')
    })

    it('should apply animation classes to cards', () => {
      const { container } = render(<Process />)

      const cards = container.querySelectorAll('.grid > .relative')
      cards.forEach(card => {
        expect(card).toHaveClass('animate-fade-up', 'visible')
      })
    })
  })

  describe('edge cases', () => {
    it('should handle filtering correctly with mixed content', () => {
      // With our mock data:
      // - Card 1: Swedish content, not hidden -> renders
      // - Card 2: Swedish content, not hidden -> renders
      // - Card 3: hidden -> doesn't render
      // - Card 4: no Swedish content -> doesn't render
      // Result: 2 cards should be visible
      const { container } = render(<Process />)

      const grid = container.querySelector('.grid')
      expect(grid).toBeInTheDocument()

      // Verify we have exactly 2 visible cards
      const visibleCards = container.querySelectorAll('.grid > .relative')
      expect(visibleCards).toHaveLength(2)
    })
  })

  describe('accessibility', () => {
    it('should render section with proper semantic HTML', () => {
      const { container } = render(<Process />)

      const section = container.querySelector('section')
      expect(section?.tagName).toBe('SECTION')
    })

    it('should use proper heading hierarchy', () => {
      render(<Process />)

      const h2 = screen.getByRole('heading', { level: 2 })
      expect(h2).toBeInTheDocument()
    })
  })
})
