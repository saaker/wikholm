import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AlignerCard } from './AlignerCard'
import type { AlignerItem } from '@/lib/sectionsDefaults'

describe('AlignerCard', () => {
  const mockAligner: AlignerItem = {
    id: '1',
    icon: 'heart',
    sv: {
      title: 'Svenskt rubrik',
      desc: 'Svensk beskrivning',
    },
    en: {
      title: 'English title',
      desc: 'English description',
    },
  }

  describe('rendering', () => {
    it('should render Swedish content when locale is sv', () => {
      render(<AlignerCard item={mockAligner} locale="sv" />)

      expect(screen.getByText('Svenskt rubrik')).toBeInTheDocument()
      expect(screen.getByText('Svensk beskrivning')).toBeInTheDocument()
    })

    it('should render English content when locale is en', () => {
      render(<AlignerCard item={mockAligner} locale="en" />)

      expect(screen.getByText('English title')).toBeInTheDocument()
      expect(screen.getByText('English description')).toBeInTheDocument()
    })

    it('should render icon container', () => {
      const { container } = render(<AlignerCard item={mockAligner} locale="sv" />)

      const iconContainer = container.querySelector('.w-12.h-12.rounded-xl.bg-primary-light')
      expect(iconContainer).toBeInTheDocument()
    })

    it('should render with default className', () => {
      const { container } = render(<AlignerCard item={mockAligner} locale="sv" />)

      const card = container.querySelector('.bg-surface.rounded-2xl')
      expect(card).toBeInTheDocument()
    })

    it('should render with custom className', () => {
      const { container } = render(
        <AlignerCard item={mockAligner} locale="sv" className="custom-class" />
      )

      const card = container.querySelector('.custom-class')
      expect(card).toBeInTheDocument()
    })

    it('should render with shadow styles', () => {
      const { container } = render(<AlignerCard item={mockAligner} locale="sv" />)

      const card = container.querySelector('.shadow-sm.hover\\:shadow-md')
      expect(card).toBeInTheDocument()
    })

    it('should render with border styles', () => {
      const { container } = render(<AlignerCard item={mockAligner} locale="sv" />)

      const card = container.querySelector('.border.border-border\\/50')
      expect(card).toBeInTheDocument()
    })
  })

  describe('layout', () => {
    it('should use flex layout with gap', () => {
      const { container } = render(<AlignerCard item={mockAligner} locale="sv" />)

      const innerContainer = container.querySelector('.flex.gap-5')
      expect(innerContainer).toBeInTheDocument()
    })

    it('should render icon container as shrink-0', () => {
      const { container } = render(<AlignerCard item={mockAligner} locale="sv" />)

      const iconContainer = container.querySelector('.shrink-0')
      expect(iconContainer).toBeInTheDocument()
    })

    it('should render content container with min-w-0', () => {
      const { container } = render(<AlignerCard item={mockAligner} locale="sv" />)

      const contentContainer = container.querySelector('.min-w-0')
      expect(contentContainer).toBeInTheDocument()
    })
  })

  describe('typography', () => {
    it('should render title with proper styling', () => {
      render(<AlignerCard item={mockAligner} locale="sv" />)

      const title = screen.getByText('Svenskt rubrik')
      expect(title.tagName).toBe('H3')
      expect(title).toHaveClass('text-lg')
      expect(title).toHaveClass('font-semibold')
      expect(title).toHaveClass('text-foreground')
    })

    it('should render description with proper styling', () => {
      render(<AlignerCard item={mockAligner} locale="sv" />)

      const desc = screen.getByText('Svensk beskrivning')
      expect(desc.tagName).toBe('P')
      expect(desc).toHaveClass('text-sm')
      expect(desc).toHaveClass('text-muted-dark')
    })
  })

  describe('different icons', () => {
    it('should render with star icon', () => {
      const alignerWithStar: AlignerItem = {
        ...mockAligner,
        icon: 'star',
      }

      const { container } = render(<AlignerCard item={alignerWithStar} locale="sv" />)
      const iconContainer = container.querySelector('.bg-primary-light')
      expect(iconContainer).toBeInTheDocument()
    })

    it('should render with check icon', () => {
      const alignerWithCheck: AlignerItem = {
        ...mockAligner,
        icon: 'check',
      }

      const { container } = render(<AlignerCard item={alignerWithCheck} locale="sv" />)
      const iconContainer = container.querySelector('.bg-primary-light')
      expect(iconContainer).toBeInTheDocument()
    })
  })

  describe('content variations', () => {
    it('should render empty title', () => {
      const alignerWithEmptyTitle: AlignerItem = {
        ...mockAligner,
        sv: { title: '', desc: 'Beskrivning' },
      }

      render(<AlignerCard item={alignerWithEmptyTitle} locale="sv" />)
      expect(screen.getByText('Beskrivning')).toBeInTheDocument()
    })

    it('should render empty description', () => {
      const alignerWithEmptyDesc: AlignerItem = {
        ...mockAligner,
        sv: { title: 'Rubrik', desc: '' },
      }

      render(<AlignerCard item={alignerWithEmptyDesc} locale="sv" />)
      expect(screen.getByText('Rubrik')).toBeInTheDocument()
    })

    it('should render long title without breaking layout', () => {
      const alignerWithLongTitle: AlignerItem = {
        ...mockAligner,
        sv: {
          title: 'Detta är en mycket lång rubrik som borde hålla sig inom sin container',
          desc: 'Beskrivning',
        },
      }

      render(<AlignerCard item={alignerWithLongTitle} locale="sv" />)
      expect(
        screen.getByText(
          'Detta är en mycket lång rubrik som borde hålla sig inom sin container'
        )
      ).toBeInTheDocument()
    })

    it('should render long description without breaking layout', () => {
      const alignerWithLongDesc: AlignerItem = {
        ...mockAligner,
        sv: {
          title: 'Rubrik',
          desc: 'Detta är en mycket lång beskrivning som innehåller väldigt mycket text och borde hålla sig inom sin container även om den är väldigt lång och tar upp flera rader.',
        },
      }

      render(<AlignerCard item={alignerWithLongDesc} locale="sv" />)
      expect(screen.getByText(/Detta är en mycket lång beskrivning/)).toBeInTheDocument()
    })
  })

  describe('hidden property', () => {
    it('should render card even when hidden is true', () => {
      const hiddenAligner: AlignerItem = {
        ...mockAligner,
        hidden: true,
      }

      render(<AlignerCard item={hiddenAligner} locale="sv" />)
      expect(screen.getByText('Svenskt rubrik')).toBeInTheDocument()
    })

    it('should render card when hidden is false', () => {
      const visibleAligner: AlignerItem = {
        ...mockAligner,
        hidden: false,
      }

      render(<AlignerCard item={visibleAligner} locale="sv" />)
      expect(screen.getByText('Svenskt rubrik')).toBeInTheDocument()
    })

    it('should render card when hidden is undefined', () => {
      const alignerNoHidden: AlignerItem = {
        id: '1',
        icon: 'heart',
        sv: { title: 'Rubrik', desc: 'Beskrivning' },
        en: { title: 'Title', desc: 'Description' },
      }

      render(<AlignerCard item={alignerNoHidden} locale="sv" />)
      expect(screen.getByText('Rubrik')).toBeInTheDocument()
    })
  })

  describe('locale switching', () => {
    it('should switch from Swedish to English', () => {
      const { rerender } = render(<AlignerCard item={mockAligner} locale="sv" />)

      expect(screen.getByText('Svenskt rubrik')).toBeInTheDocument()

      rerender(<AlignerCard item={mockAligner} locale="en" />)

      expect(screen.getByText('English title')).toBeInTheDocument()
      expect(screen.queryByText('Svenskt rubrik')).not.toBeInTheDocument()
    })

    it('should switch from English to Swedish', () => {
      const { rerender } = render(<AlignerCard item={mockAligner} locale="en" />)

      expect(screen.getByText('English title')).toBeInTheDocument()

      rerender(<AlignerCard item={mockAligner} locale="sv" />)

      expect(screen.getByText('Svenskt rubrik')).toBeInTheDocument()
      expect(screen.queryByText('English title')).not.toBeInTheDocument()
    })
  })

  describe('accessibility', () => {
    it('should render semantic HTML with h3 heading', () => {
      render(<AlignerCard item={mockAligner} locale="sv" />)

      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Svenskt rubrik')
    })

    it('should have proper text contrast classes', () => {
      render(<AlignerCard item={mockAligner} locale="sv" />)

      const title = screen.getByText('Svenskt rubrik')
      expect(title).toHaveClass('text-foreground')

      const desc = screen.getByText('Svensk beskrivning')
      expect(desc).toHaveClass('text-muted-dark')
    })
  })

  describe('animation support', () => {
    it('should support animation className', () => {
      const { container } = render(
        <AlignerCard
          item={mockAligner}
          locale="sv"
          className="animate-fade-up delay-1 visible"
        />
      )

      const card = container.querySelector('.animate-fade-up.delay-1.visible')
      expect(card).toBeInTheDocument()
    })
  })
})
