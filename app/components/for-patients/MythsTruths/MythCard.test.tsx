import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MythCard } from './MythCard'
import type { MythItem } from '@/lib/sectionsDefaults'

describe('MythCard', () => {
  const mockMythItem: MythItem = {
    id: '1',
    sv: {
      myth: 'Genomskinliga skenor gör ont',
      truth: 'De flesta patienter upplever bara ett lätt tryck som försvinner efter några dagar.',
    },
    en: {
      myth: 'Clear aligners hurt',
      truth: 'Most patients only experience mild pressure that disappears after a few days.',
    },
  }

  describe('rendering', () => {
    it('should render myth in Swedish', () => {
      render(
        <MythCard
          item={mockMythItem}
          locale="sv"
          mythLabel="MYT"
          truthLabel="SANNING"
        />
      )

      expect(screen.getByText('Genomskinliga skenor gör ont')).toBeInTheDocument()
    })

    it('should render myth in English', () => {
      render(
        <MythCard
          item={mockMythItem}
          locale="en"
          mythLabel="MYTH"
          truthLabel="TRUTH"
        />
      )

      expect(screen.getByText('Clear aligners hurt')).toBeInTheDocument()
    })

    it('should render truth when open', () => {
      render(
        <MythCard
          item={mockMythItem}
          locale="sv"
          isOpen={true}
          mythLabel="MYT"
          truthLabel="SANNING"
        />
      )

      expect(screen.getByText(/De flesta patienter upplever bara/)).toBeInTheDocument()
    })

    it('should use default locale sv', () => {
      render(
        <MythCard
          item={mockMythItem}
          mythLabel="MYT"
          truthLabel="SANNING"
        />
      )

      expect(screen.getByText('Genomskinliga skenor gör ont')).toBeInTheDocument()
    })
  })

  describe('labels', () => {
    it('should render myth label', () => {
      render(
        <MythCard
          item={mockMythItem}
          locale="sv"
          mythLabel="MYT"
          truthLabel="SANNING"
        />
      )

      expect(screen.getByText('MYT')).toBeInTheDocument()
    })

    it('should render truth label when open', () => {
      render(
        <MythCard
          item={mockMythItem}
          locale="sv"
          isOpen={true}
          mythLabel="MYT"
          truthLabel="SANNING"
        />
      )

      expect(screen.getByText('SANNING')).toBeInTheDocument()
    })

    it('should use custom labels', () => {
      render(
        <MythCard
          item={mockMythItem}
          locale="en"
          isOpen={true}
          mythLabel="CUSTOM MYTH"
          truthLabel="CUSTOM TRUTH"
        />
      )

      expect(screen.getByText('CUSTOM MYTH')).toBeInTheDocument()
      expect(screen.getByText('CUSTOM TRUTH')).toBeInTheDocument()
    })
  })

  describe('accordion functionality', () => {
    it('should show chevron icon', () => {
      const { container } = render(
        <MythCard
          item={mockMythItem}
          mythLabel="MYT"
          truthLabel="SANNING"
        />
      )

      const chevron = container.querySelector('svg')
      expect(chevron).toBeInTheDocument()
    })

    it('should rotate chevron when open', () => {
      const { container } = render(
        <MythCard
          item={mockMythItem}
          isOpen={true}
          mythLabel="MYT"
          truthLabel="SANNING"
        />
      )

      const chevron = container.querySelector('svg')
      expect(chevron).toHaveClass('rotate-180')
    })

    it('should not rotate chevron when closed', () => {
      const { container } = render(
        <MythCard
          item={mockMythItem}
          isOpen={false}
          mythLabel="MYT"
          truthLabel="SANNING"
        />
      )

      const chevron = container.querySelector('svg')
      expect(chevron).not.toHaveClass('rotate-180')
    })

    it('should have aria-expanded=true when open', () => {
      render(
        <MythCard
          item={mockMythItem}
          isOpen={true}
          mythLabel="MYT"
          truthLabel="SANNING"
        />
      )

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-expanded', 'true')
    })

    it('should have aria-expanded=false when closed', () => {
      render(
        <MythCard
          item={mockMythItem}
          isOpen={false}
          mythLabel="MYT"
          truthLabel="SANNING"
        />
      )

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-expanded', 'false')
    })
  })

  describe('interactivity', () => {
    it('should call onToggle when clicked', async () => {
      const handleToggle = vi.fn()
      const user = userEvent.setup()

      render(
        <MythCard
          item={mockMythItem}
          onToggle={handleToggle}
          mythLabel="MYT"
          truthLabel="SANNING"
        />
      )

      const button = screen.getByRole('button')
      await user.click(button)

      expect(handleToggle).toHaveBeenCalledTimes(1)
    })

    it('should work without onToggle handler', async () => {
      const user = userEvent.setup()

      render(
        <MythCard
          item={mockMythItem}
          mythLabel="MYT"
          truthLabel="SANNING"
        />
      )

      const button = screen.getByRole('button')
      await user.click(button)

      // Should not throw error
      expect(button).toBeInTheDocument()
    })
  })

  describe('accessibility', () => {
    it('should have button role', () => {
      render(
        <MythCard
          item={mockMythItem}
          mythLabel="MYT"
          truthLabel="SANNING"
        />
      )

      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should have aria-controls pointing to truth', () => {
      render(
        <MythCard
          item={mockMythItem}
          mythLabel="MYT"
          truthLabel="SANNING"
        />
      )

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-controls', 'myth-truth-1')
    })

    it('should have region role for truth panel', () => {
      render(
        <MythCard
          item={mockMythItem}
          mythLabel="MYT"
          truthLabel="SANNING"
        />
      )

      const region = screen.getByRole('region')
      expect(region).toBeInTheDocument()
      expect(region).toHaveAttribute('id', 'myth-truth-1')
    })

    it('should hide chevron from screen readers', () => {
      const { container } = render(
        <MythCard
          item={mockMythItem}
          mythLabel="MYT"
          truthLabel="SANNING"
        />
      )

      const chevron = container.querySelector('svg')
      expect(chevron).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('styling', () => {
    it('should apply custom className', () => {
      const { container } = render(
        <MythCard
          item={mockMythItem}
          className="custom-class"
          mythLabel="MYT"
          truthLabel="SANNING"
        />
      )

      const card = container.firstChild
      expect(card).toHaveClass('custom-class')
    })

    it('should have border and shadow', () => {
      const { container } = render(
        <MythCard
          item={mockMythItem}
          mythLabel="MYT"
          truthLabel="SANNING"
        />
      )

      const card = container.firstChild
      expect(card).toHaveClass('border')
      expect(card).toHaveClass('shadow-sm')
    })

    it('should have rounded corners', () => {
      const { container } = render(
        <MythCard
          item={mockMythItem}
          mythLabel="MYT"
          truthLabel="SANNING"
        />
      )

      const card = container.firstChild
      expect(card).toHaveClass('rounded-xl')
    })

    it('should apply grid animation classes when open', () => {
      const { container } = render(
        <MythCard
          item={mockMythItem}
          isOpen={true}
          mythLabel="MYT"
          truthLabel="SANNING"
        />
      )

      const truthPanel = container.querySelector('#myth-truth-1')
      expect(truthPanel).toHaveClass('grid-rows-[1fr]')
      expect(truthPanel).toHaveClass('opacity-100')
    })

    it('should apply collapsed grid classes when closed', () => {
      const { container } = render(
        <MythCard
          item={mockMythItem}
          isOpen={false}
          mythLabel="MYT"
          truthLabel="SANNING"
        />
      )

      const truthPanel = container.querySelector('#myth-truth-1')
      expect(truthPanel).toHaveClass('grid-rows-[0fr]')
      expect(truthPanel).toHaveClass('opacity-0')
    })

    it('should style myth label with myth colors', () => {
      render(
        <MythCard
          item={mockMythItem}
          mythLabel="MYT"
          truthLabel="SANNING"
        />
      )

      const mythLabel = screen.getByText('MYT')
      expect(mythLabel).toHaveClass('bg-myth-bg')
      expect(mythLabel).toHaveClass('text-myth-text')
    })

    it('should style truth label with truth colors', () => {
      render(
        <MythCard
          item={mockMythItem}
          isOpen={true}
          mythLabel="MYT"
          truthLabel="SANNING"
        />
      )

      const truthLabel = screen.getByText('SANNING')
      expect(truthLabel).toHaveClass('bg-truth-bg')
      expect(truthLabel).toHaveClass('text-truth-text')
    })
  })

  describe('edge cases', () => {
    it('should handle empty myth', () => {
      const itemWithEmptyMyth: MythItem = {
        ...mockMythItem,
        sv: { myth: '', truth: 'Truth' },
      }

      render(
        <MythCard
          item={itemWithEmptyMyth}
          locale="sv"
          mythLabel="MYT"
          truthLabel="SANNING"
        />
      )

      expect(screen.getByText('—')).toBeInTheDocument()
    })

    it('should handle empty truth', () => {
      const itemWithEmptyTruth: MythItem = {
        ...mockMythItem,
        sv: { myth: 'Myth', truth: '' },
      }

      render(
        <MythCard
          item={itemWithEmptyTruth}
          locale="sv"
          isOpen={true}
          mythLabel="MYT"
          truthLabel="SANNING"
        />
      )

      const region = screen.getByRole('region')
      expect(region).toBeInTheDocument()
    })

    it('should handle very long myth text', () => {
      const longMyth = 'A'.repeat(200)
      const itemWithLongMyth: MythItem = {
        ...mockMythItem,
        sv: { myth: longMyth, truth: 'Truth' },
      }

      render(
        <MythCard
          item={itemWithLongMyth}
          locale="sv"
          mythLabel="MYT"
          truthLabel="SANNING"
        />
      )

      expect(screen.getByText(longMyth)).toBeInTheDocument()
    })

    it('should handle very long truth text', () => {
      const longTruth = 'B'.repeat(500)
      const itemWithLongTruth: MythItem = {
        ...mockMythItem,
        sv: { myth: 'Myth', truth: longTruth },
      }

      render(
        <MythCard
          item={itemWithLongTruth}
          locale="sv"
          isOpen={true}
          mythLabel="MYT"
          truthLabel="SANNING"
        />
      )

      expect(screen.getByText(longTruth)).toBeInTheDocument()
    })
  })

  describe('real-world usage', () => {
    it('should work with actual myth data', () => {
      const realMyth: MythItem = {
        id: 'myth-1',
        sv: {
          myth: 'Tandreglering är bara för barn och ungdomar',
          truth: 'Tandreglering kan göras i alla åldrar. Moderna aligners är populära bland vuxna tack vare att de är nästan osynliga.',
        },
        en: {
          myth: 'Orthodontics is only for children and teenagers',
          truth: 'Orthodontic treatment can be done at any age. Modern aligners are popular among adults because they are nearly invisible.',
        },
      }

      render(
        <MythCard
          item={realMyth}
          locale="sv"
          isOpen={true}
          mythLabel="MYT"
          truthLabel="SANNING"
        />
      )

      expect(screen.getByText('Tandreglering är bara för barn och ungdomar')).toBeInTheDocument()
      expect(screen.getByText(/Tandreglering kan göras i alla åldrar/)).toBeInTheDocument()
    })
  })
})
