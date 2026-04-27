import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { renderPreview } from './renderPreview'

type Locale = 'sv' | 'en'

// Mock all the preview components
vi.mock('../../ServiceCard/ServiceCardPreview', () => ({
  ServiceCardPreview: ({ locale }: { item: unknown; locale: Locale }) => (
    <div data-testid="service-preview">Service-{locale}</div>
  ),
}))

vi.mock('../../../components/for-patients/AlignerCard/AlignerCard', () => ({
  AlignerCard: ({ locale }: { item: unknown; locale: Locale }) => (
    <div data-testid="aligner-preview">Aligner-{locale}</div>
  ),
}))

vi.mock('../../../components/for-dentists/AdvantageCard/AdvantageCard', () => ({
  AdvantageCard: ({ locale }: { item: unknown; locale: Locale; preview?: boolean }) => (
    <div data-testid="advantage-preview">Advantage-{locale}</div>
  ),
}))

vi.mock('../../../components/for-patients/ProcessCard/ProcessCard', () => ({
  ProcessCard: ({ locale, number }: { step: unknown; locale: Locale; number: string }) => (
    <div data-testid="process-preview">Process-{locale}-{number}</div>
  ),
}))

vi.mock('../../../components/for-patients/DMCard/DMCard', () => ({
  DMCard: ({ locale }: { item: unknown; locale: Locale; preview?: boolean }) => (
    <div data-testid="dm-preview">DM-{locale}</div>
  ),
}))

vi.mock('../../../components/for-patients/FAQ/FAQCard', () => ({
  FAQCard: ({ locale, isOpen }: { item: unknown; locale: Locale; isOpen: boolean }) => (
    <div data-testid="faq-preview">FAQ-{locale}-{isOpen ? 'open' : 'closed'}</div>
  ),
}))

vi.mock('../../../components/for-patients/MythsTruths/MythCard', () => ({
  MythCard: ({ locale, isOpen, mythLabel, truthLabel }: { item: unknown; locale: Locale; isOpen: boolean; mythLabel: string; truthLabel: string }) => (
    <div data-testid="myth-preview">
      Myth-{locale}-{isOpen ? 'open' : 'closed'}-{mythLabel}-{truthLabel}
    </div>
  ),
}))

vi.mock('../../../components/for-dentists/News/NewsCard', () => ({
  NewsCard: ({ locale }: { article: unknown; locale: Locale }) => (
    <div data-testid="news-preview">News-{locale}</div>
  ),
}))

vi.mock('../../../components/for-patients/BeforeAfterCard/BeforeAfterCard', () => ({
  BeforeAfterCard: ({ beforeLabel, afterLabel }: { item: unknown; beforeLabel: string; afterLabel: string; preview?: boolean }) => (
    <div data-testid="before-after-preview">BeforeAfter-{beforeLabel}-{afterLabel}</div>
  ),
}))

describe('renderPreview', () => {
  const mockItem = { id: 'test-1', sv: { title: 'Test' } }

  describe('routing to correct preview component', () => {
    it('should render ServiceCardPreview for services key', () => {
      const result = renderPreview('services', mockItem, 0, 'sv')
      render(<>{result}</>)
      expect(screen.getByTestId('service-preview')).toHaveTextContent('Service-sv')
    })

    it('should render AlignerCard for aligners key', () => {
      const result = renderPreview('aligners', mockItem, 0, 'sv')
      render(<>{result}</>)
      expect(screen.getByTestId('aligner-preview')).toHaveTextContent('Aligner-sv')
    })

    it('should render AdvantageCardPreview for advantages key', () => {
      const result = renderPreview('advantages', mockItem, 0, 'sv')
      render(<>{result}</>)
      expect(screen.getByTestId('advantage-preview')).toHaveTextContent('Advantage-sv')
    })

    it('should render ProcessCard for process key with calculated number', () => {
      const result = renderPreview('process', mockItem, 2, 'sv')
      render(<>{result}</>)
      expect(screen.getByTestId('process-preview')).toHaveTextContent('Process-sv-03')
    })

    it('should render DMCard for dm key', () => {
      const result = renderPreview('dm', mockItem, 0, 'sv')
      render(<>{result}</>)
      expect(screen.getByTestId('dm-preview')).toHaveTextContent('DM-sv')
    })

    it('should render FAQCard for faq key with isOpen=true', () => {
      const result = renderPreview('faq', mockItem, 0, 'sv')
      render(<>{result}</>)
      expect(screen.getByTestId('faq-preview')).toHaveTextContent('FAQ-sv-open')
    })

    it('should render MythCard for myths key with isOpen=true', () => {
      const result = renderPreview('myths', mockItem, 0, 'sv')
      render(<>{result}</>)
      expect(screen.getByTestId('myth-preview')).toHaveTextContent('Myth-sv-open-MYT-SANNING')
    })

    it('should render NewsCard for news key', () => {
      const result = renderPreview('news', mockItem, 0, 'sv')
      render(<>{result}</>)
      expect(screen.getByTestId('news-preview')).toHaveTextContent('News-sv')
    })

    it('should render BeforeAfterCardPreview for beforeAfter key', () => {
      const result = renderPreview('beforeAfter', mockItem, 0, 'sv')
      render(<>{result}</>)
      expect(screen.getByTestId('before-after-preview')).toHaveTextContent('BeforeAfter')
    })

    it('should return null for unknown key', () => {
      const result = renderPreview('unknown', mockItem, 0, 'sv')
      expect(result).toBeNull()
    })
  })

  describe('locale handling', () => {
    it('should pass Swedish locale to components', () => {
      const result = renderPreview('aligners', mockItem, 0, 'sv')
      render(<>{result}</>)
      expect(screen.getByTestId('aligner-preview')).toHaveTextContent('Aligner-sv')
    })

    it('should pass English locale to components', () => {
      const result = renderPreview('aligners', mockItem, 0, 'en')
      render(<>{result}</>)
      expect(screen.getByTestId('aligner-preview')).toHaveTextContent('Aligner-en')
    })
  })

  describe('special case: process number calculation', () => {
    it('should calculate number correctly for first item (i=0)', () => {
      const result = renderPreview('process', mockItem, 0, 'sv')
      render(<>{result}</>)
      expect(screen.getByTestId('process-preview')).toHaveTextContent('Process-sv-01')
    })

    it('should calculate number correctly for middle item (i=5)', () => {
      const result = renderPreview('process', mockItem, 5, 'sv')
      render(<>{result}</>)
      expect(screen.getByTestId('process-preview')).toHaveTextContent('Process-sv-06')
    })

    it('should pad single digit numbers with zero', () => {
      const result = renderPreview('process', mockItem, 8, 'sv')
      render(<>{result}</>)
      expect(screen.getByTestId('process-preview')).toHaveTextContent('Process-sv-09')
    })

    it('should handle double digit numbers', () => {
      const result = renderPreview('process', mockItem, 12, 'sv')
      render(<>{result}</>)
      expect(screen.getByTestId('process-preview')).toHaveTextContent('Process-sv-13')
    })

    it('should wrap ProcessCard in div with py-3 class', () => {
      const result = renderPreview('process', mockItem, 0, 'sv')
      const { container } = render(<>{result}</>)
      const wrapper = container.querySelector('.py-3')
      expect(wrapper).toBeTruthy()
    })
  })

  describe('special case: myth labels by locale', () => {
    it('should use Swedish labels when locale is sv', () => {
      const result = renderPreview('myths', mockItem, 0, 'sv')
      render(<>{result}</>)
      expect(screen.getByTestId('myth-preview')).toHaveTextContent('MYT')
      expect(screen.getByTestId('myth-preview')).toHaveTextContent('SANNING')
    })

    it('should use English labels when locale is en', () => {
      const result = renderPreview('myths', mockItem, 0, 'en')
      render(<>{result}</>)
      expect(screen.getByTestId('myth-preview')).toHaveTextContent('MYTH')
      expect(screen.getByTestId('myth-preview')).toHaveTextContent('TRUTH')
    })
  })

  describe('special case: isOpen prop', () => {
    it('should pass isOpen=true to FAQCard', () => {
      const result = renderPreview('faq', mockItem, 0, 'sv')
      render(<>{result}</>)
      expect(screen.getByTestId('faq-preview')).toHaveTextContent('open')
    })

    it('should pass isOpen=true to MythCard', () => {
      const result = renderPreview('myths', mockItem, 0, 'sv')
      render(<>{result}</>)
      expect(screen.getByTestId('myth-preview')).toHaveTextContent('open')
    })
  })
})
