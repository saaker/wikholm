import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProcessCard } from './ProcessCard'
import type { ProcessItem } from '@/lib/sectionsDefaults'

describe('ProcessCard', () => {
  const mockProcessStep: ProcessItem = {
    id: '1',
    sv: {
      title: 'Konsultation',
      desc: 'Vi undersöker dina tänder och gör en plan för din behandling.',
    },
    en: {
      title: 'Consultation',
      desc: 'We examine your teeth and create a plan for your treatment.',
    },
  }

  describe('rendering', () => {
    it('should render step in Swedish', () => {
      render(
        <ProcessCard
          step={mockProcessStep}
          locale="sv"
          number="01"
        />
      )

      expect(screen.getByText('Konsultation')).toBeInTheDocument()
      expect(screen.getByText(/Vi undersöker dina tänder/)).toBeInTheDocument()
    })

    it('should render step in English', () => {
      render(
        <ProcessCard
          step={mockProcessStep}
          locale="en"
          number="01"
        />
      )

      expect(screen.getByText('Consultation')).toBeInTheDocument()
      expect(screen.getByText(/We examine your teeth/)).toBeInTheDocument()
    })

    it('should use default locale sv', () => {
      render(
        <ProcessCard
          step={mockProcessStep}
          number="01"
        />
      )

      expect(screen.getByText('Konsultation')).toBeInTheDocument()
    })

    it('should render step number', () => {
      render(
        <ProcessCard
          step={mockProcessStep}
          locale="sv"
          number="01"
        />
      )

      expect(screen.getByText('01')).toBeInTheDocument()
    })

    it('should render multi-digit numbers', () => {
      render(
        <ProcessCard
          step={mockProcessStep}
          locale="sv"
          number="12"
        />
      )

      expect(screen.getByText('12')).toBeInTheDocument()
    })
  })

  describe('styling', () => {
    it('should apply custom className', () => {
      const { container } = render(
        <ProcessCard
          step={mockProcessStep}
          locale="sv"
          number="01"
          className="custom-class"
        />
      )

      expect(container.firstChild).toHaveClass('custom-class')
    })

    it('should have relative positioning', () => {
      const { container } = render(
        <ProcessCard
          step={mockProcessStep}
          locale="sv"
          number="01"
        />
      )

      expect(container.firstChild).toHaveClass('relative')
    })

    it('should render number with primary color and opacity', () => {
      const { container } = render(
        <ProcessCard
          step={mockProcessStep}
          locale="sv"
          number="01"
        />
      )

      const numberElement = screen.getByText('01')
      expect(numberElement).toHaveStyle({
        color: 'var(--color-primary)',
        opacity: 0.8,
      })
    })

    it('should render number with large serif font', () => {
      render(
        <ProcessCard
          step={mockProcessStep}
          locale="sv"
          number="01"
        />
      )

      const numberElement = screen.getByText('01')
      expect(numberElement).toHaveClass('text-5xl', 'font-serif', 'font-bold')
    })

    it('should render title with correct styling', () => {
      render(
        <ProcessCard
          step={mockProcessStep}
          locale="sv"
          number="01"
        />
      )

      const titleElement = screen.getByText('Konsultation')
      expect(titleElement.tagName).toBe('H3')
      expect(titleElement).toHaveClass('text-lg', 'font-semibold', 'font-sans')
    })

    it('should render description with muted color', () => {
      render(
        <ProcessCard
          step={mockProcessStep}
          locale="sv"
          number="01"
        />
      )

      const descElement = screen.getByText(/Vi undersöker dina tänder/)
      expect(descElement).toHaveClass('text-muted-dark')
    })
  })

  describe('content structure', () => {
    it('should render all parts in correct order', () => {
      const { container } = render(
        <ProcessCard
          step={mockProcessStep}
          locale="sv"
          number="01"
        />
      )

      const elements = container.querySelectorAll('*')
      const texts = Array.from(elements).map(el => el.textContent)
      const fullText = texts.join('')

      expect(fullText).toMatch(/01.*Konsultation.*Vi undersöker/)
    })

    it('should have nested z-index structure', () => {
      const { container } = render(
        <ProcessCard
          step={mockProcessStep}
          locale="sv"
          number="01"
        />
      )

      const innerDiv = container.querySelector('.relative.z-10')
      expect(innerDiv).toBeInTheDocument()
    })
  })

  describe('edge cases', () => {
    it('should handle empty title', () => {
      const emptyStep: ProcessItem = {
        id: '1',
        sv: { title: '', desc: 'Description' },
        en: { title: '', desc: 'Description' },
      }

      render(
        <ProcessCard
          step={emptyStep}
          locale="sv"
          number="01"
        />
      )

      expect(screen.getByText('Description')).toBeInTheDocument()
    })

    it('should handle empty description', () => {
      const emptyStep: ProcessItem = {
        id: '1',
        sv: { title: 'Title', desc: '' },
        en: { title: 'Title', desc: '' },
      }

      const { container } = render(
        <ProcessCard
          step={emptyStep}
          locale="sv"
          number="01"
        />
      )

      const descElement = container.querySelector('p')
      expect(descElement).toHaveTextContent('')
    })

    it('should handle long descriptions', () => {
      const longStep: ProcessItem = {
        id: '1',
        sv: {
          title: 'Title',
          desc: 'This is a very long description that contains a lot of text and might wrap to multiple lines depending on the container width and viewport size.',
        },
        en: {
          title: 'Title',
          desc: 'Long English description',
        },
      }

      render(
        <ProcessCard
          step={longStep}
          locale="sv"
          number="01"
        />
      )

      expect(screen.getByText(/This is a very long description/)).toBeInTheDocument()
    })

    it('should handle numbers without leading zeros', () => {
      render(
        <ProcessCard
          step={mockProcessStep}
          locale="sv"
          number="1"
        />
      )

      expect(screen.getByText('1')).toBeInTheDocument()
    })

    it('should handle special characters in text', () => {
      const specialStep: ProcessItem = {
        id: '1',
        sv: {
          title: 'Title & "Quotes"',
          desc: 'Description with <html> & special chars'
        },
        en: {
          title: 'Title & "Quotes"',
          desc: 'Description with <html> & special chars'
        },
      }

      render(
        <ProcessCard
          step={specialStep}
          locale="sv"
          number="01"
        />
      )

      expect(screen.getByText('Title & "Quotes"')).toBeInTheDocument()
      expect(screen.getByText(/Description with <html> & special chars/)).toBeInTheDocument()
    })
  })

  describe('real-world usage', () => {
    it('should render in a grid layout', () => {
      const { container } = render(
        <div className="grid grid-cols-4 gap-8">
          <ProcessCard step={mockProcessStep} locale="sv" number="01" />
          <ProcessCard step={mockProcessStep} locale="sv" number="02" />
          <ProcessCard step={mockProcessStep} locale="sv" number="03" />
          <ProcessCard step={mockProcessStep} locale="sv" number="04" />
        </div>
      )

      const gridContainer = container.querySelector('.grid')
      expect(gridContainer?.children).toHaveLength(4)
    })

    it('should support animation classes', () => {
      const { container } = render(
        <ProcessCard
          step={mockProcessStep}
          locale="sv"
          number="01"
          className="animate-fade-up delay-1 visible"
        />
      )

      expect(container.firstChild).toHaveClass('animate-fade-up', 'delay-1', 'visible')
    })

    it('should work with different locales in same render', () => {
      const { container } = render(
        <div>
          <ProcessCard step={mockProcessStep} locale="sv" number="01" />
          <ProcessCard step={mockProcessStep} locale="en" number="02" />
        </div>
      )

      expect(screen.getByText('Konsultation')).toBeInTheDocument()
      expect(screen.getByText('Consultation')).toBeInTheDocument()
    })
  })
})
