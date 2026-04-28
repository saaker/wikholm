import { describe, it, expect, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import BeforeAfter from '../BeforeAfter'

// Mock providers
vi.mock('../../providers/I18nProvider', () => ({
  useI18n: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        beforeAfterLabel: 'BEFORE & AFTER',
        beforeAfterTitle1: 'Real',
        beforeAfterTitle2: 'Results',
        beforeAfterIntro: 'See transformations',
        beforeAfterBefore: 'BEFORE',
        beforeAfterAfter: 'AFTER',
        beforeAfterShowMore: 'Show more',
        beforeAfterShowLess: 'Show less',
        beforeAfterDisclaimer: 'Results may vary',
      }
      return translations[key] || key
    },
  }),
}))

vi.mock('../../providers/SectionsProvider', () => ({
  useSections: () => ({
    sections: {
      beforeAfter: [
        { id: '1', before: '/before-1.jpg', after: '/after-1.jpg' },
        { id: '2', before: '/before-2.jpg', after: '/after-2.jpg' },
        { id: '3', before: '/before-3.jpg', after: '/after-3.jpg' },
        { id: '4', before: '/before-4.jpg', after: '/after-4.jpg' },
        { id: '5', before: '/before-5.jpg', after: '/after-5.jpg' },
        { id: '6', before: '/before-6.jpg', after: '/after-6.jpg' },
        { id: '7', before: '/before-7.jpg', after: '/after-7.jpg', hidden: true },
        { id: '8', before: '/before-8.jpg', after: '/after-8.jpg' },
      ],
    },
  }),
}))

vi.mock('../../hooks/useAnimateIn/useAnimateIn', () => ({
  useAnimateIn: () => ({
    ref: vi.fn(),
    visible: true,
  }),
}))

describe('BeforeAfter', () => {
  describe('section rendering', () => {
    it('should render section with correct id', () => {
      const { container } = render(<BeforeAfter />)
      expect(container.querySelector('#before-after')).toBeInTheDocument()
    })

    it('should render section header', () => {
      render(<BeforeAfter />)
      expect(screen.getByText('BEFORE & AFTER')).toBeInTheDocument()
      expect(screen.getByText('Real')).toBeInTheDocument()
      expect(screen.getByText('Results')).toBeInTheDocument()
      expect(screen.getByText('See transformations')).toBeInTheDocument()
    })

    it('should render disclaimer text', () => {
      render(<BeforeAfter />)
      expect(screen.getByText('Results may vary')).toBeInTheDocument()
    })
  })

  describe('filtering hidden items', () => {
    it('should not render hidden items', () => {
      render(<BeforeAfter />)

      expect(screen.getByAltText('BEFORE – Patient 1')).toBeInTheDocument()
      expect(screen.queryByAltText('BEFORE – Patient 7')).not.toBeInTheDocument()
    })

    it('should only count non-hidden items for display', () => {
      render(<BeforeAfter />)

      // Should show first 6 non-hidden items
      expect(screen.getByAltText('BEFORE – Patient 1')).toBeInTheDocument()
      expect(screen.getByAltText('BEFORE – Patient 6')).toBeInTheDocument()
      // Item 8 should not be visible initially (beyond first 6)
      expect(screen.queryByAltText('BEFORE – Patient 8')).not.toBeInTheDocument()
    })
  })

  describe('show more/less functionality', () => {
    it('should show first 6 items initially', () => {
      render(<BeforeAfter />)

      expect(screen.getByAltText('BEFORE – Patient 1')).toBeInTheDocument()
      expect(screen.getByAltText('BEFORE – Patient 6')).toBeInTheDocument()
      expect(screen.queryByAltText('BEFORE – Patient 8')).not.toBeInTheDocument()
    })

    it('should show "Show more" button when more than 6 items', () => {
      render(<BeforeAfter />)
      expect(screen.getByText('Show more')).toBeInTheDocument()
    })

    it('should show all items when "Show more" is clicked', async () => {
      const user = userEvent.setup()
      render(<BeforeAfter />)

      const showMoreButton = screen.getByText('Show more')
      await user.click(showMoreButton)

      expect(screen.getByAltText('BEFORE – Patient 8')).toBeInTheDocument()
    })

    it('should change button text to "Show less" after expanding', async () => {
      const user = userEvent.setup()
      render(<BeforeAfter />)

      const showMoreButton = screen.getByText('Show more')
      await user.click(showMoreButton)

      expect(screen.getByText('Show less')).toBeInTheDocument()
      expect(screen.queryByText('Show more')).not.toBeInTheDocument()
    })

    it('should collapse items when "Show less" is clicked', async () => {
      const user = userEvent.setup()
      render(<BeforeAfter />)

      const showMoreButton = screen.getByText('Show more')
      await user.click(showMoreButton)

      expect(screen.getByAltText('BEFORE – Patient 8')).toBeInTheDocument()

      const showLessButton = screen.getByText('Show less')
      await user.click(showLessButton)

      expect(screen.queryByAltText('BEFORE – Patient 8')).not.toBeInTheDocument()
    })
  })

  describe('lightbox interaction', () => {
    it('should not render lightbox initially', () => {
      render(<BeforeAfter />)
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('should open lightbox when card is clicked', async () => {
      const user = userEvent.setup()
      render(<BeforeAfter />)

      const cards = screen.getAllByRole('button')
      await user.click(cards[0])

      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('should close lightbox when close button is clicked', async () => {
      const user = userEvent.setup()
      render(<BeforeAfter />)

      const cards = screen.getAllByRole('button').filter(btn =>
        btn.querySelector('img')
      )
      await user.click(cards[0])

      expect(screen.getByRole('dialog')).toBeInTheDocument()

      const closeButton = screen.getByLabelText('Close')
      await user.click(closeButton)

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('should open lightbox at correct index', async () => {
      const user = userEvent.setup()
      render(<BeforeAfter />)

      const cards = screen.getAllByRole('button').filter(btn =>
        btn.querySelector('img')
      )
      await user.click(cards[2])

      const dialog = screen.getByRole('dialog')
      expect(within(dialog).getByText('3 / 7')).toBeInTheDocument()
    })

    it('should restore focus to card after closing lightbox', async () => {
      const user = userEvent.setup()
      render(<BeforeAfter />)

      const cards = screen.getAllByRole('button').filter(btn =>
        btn.querySelector('img')
      )
      const firstCard = cards[0]
      await user.click(firstCard)

      expect(screen.getByRole('dialog')).toBeInTheDocument()

      const closeButton = screen.getByLabelText('Close')
      await user.click(closeButton)

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      expect(firstCard).toHaveFocus()
    })
  })

  describe('grid layout', () => {
    it('should render cards in a grid', () => {
      const { container } = render(<BeforeAfter />)
      const grid = container.querySelector('.grid.sm\\:grid-cols-2')
      expect(grid).toBeInTheDocument()
    })

    it('should render BeforeAfterCard components', () => {
      render(<BeforeAfter />)

      // All visible cards should have both before and after images
      expect(screen.getByAltText('BEFORE – Patient 1')).toBeInTheDocument()
      expect(screen.getByAltText('AFTER – Patient 1')).toBeInTheDocument()
    })
  })

  describe('accessibility', () => {
    it('should have proper section structure', () => {
      const { container } = render(<BeforeAfter />)
      const section = container.querySelector('section')
      expect(section).toHaveAttribute('id', 'before-after')
    })

    it('should render cards as buttons when interactive', () => {
      render(<BeforeAfter />)
      const cards = screen.getAllByRole('button').filter(btn =>
        btn.querySelector('img')
      )
      expect(cards.length).toBeGreaterThan(0)
    })

    it('should have accessible show more/less button', () => {
      render(<BeforeAfter />)
      const button = screen.getByText('Show more')
      expect(button.tagName).toBe('BUTTON')
    })
  })

  describe('responsive behavior', () => {
    it('should have responsive padding', () => {
      const { container } = render(<BeforeAfter />)
      const section = container.querySelector('section')
      expect(section?.className).toContain('py-24')
    })

    it('should have responsive container', () => {
      const { container } = render(<BeforeAfter />)
      const wrapper = container.querySelector('.max-w-6xl')
      expect(wrapper).toBeInTheDocument()
    })
  })
})
