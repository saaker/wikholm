import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DMCard } from './DMCard'
import type { DMItem } from '@/lib/sectionsDefaults'

describe('DMCard', () => {
  const mockDMItem: DMItem = {
    id: '1',
    icon: 'camera',
    sv: {
      title: 'Svensk titel',
      desc: 'Svensk beskrivning av funktionen',
    },
    en: {
      title: 'English title',
      desc: 'English description of the feature',
    },
  }

  describe('rendering', () => {
    it('should render Swedish content when locale is sv', () => {
      render(<DMCard item={mockDMItem} locale="sv" />)

      expect(screen.getByText('Svensk titel')).toBeInTheDocument()
      expect(screen.getByText('Svensk beskrivning av funktionen')).toBeInTheDocument()
    })

    it('should render English content when locale is en', () => {
      render(<DMCard item={mockDMItem} locale="en" />)

      expect(screen.getByText('English title')).toBeInTheDocument()
      expect(screen.getByText('English description of the feature')).toBeInTheDocument()
    })

    it('should render icon container with correct styles', () => {
      const { container } = render(<DMCard item={mockDMItem} locale="sv" />)

      const iconContainer = container.querySelector('.w-10.h-10.rounded-full.bg-primary-light')
      expect(iconContainer).toBeInTheDocument()
    })

    it('should render with default className', () => {
      const { container } = render(<DMCard item={mockDMItem} locale="sv" />)

      const card = container.querySelector('.flex.gap-5.items-start')
      expect(card).toBeInTheDocument()
    })

    it('should render with custom className', () => {
      const { container } = render(
        <DMCard item={mockDMItem} locale="sv" className="custom-class" />
      )

      const card = container.querySelector('.custom-class')
      expect(card).toBeInTheDocument()
    })

    it('should render title with correct heading level and styles', () => {
      const { container } = render(<DMCard item={mockDMItem} locale="sv" />)

      const title = container.querySelector('h4.text-\\[1\\.05rem\\].font-semibold')
      expect(title).toBeInTheDocument()
      expect(title?.textContent).toBe('Svensk titel')
    })

    it('should render description with correct styles', () => {
      const { container } = render(<DMCard item={mockDMItem} locale="sv" />)

      const desc = container.querySelector('p.text-\\[0\\.9rem\\].text-muted-dark')
      expect(desc).toBeInTheDocument()
      expect(desc?.textContent).toBe('Svensk beskrivning av funktionen')
    })
  })

  describe('content variations', () => {
    it('should not render title element when title is empty', () => {
      const itemWithEmptyTitle: DMItem = {
        ...mockDMItem,
        sv: { title: '', desc: 'Beskrivning' },
      }

      const { container } = render(<DMCard item={itemWithEmptyTitle} locale="sv" />)
      expect(screen.getByText('Beskrivning')).toBeInTheDocument()
      expect(container.querySelector('h4')).not.toBeInTheDocument()
    })

    it('should not render description element when desc is empty', () => {
      const itemWithEmptyDesc: DMItem = {
        ...mockDMItem,
        sv: { title: 'Titel', desc: '' },
      }

      const { container } = render(<DMCard item={itemWithEmptyDesc} locale="sv" />)
      expect(screen.getByText('Titel')).toBeInTheDocument()
      expect(container.querySelector('p')).not.toBeInTheDocument()
    })

    it('should return null when both title and desc are empty for current locale (non-preview)', () => {
      const itemWithEmptyContent: DMItem = {
        ...mockDMItem,
        sv: { title: '', desc: '' },
      }

      const { container } = render(<DMCard item={itemWithEmptyContent} locale="sv" />)
      expect(container.firstChild).toBeNull()
    })

    it('should return null when both title and desc are whitespace only (non-preview)', () => {
      const itemWithWhitespace: DMItem = {
        ...mockDMItem,
        sv: { title: '   ', desc: '  ' },
      }

      const { container } = render(<DMCard item={itemWithWhitespace} locale="sv" />)
      expect(container.firstChild).toBeNull()
    })

    it('should render icon in preview mode even when both title and desc are empty', () => {
      const itemWithEmptyContent: DMItem = {
        ...mockDMItem,
        sv: { title: '', desc: '' },
      }

      const { container } = render(<DMCard item={itemWithEmptyContent} locale="sv" preview />)

      // Should render the card with icon
      expect(container.querySelector('.flex.gap-5')).toBeInTheDocument()
      expect(container.querySelector('.w-10.h-10.rounded-full')).toBeInTheDocument()

      // But no h4 or p elements
      expect(container.querySelector('h4')).not.toBeInTheDocument()
      expect(container.querySelector('p')).not.toBeInTheDocument()
    })

    it('should render icon in preview mode with whitespace content', () => {
      const itemWithWhitespace: DMItem = {
        ...mockDMItem,
        sv: { title: '   ', desc: '  ' },
      }

      const { container } = render(<DMCard item={itemWithWhitespace} locale="sv" preview />)

      expect(container.querySelector('.w-10.h-10.rounded-full')).toBeInTheDocument()
      expect(container.querySelector('h4')).not.toBeInTheDocument()
      expect(container.querySelector('p')).not.toBeInTheDocument()
    })

    it('should be locale-specific - render sv even if en is empty', () => {
      const itemWithEmptyEnglish: DMItem = {
        ...mockDMItem,
        en: { title: '', desc: '' },
      }

      render(<DMCard item={itemWithEmptyEnglish} locale="sv" />)
      expect(screen.getByText('Svensk titel')).toBeInTheDocument()
      expect(screen.getByText('Svensk beskrivning av funktionen')).toBeInTheDocument()
    })

    it('should be locale-specific - return null for sv if sv is empty, regardless of en content', () => {
      const itemWithEmptySwedish: DMItem = {
        ...mockDMItem,
        sv: { title: '', desc: '' },
      }

      const { container } = render(<DMCard item={itemWithEmptySwedish} locale="sv" />)
      expect(container.firstChild).toBeNull()
    })

    it('should handle long content without breaking layout', () => {
      const itemWithLongContent: DMItem = {
        ...mockDMItem,
        sv: {
          title: 'En mycket lång titel som kanske spänner över flera rader',
          desc: 'En mycket lång beskrivning som innehåller mycket information om funktionen och hur den fungerar i praktiken för användaren',
        },
      }

      const { container } = render(<DMCard item={itemWithLongContent} locale="sv" />)

      const card = container.querySelector('.flex.gap-5.items-start')
      expect(card).toBeInTheDocument()
    })
  })

  describe('icon rendering', () => {
    it('should render different icon types', () => {
      const icons = ['camera', 'heart', 'shield', 'clock']

      icons.forEach(iconName => {
        const item: DMItem = {
          ...mockDMItem,
          icon: iconName,
        }

        const { container } = render(<DMCard item={item} locale="sv" />)
        const iconContainer = container.querySelector('.w-10.h-10.rounded-full')
        expect(iconContainer).toBeInTheDocument()
      })
    })
  })

  describe('layout', () => {
    it('should use flex layout with gap', () => {
      const { container } = render(<DMCard item={mockDMItem} locale="sv" />)

      const card = container.querySelector('.flex.gap-5')
      expect(card).toBeInTheDocument()
    })

    it('should align items at start', () => {
      const { container } = render(<DMCard item={mockDMItem} locale="sv" />)

      const card = container.querySelector('.items-start')
      expect(card).toBeInTheDocument()
    })

    it('should have shrink-0 on icon container to prevent squashing', () => {
      const { container } = render(<DMCard item={mockDMItem} locale="sv" />)

      const iconContainer = container.querySelector('.shrink-0')
      expect(iconContainer).toBeInTheDocument()
    })
  })

  describe('className composition', () => {
    it('should combine default and custom classes correctly', () => {
      const { container } = render(
        <DMCard item={mockDMItem} locale="sv" className="animate-fade-up visible" />
      )

      const card = container.firstChild as HTMLElement
      expect(card.className).toContain('flex')
      expect(card.className).toContain('gap-5')
      expect(card.className).toContain('animate-fade-up')
      expect(card.className).toContain('visible')
    })

    it('should work without className prop', () => {
      const { container } = render(<DMCard item={mockDMItem} locale="sv" />)

      const card = container.firstChild as HTMLElement
      expect(card.className).not.toContain('undefined')
    })
  })
})
