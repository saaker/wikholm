import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FAQCard } from './FAQCard'
import type { FAQItem } from '@/lib/sectionsDefaults'

describe('FAQCard', () => {
  const mockFAQItem: FAQItem = {
    id: '1',
    sv: {
      question: 'Hur lång tid tar behandlingen?',
      answer: 'Behandlingstiden varierar mellan 6-18 månader beroende på dina specifika behov.',
    },
    en: {
      question: 'How long does the treatment take?',
      answer: 'Treatment time varies between 6-18 months depending on your specific needs.',
    },
  }

  describe('rendering', () => {
    it('should render question in Swedish', () => {
      render(<FAQCard item={mockFAQItem} locale="sv" />)

      expect(screen.getByText('Hur lång tid tar behandlingen?')).toBeInTheDocument()
    })

    it('should render question in English', () => {
      render(<FAQCard item={mockFAQItem} locale="en" />)

      expect(screen.getByText('How long does the treatment take?')).toBeInTheDocument()
    })

    it('should render answer when open', () => {
      render(<FAQCard item={mockFAQItem} locale="sv" isOpen={true} />)

      expect(screen.getByText(/Behandlingstiden varierar mellan 6-18 månader/)).toBeInTheDocument()
    })

    it('should use default locale sv', () => {
      render(<FAQCard item={mockFAQItem} />)

      expect(screen.getByText('Hur lång tid tar behandlingen?')).toBeInTheDocument()
    })
  })

  describe('accordion functionality', () => {
    it('should show chevron icon', () => {
      const { container } = render(<FAQCard item={mockFAQItem} />)

      const chevron = container.querySelector('svg')
      expect(chevron).toBeInTheDocument()
    })

    it('should rotate chevron when open', () => {
      const { container } = render(<FAQCard item={mockFAQItem} isOpen={true} />)

      const chevron = container.querySelector('svg')
      expect(chevron).toHaveClass('rotate-180')
    })

    it('should not rotate chevron when closed', () => {
      const { container } = render(<FAQCard item={mockFAQItem} isOpen={false} />)

      const chevron = container.querySelector('svg')
      expect(chevron).not.toHaveClass('rotate-180')
    })

    it('should have aria-expanded=true when open', () => {
      render(<FAQCard item={mockFAQItem} isOpen={true} />)

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-expanded', 'true')
    })

    it('should have aria-expanded=false when closed', () => {
      render(<FAQCard item={mockFAQItem} isOpen={false} />)

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-expanded', 'false')
    })
  })

  describe('interactivity', () => {
    it('should call onToggle when clicked', async () => {
      const handleToggle = vi.fn()
      const user = userEvent.setup()

      render(<FAQCard item={mockFAQItem} onToggle={handleToggle} />)

      const button = screen.getByRole('button')
      await user.click(button)

      expect(handleToggle).toHaveBeenCalledTimes(1)
    })

    it('should work without onToggle handler', async () => {
      const user = userEvent.setup()

      render(<FAQCard item={mockFAQItem} />)

      const button = screen.getByRole('button')
      await user.click(button)

      // Should not throw error
      expect(button).toBeInTheDocument()
    })
  })

  describe('accessibility', () => {
    it('should have button role', () => {
      render(<FAQCard item={mockFAQItem} />)

      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should have aria-controls pointing to answer', () => {
      render(<FAQCard item={mockFAQItem} />)

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-controls', 'faq-answer-1')
    })

    it('should have region role for answer panel', () => {
      render(<FAQCard item={mockFAQItem} />)

      const region = screen.getByRole('region')
      expect(region).toBeInTheDocument()
      expect(region).toHaveAttribute('id', 'faq-answer-1')
    })

    it('should hide chevron from screen readers', () => {
      const { container } = render(<FAQCard item={mockFAQItem} />)

      const chevron = container.querySelector('svg')
      expect(chevron).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('styling', () => {
    it('should apply custom className', () => {
      const { container } = render(<FAQCard item={mockFAQItem} className="custom-class" />)

      const card = container.firstChild
      expect(card).toHaveClass('custom-class')
    })

    it('should have border and shadow', () => {
      const { container } = render(<FAQCard item={mockFAQItem} />)

      const card = container.firstChild
      expect(card).toHaveClass('border')
      expect(card).toHaveClass('shadow-sm')
    })

    it('should have rounded corners', () => {
      const { container } = render(<FAQCard item={mockFAQItem} />)

      const card = container.firstChild
      expect(card).toHaveClass('rounded-xl')
    })

    it('should apply grid animation classes when open', () => {
      const { container } = render(<FAQCard item={mockFAQItem} isOpen={true} />)

      const answerPanel = container.querySelector('#faq-answer-1')
      expect(answerPanel).toHaveClass('grid-rows-[1fr]')
      expect(answerPanel).toHaveClass('opacity-100')
    })

    it('should apply collapsed grid classes when closed', () => {
      const { container } = render(<FAQCard item={mockFAQItem} isOpen={false} />)

      const answerPanel = container.querySelector('#faq-answer-1')
      expect(answerPanel).toHaveClass('grid-rows-[0fr]')
      expect(answerPanel).toHaveClass('opacity-0')
    })
  })

  describe('edge cases', () => {
    it('should handle empty question', () => {
      const itemWithEmptyQuestion: FAQItem = {
        ...mockFAQItem,
        sv: { question: '', answer: 'Answer' },
      }

      render(<FAQCard item={itemWithEmptyQuestion} locale="sv" />)

      expect(screen.getByRole('button')).toHaveTextContent('—')
    })

    it('should handle empty answer', () => {
      const itemWithEmptyAnswer: FAQItem = {
        ...mockFAQItem,
        sv: { question: 'Question', answer: '' },
      }

      render(<FAQCard item={itemWithEmptyAnswer} locale="sv" isOpen={true} />)

      const region = screen.getByRole('region')
      expect(region).toBeInTheDocument()
    })

    it('should handle very long question text', () => {
      const longQuestion = 'A'.repeat(200)
      const itemWithLongQuestion: FAQItem = {
        ...mockFAQItem,
        sv: { question: longQuestion, answer: 'Answer' },
      }

      render(<FAQCard item={itemWithLongQuestion} locale="sv" />)

      expect(screen.getByText(longQuestion)).toBeInTheDocument()
    })

    it('should handle very long answer text', () => {
      const longAnswer = 'B'.repeat(500)
      const itemWithLongAnswer: FAQItem = {
        ...mockFAQItem,
        sv: { question: 'Question', answer: longAnswer },
      }

      render(<FAQCard item={itemWithLongAnswer} locale="sv" isOpen={true} />)

      expect(screen.getByText(longAnswer)).toBeInTheDocument()
    })
  })

  describe('real-world usage', () => {
    it('should work with actual FAQ data', () => {
      const realFAQ: FAQItem = {
        id: 'faq-1',
        sv: {
          question: 'Gör det ont?',
          answer: 'De flesta patienter upplever ett visst obehag de första dagarna med nya skenor, men detta försvinner snabbt.',
        },
        en: {
          question: 'Does it hurt?',
          answer: 'Most patients experience some discomfort during the first days with new aligners, but this quickly disappears.',
        },
      }

      render(<FAQCard item={realFAQ} locale="sv" isOpen={true} />)

      expect(screen.getByText('Gör det ont?')).toBeInTheDocument()
      expect(screen.getByText(/De flesta patienter upplever/)).toBeInTheDocument()
    })
  })
})
