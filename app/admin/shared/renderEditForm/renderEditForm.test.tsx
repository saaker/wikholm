import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { renderEditForm } from './renderEditForm'

type Locale = 'sv' | 'en'
type OnUpdateFn = (index: number, path: string, value: string | boolean) => void

type FormProps = {
  item: unknown
  index: number
  locale: Locale
  onUpdate: OnUpdateFn
}

type ServiceFormProps = FormProps & {
  allItems: Array<Record<string, unknown>>
}

// Mock all the form components
vi.mock('../../ServiceCard/ServiceCardEditForm', () => ({
  ServiceCardEditForm: ({ index, locale }: ServiceFormProps) => (
    <div data-testid="service-form">Service-{index}-{locale}</div>
  ),
}))

vi.mock('../../forms/AlignerCardEditForm', () => ({
  AlignerCardEditForm: ({ index, locale }: FormProps) => (
    <div data-testid="aligner-form">Aligner-{index}-{locale}</div>
  ),
}))

vi.mock('../../AdvantageCard/AdvantageCardEditForm', () => ({
  AdvantageCardEditForm: ({ index, locale }: FormProps) => (
    <div data-testid="advantage-form">Advantage-{index}-{locale}</div>
  ),
}))

vi.mock('../../forms/ProcessCardEditForm', () => ({
  ProcessCardEditForm: ({ index, locale }: FormProps) => (
    <div data-testid="process-form">Process-{index}-{locale}</div>
  ),
}))

vi.mock('../../forms/DMCardEditForm', () => ({
  DMCardEditForm: ({ index, locale }: FormProps) => (
    <div data-testid="dm-form">DM-{index}-{locale}</div>
  ),
}))

vi.mock('../../forms/FAQCardEditForm', () => ({
  FAQCardEditForm: ({ index, locale }: FormProps) => (
    <div data-testid="faq-form">FAQ-{index}-{locale}</div>
  ),
}))

vi.mock('../../forms/MythCardEditForm', () => ({
  MythCardEditForm: ({ index, locale }: FormProps) => (
    <div data-testid="myth-form">Myth-{index}-{locale}</div>
  ),
}))

vi.mock('../../forms/NewsCardEditForm', () => ({
  NewsCardEditForm: ({ index, locale }: FormProps) => (
    <div data-testid="news-form">News-{index}-{locale}</div>
  ),
}))

vi.mock('../../forms/BeforeAfterCardEditForm', () => ({
  BeforeAfterCardEditForm: ({ index, locale }: FormProps) => (
    <div data-testid="before-after-form">BeforeAfter-{index}-{locale}</div>
  ),
}))

describe('renderEditForm', () => {
  const mockOnUpdate = vi.fn()
  const mockItem = { id: 'test-1', sv: { title: 'Test' } }
  const mockAllItems = [mockItem]

  const baseProps = {
    item: mockItem,
    index: 0,
    locale: 'sv' as const,
    onUpdate: mockOnUpdate,
    allItems: mockAllItems,
  }

  describe('routing to correct form component', () => {
    it('should render ServiceCardEditForm for services key', () => {
      const result = renderEditForm({ ...baseProps, sectionKey: 'services' })
      render(<>{result}</>)
      expect(screen.getByTestId('service-form')).toHaveTextContent('Service-0-sv')
    })

    it('should render AlignerCardEditForm for aligners key', () => {
      const result = renderEditForm({ ...baseProps, sectionKey: 'aligners' })
      render(<>{result}</>)
      expect(screen.getByTestId('aligner-form')).toHaveTextContent('Aligner-0-sv')
    })

    it('should render AdvantageCardEditForm for advantages key', () => {
      const result = renderEditForm({ ...baseProps, sectionKey: 'advantages' })
      render(<>{result}</>)
      expect(screen.getByTestId('advantage-form')).toHaveTextContent('Advantage-0-sv')
    })

    it('should render ProcessCardEditForm for process key', () => {
      const result = renderEditForm({ ...baseProps, sectionKey: 'process' })
      render(<>{result}</>)
      expect(screen.getByTestId('process-form')).toHaveTextContent('Process-0-sv')
    })

    it('should render DMCardEditForm for dm key', () => {
      const result = renderEditForm({ ...baseProps, sectionKey: 'dm' })
      render(<>{result}</>)
      expect(screen.getByTestId('dm-form')).toHaveTextContent('DM-0-sv')
    })

    it('should render FAQCardEditForm for faq key', () => {
      const result = renderEditForm({ ...baseProps, sectionKey: 'faq' })
      render(<>{result}</>)
      expect(screen.getByTestId('faq-form')).toHaveTextContent('FAQ-0-sv')
    })

    it('should render MythCardEditForm for myths key', () => {
      const result = renderEditForm({ ...baseProps, sectionKey: 'myths' })
      render(<>{result}</>)
      expect(screen.getByTestId('myth-form')).toHaveTextContent('Myth-0-sv')
    })

    it('should render NewsCardEditForm for news key', () => {
      const result = renderEditForm({ ...baseProps, sectionKey: 'news' })
      render(<>{result}</>)
      expect(screen.getByTestId('news-form')).toHaveTextContent('News-0-sv')
    })

    it('should render BeforeAfterCardEditForm for beforeAfter key', () => {
      const result = renderEditForm({ ...baseProps, sectionKey: 'beforeAfter' })
      render(<>{result}</>)
      expect(screen.getByTestId('before-after-form')).toHaveTextContent('BeforeAfter-0-sv')
    })

    it('should return null for unknown section key', () => {
      const result = renderEditForm({ ...baseProps, sectionKey: 'unknown' })
      expect(result).toBeNull()
    })
  })

  describe('locale handling', () => {
    it('should pass correct locale to forms (Swedish)', () => {
      const result = renderEditForm({ ...baseProps, sectionKey: 'aligners', locale: 'sv' })
      render(<>{result}</>)
      expect(screen.getByTestId('aligner-form')).toHaveTextContent('Aligner-0-sv')
    })

    it('should pass correct locale to forms (English)', () => {
      const result = renderEditForm({ ...baseProps, sectionKey: 'aligners', locale: 'en' })
      render(<>{result}</>)
      expect(screen.getByTestId('aligner-form')).toHaveTextContent('Aligner-0-en')
    })
  })

  describe('index handling', () => {
    it('should pass correct index to forms', () => {
      const result = renderEditForm({ ...baseProps, sectionKey: 'process', index: 5 })
      render(<>{result}</>)
      expect(screen.getByTestId('process-form')).toHaveTextContent('Process-5-sv')
    })
  })
})
