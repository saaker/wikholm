import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import DentalMonitoring from './DentalMonitoring'
import { useI18n } from '../../providers/I18nProvider'
import { useSections } from '../../providers/SectionsProvider'
import type { DMItem } from '@/lib/sectionsDefaults'

vi.mock('../../providers/I18nProvider')
vi.mock('../../providers/SectionsProvider')
vi.mock('../../hooks/useAnimateIn', () => ({
  useAnimateIn: () => ({ ref: { current: null }, visible: true }),
}))
vi.mock('../DMCard/DMCard', () => ({
  DMCard: ({ item }: { item: DMItem }) => (
    <div data-testid="dm-card">{item.sv.title}</div>
  ),
}))
vi.mock('./DMSectionHeader', () => ({
  DMSectionHeader: () => <div data-testid="dm-header">Header</div>,
}))

describe('DentalMonitoring', () => {
  const mockT = (key: string) => {
    const translations: Record<string, string> = {
      dmLabel: 'DENTAL MONITORING',
      dmTitle1: 'Smart',
      dmTitle2: 'Monitoring',
      dmIntro: 'Track your progress',
    }
    return translations[key] || key
  }

  beforeEach(() => {
    vi.mocked(useI18n).mockReturnValue({
      t: mockT,
      locale: 'sv',
      setLocale: vi.fn(),
    })
  })

  describe('filtering', () => {
    it('should filter out hidden items', () => {
      const dmItemsWithHidden: DMItem[] = [
        {
          id: '1',
          icon: 'camera',
          sv: { title: 'Visible Item', desc: 'Visible description' },
          en: { title: 'Visible Item', desc: 'Visible description' },
        },
        {
          id: '2',
          icon: 'shield',
          hidden: true,
          sv: { title: 'Hidden Item', desc: 'Hidden description' },
          en: { title: 'Hidden Item', desc: 'Hidden description' },
        },
        {
          id: '3',
          icon: 'clock',
          sv: { title: 'Another Visible', desc: 'Another description' },
          en: { title: 'Another Visible', desc: 'Another description' },
        },
      ]

      vi.mocked(useSections).mockReturnValue({
        sections: {
          services: [],
          aligners: [],
          advantages: [],
          process: [],
          dm: dmItemsWithHidden,
          faq: [],
          myths: [],
          news: [],
          beforeAfter: [],
        },
        setSections: vi.fn(),
      })

      render(<DentalMonitoring />)

      expect(screen.getByText('Visible Item')).toBeInTheDocument()
      expect(screen.getByText('Another Visible')).toBeInTheDocument()
      expect(screen.queryByText('Hidden Item')).not.toBeInTheDocument()
    })

    it('should render all items when none are hidden', () => {
      const dmItems: DMItem[] = [
        {
          id: '1',
          icon: 'camera',
          sv: { title: 'Item 1', desc: 'Description 1' },
          en: { title: 'Item 1', desc: 'Description 1' },
        },
        {
          id: '2',
          icon: 'shield',
          sv: { title: 'Item 2', desc: 'Description 2' },
          en: { title: 'Item 2', desc: 'Description 2' },
        },
      ]

      vi.mocked(useSections).mockReturnValue({
        sections: {
          services: [],
          aligners: [],
          advantages: [],
          process: [],
          dm: dmItems,
          faq: [],
          myths: [],
          news: [],
          beforeAfter: [],
        },
        setSections: vi.fn(),
      })

      render(<DentalMonitoring />)

      expect(screen.getByText('Item 1')).toBeInTheDocument()
      expect(screen.getByText('Item 2')).toBeInTheDocument()
    })

    it('should render no items when all are hidden', () => {
      const dmItemsAllHidden: DMItem[] = [
        {
          id: '1',
          icon: 'camera',
          hidden: true,
          sv: { title: 'Hidden 1', desc: 'Description 1' },
          en: { title: 'Hidden 1', desc: 'Description 1' },
        },
        {
          id: '2',
          icon: 'shield',
          hidden: true,
          sv: { title: 'Hidden 2', desc: 'Description 2' },
          en: { title: 'Hidden 2', desc: 'Description 2' },
        },
      ]

      vi.mocked(useSections).mockReturnValue({
        sections: {
          services: [],
          aligners: [],
          advantages: [],
          process: [],
          dm: dmItemsAllHidden,
          faq: [],
          myths: [],
          news: [],
          beforeAfter: [],
        },
        setSections: vi.fn(),
      })

      render(<DentalMonitoring />)

      expect(screen.queryByText('Hidden 1')).not.toBeInTheDocument()
      expect(screen.queryByText('Hidden 2')).not.toBeInTheDocument()
    })
  })
})
