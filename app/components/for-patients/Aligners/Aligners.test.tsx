import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Aligners from './Aligners'
import { useI18n } from '../../providers/I18nProvider'
import { useSections } from '../../providers/SectionsProvider'
import { useAnimateIn } from '../../hooks/useAnimateIn'
import type { AlignerItem } from '@/lib/sectionsDefaults'

vi.mock('../../providers/I18nProvider')
vi.mock('../../providers/SectionsProvider')
vi.mock('../../hooks/useAnimateIn')

describe('Aligners', () => {
  const mockT = (key: string) => {
    const translations: Record<string, string> = {
      alignersLabel: 'Aligner Treatment',
      alignersTitle1: 'Our',
      alignersTitle2: 'Aligners',
      alignersIntro: 'We offer the best aligner treatments',
      alignersWhat: 'What are aligners?',
      alignersWhatDesc: 'Aligners are clear plastic trays...',
      ctaHidden: 'false',
      ctaReady: 'Ready to start?',
      ctaBook: 'Book a consultation',
      ctaViewClinics: 'View clinics',
      ctaViewClinicsLink: '#locations',
    }
    return translations[key] || key
  }

  const mockAligners: AlignerItem[] = [
    {
      id: '1',
      icon: 'heart',
      sv: {
        title: 'Bekvämt',
        desc: 'Bekväma att bära',
      },
      en: {
        title: 'Comfortable',
        desc: 'Comfortable to wear',
      },
    },
    {
      id: '2',
      icon: 'star',
      sv: {
        title: 'Effektivt',
        desc: 'Ger snabba resultat',
      },
      en: {
        title: 'Effective',
        desc: 'Quick results',
      },
    },
  ]

  beforeEach(() => {
    vi.mocked(useI18n).mockReturnValue({
      t: mockT,
      locale: 'en',
      setLocale: vi.fn(),
    })

    vi.mocked(useSections).mockReturnValue({
      sections: {
        services: [],
        aligners: mockAligners,
        advantages: [],
        process: [],
        dm: [],
        faq: [],
        myths: [],
        news: [],
        beforeAfter: [],
      },
          })

    vi.mocked(useAnimateIn).mockReturnValue({
      ref: { current: null },
      visible: true,
    })
  })

  describe('rendering', () => {
    it('should render section with id aligners', () => {
      const { container } = render(<Aligners />)

      const section = container.querySelector('#aligners')
      expect(section).toBeInTheDocument()
    })

    it('should render section header', () => {
      render(<Aligners />)

      expect(screen.getByText('Aligner Treatment')).toBeInTheDocument()
      expect(screen.getByText('Our')).toBeInTheDocument()
      expect(screen.getByText('Aligners')).toBeInTheDocument()
      expect(screen.getByText('We offer the best aligner treatments')).toBeInTheDocument()
    })

    it('should render educational intro card', () => {
      render(<Aligners />)

      expect(screen.getByText('What are aligners?')).toBeInTheDocument()
      expect(screen.getByText('Aligners are clear plastic trays...')).toBeInTheDocument()
    })

    it('should render all aligner cards', () => {
      render(<Aligners />)

      expect(screen.getByText('Comfortable')).toBeInTheDocument()
      expect(screen.getByText('Comfortable to wear')).toBeInTheDocument()
      expect(screen.getByText('Effective')).toBeInTheDocument()
      expect(screen.getByText('Quick results')).toBeInTheDocument()
    })

    it('should render CTA when not hidden', () => {
      render(<Aligners />)

      expect(screen.getByText('Ready to start?')).toBeInTheDocument()
      expect(screen.getByText('Book a consultation')).toBeInTheDocument()
      expect(screen.getByText('View clinics')).toBeInTheDocument()
    })
  })

  describe('CTA visibility', () => {
    it('should hide CTA when ctaHidden is "true"', () => {
      const mockTWithHiddenCTA = (key: string) => {
        if (key === 'ctaHidden') return 'true'
        return mockT(key)
      }

      vi.mocked(useI18n).mockReturnValue({
        t: mockTWithHiddenCTA,
        locale: 'en',
        setLocale: vi.fn(),
      })

      render(<Aligners />)

      expect(screen.queryByText('Ready to start?')).not.toBeInTheDocument()
      expect(screen.queryByText('View clinics')).not.toBeInTheDocument()
    })

    it('should show CTA when ctaHidden is "false"', () => {
      render(<Aligners />)

      expect(screen.getByText('Ready to start?')).toBeInTheDocument()
      expect(screen.getByText('View clinics')).toBeInTheDocument()
    })
  })

  describe('language filtering', () => {
    it('should filter out items without content in current language', () => {
      const alignersWithMissingContent: AlignerItem[] = [
        {
          id: '1',
          icon: 'heart',
          sv: { title: 'Bekvämt', desc: 'Beskrivning' },
          en: { title: 'Comfortable', desc: 'Description' },
        },
        {
          id: '2',
          icon: 'star',
          sv: { title: '', desc: '' },
          en: { title: '', desc: '' },
        },
      ]

      vi.mocked(useSections).mockReturnValue({
        sections: {
          services: [],
          aligners: alignersWithMissingContent,
          advantages: [],
          process: [],
          dm: [],
          faq: [],
          myths: [],
          news: [],
          beforeAfter: [],
        },
              })

      render(<Aligners />)

      expect(screen.getByText('Comfortable')).toBeInTheDocument()
      expect(screen.queryByText('Empty Item')).not.toBeInTheDocument()
    })

    it('should filter out hidden items', () => {
      const alignersWithHidden: AlignerItem[] = [
        {
          id: '1',
          icon: 'heart',
          sv: { title: 'Visible', desc: 'Visible description' },
          en: { title: 'Visible', desc: 'Visible description' },
        },
        {
          id: '2',
          icon: 'star',
          hidden: true,
          sv: { title: 'Hidden', desc: 'Hidden description' },
          en: { title: 'Hidden', desc: 'Hidden description' },
        },
      ]

      vi.mocked(useSections).mockReturnValue({
        sections: {
          services: [],
          aligners: alignersWithHidden,
          advantages: [],
          process: [],
          dm: [],
          faq: [],
          myths: [],
          news: [],
          beforeAfter: [],
        },
              })

      render(<Aligners />)

      expect(screen.getByText('Visible')).toBeInTheDocument()
      expect(screen.queryByText('Hidden')).not.toBeInTheDocument()
    })

    it('should show item with only title in current language', () => {
      const alignersWithOnlyTitle: AlignerItem[] = [
        {
          id: '1',
          icon: 'heart',
          sv: { title: 'Endast rubrik', desc: '' },
          en: { title: 'Only title', desc: '' },
        },
      ]

      vi.mocked(useSections).mockReturnValue({
        sections: {
          services: [],
          aligners: alignersWithOnlyTitle,
          advantages: [],
          process: [],
          dm: [],
          faq: [],
          myths: [],
          news: [],
          beforeAfter: [],
        },
              })

      render(<Aligners />)

      expect(screen.getByText('Only title')).toBeInTheDocument()
    })

    it('should show item with only description in current language', () => {
      const alignersWithOnlyDesc: AlignerItem[] = [
        {
          id: '1',
          icon: 'heart',
          sv: { title: '', desc: 'Endast beskrivning' },
          en: { title: '', desc: 'Only description' },
        },
      ]

      vi.mocked(useSections).mockReturnValue({
        sections: {
          services: [],
          aligners: alignersWithOnlyDesc,
          advantages: [],
          process: [],
          dm: [],
          faq: [],
          myths: [],
          news: [],
          beforeAfter: [],
        },
              })

      render(<Aligners />)

      expect(screen.getByText('Only description')).toBeInTheDocument()
    })
  })

  describe('locale support', () => {
    it('should render Swedish content when locale is sv', () => {
      vi.mocked(useI18n).mockReturnValue({
        t: mockT,
        locale: 'sv',
        setLocale: vi.fn(),
      })

      render(<Aligners />)

      expect(screen.getByText('Bekvämt')).toBeInTheDocument()
      expect(screen.getByText('Bekväma att bära')).toBeInTheDocument()
    })

    it('should render English content when locale is en', () => {
      vi.mocked(useI18n).mockReturnValue({
        t: mockT,
        locale: 'en',
        setLocale: vi.fn(),
      })

      render(<Aligners />)

      expect(screen.getByText('Comfortable')).toBeInTheDocument()
      expect(screen.getByText('Comfortable to wear')).toBeInTheDocument()
    })
  })

  describe('animation', () => {
    it('should apply visible class when visible is true', () => {
      vi.mocked(useAnimateIn).mockReturnValue({
        ref: { current: null },
        visible: true,
      })

      const { container } = render(<Aligners />)

      const visibleElements = container.querySelectorAll('.visible')
      expect(visibleElements.length).toBeGreaterThan(0)
    })

    it('should not apply visible class when visible is false', () => {
      vi.mocked(useAnimateIn).mockReturnValue({
        ref: { current: null },
        visible: false,
      })

      const { container } = render(<Aligners />)

      const visibleElements = container.querySelectorAll('.animate-fade-up.visible')
      expect(visibleElements.length).toBe(0)
    })

    it('should apply animation classes to header', () => {
      const { container } = render(<Aligners />)

      const header = container.querySelector('.animate-fade-up.visible')
      expect(header).toBeInTheDocument()
    })
  })

  describe('grid layout', () => {
    it('should render benefits in a grid', () => {
      const { container } = render(<Aligners />)

      const grid = container.querySelector('.grid.md\\:grid-cols-2.gap-6')
      expect(grid).toBeInTheDocument()
    })

    it('should render correct number of grid items', () => {
      const { container } = render(<Aligners />)

      const gridItems = container.querySelectorAll('.grid.md\\:grid-cols-2 > *')
      expect(gridItems.length).toBe(2)
    })
  })

  describe('edge cases', () => {
    it('should handle empty aligners array', () => {
      vi.mocked(useSections).mockReturnValue({
        sections: {
          services: [],
          aligners: [],
          advantages: [],
          process: [],
          dm: [],
          faq: [],
          myths: [],
          news: [],
          beforeAfter: [],
        },
              })

      render(<Aligners />)

      expect(screen.getByText('Aligner Treatment')).toBeInTheDocument()
      expect(screen.getByText('What are aligners?')).toBeInTheDocument()
    })

    it('should handle single aligner item', () => {
      vi.mocked(useSections).mockReturnValue({
        sections: {
          services: [],
          aligners: [mockAligners[0]],
          advantages: [],
          process: [],
          dm: [],
          faq: [],
          myths: [],
          news: [],
          beforeAfter: [],
        },
              })

      render(<Aligners />)

      expect(screen.getByText('Comfortable')).toBeInTheDocument()
      expect(screen.queryByText('Effective')).not.toBeInTheDocument()
    })
  })

  describe('styling', () => {
    it('should have background muted class', () => {
      const { container } = render(<Aligners />)

      const section = container.querySelector('.bg-muted')
      expect(section).toBeInTheDocument()
    })

    it('should have proper padding', () => {
      const { container } = render(<Aligners />)

      const section = container.querySelector('.py-24')
      expect(section).toBeInTheDocument()
    })

    it('should have max-width constraint', () => {
      const { container } = render(<Aligners />)

      const maxWidthContainer = container.querySelector('.max-w-6xl.mx-auto')
      expect(maxWidthContainer).toBeInTheDocument()
    })
  })

  describe('CTA link', () => {
    it('should link to locations section', () => {
      render(<Aligners />)

      const link = screen.getByText('View clinics').closest('a')
      expect(link).toHaveAttribute('href', '#locations')
    })

    it('should have proper button styling', () => {
      render(<Aligners />)

      const link = screen.getByText('View clinics').closest('a')
      expect(link).toHaveClass('bg-primary-dark')
      expect(link).toHaveClass('text-white')
      expect(link).toHaveClass('rounded-full')
    })

    it('should use custom link when provided', () => {
      const mockTWithCustomLink = (key: string) => {
        if (key === 'ctaViewClinicsLink') return '/custom-page'
        return mockT(key)
      }

      vi.mocked(useI18n).mockReturnValue({
        t: mockTWithCustomLink,
        locale: 'en',
        setLocale: vi.fn(),
      })

      render(<Aligners />)

      const link = screen.getByText('View clinics').closest('a')
      expect(link).toHaveAttribute('href', '/custom-page')
    })
  })

  describe('conditional rendering - section header', () => {
    it('should hide section header when all header fields are empty', () => {
      const mockTNoHeader = (key: string) => {
        if (key === 'alignersLabel') return ''
        if (key === 'alignersTitle1') return ''
        if (key === 'alignersTitle2') return ''
        if (key === 'alignersIntro') return ''
        return mockT(key)
      }

      vi.mocked(useI18n).mockReturnValue({
        t: mockTNoHeader,
        locale: 'en',
        setLocale: vi.fn(),
      })

      render(<Aligners />)

      expect(screen.queryByText('Aligner Treatment')).not.toBeInTheDocument()
      expect(screen.queryByText('Our')).not.toBeInTheDocument()
      expect(screen.queryByText('Aligners')).not.toBeInTheDocument()
    })

    it('should show section header when at least one header field has content', () => {
      const mockTOnlyTitle = (key: string) => {
        if (key === 'alignersLabel') return ''
        if (key === 'alignersTitle1') return 'Title Only'
        if (key === 'alignersTitle2') return ''
        if (key === 'alignersIntro') return ''
        return mockT(key)
      }

      vi.mocked(useI18n).mockReturnValue({
        t: mockTOnlyTitle,
        locale: 'en',
        setLocale: vi.fn(),
      })

      render(<Aligners />)

      expect(screen.getByText('Title Only')).toBeInTheDocument()
    })
  })

  describe('conditional rendering - intro card', () => {
    it('should hide intro card when both fields are empty', () => {
      const mockTNoIntro = (key: string) => {
        if (key === 'alignersWhat') return ''
        if (key === 'alignersWhatDesc') return ''
        return mockT(key)
      }

      vi.mocked(useI18n).mockReturnValue({
        t: mockTNoIntro,
        locale: 'en',
        setLocale: vi.fn(),
      })

      render(<Aligners />)

      expect(screen.queryByText('What are aligners?')).not.toBeInTheDocument()
      expect(screen.queryByText('Aligners are clear plastic trays...')).not.toBeInTheDocument()
    })

    it('should show intro card when at least one field has content', () => {
      const mockTOnlyTitle = (key: string) => {
        if (key === 'alignersWhat') return 'Only title'
        if (key === 'alignersWhatDesc') return ''
        return mockT(key)
      }

      vi.mocked(useI18n).mockReturnValue({
        t: mockTOnlyTitle,
        locale: 'en',
        setLocale: vi.fn(),
      })

      render(<Aligners />)

      expect(screen.getByText('Only title')).toBeInTheDocument()
    })
  })

  describe('conditional rendering - CTA', () => {
    it('should hide CTA when all fields are empty', () => {
      const mockTNoCTA = (key: string) => {
        if (key === 'ctaReady') return ''
        if (key === 'ctaBook') return ''
        if (key === 'ctaViewClinics') return ''
        if (key === 'ctaHidden') return 'false'
        return mockT(key)
      }

      vi.mocked(useI18n).mockReturnValue({
        t: mockTNoCTA,
        locale: 'en',
        setLocale: vi.fn(),
      })

      render(<Aligners />)

      expect(screen.queryByText('Ready to start?')).not.toBeInTheDocument()
      expect(screen.queryByText('View clinics')).not.toBeInTheDocument()
    })

    it('should show CTA when button text exists even if other fields are empty', () => {
      const mockTOnlyButton = (key: string) => {
        if (key === 'ctaReady') return ''
        if (key === 'ctaBook') return ''
        if (key === 'ctaViewClinics') return 'Click me'
        if (key === 'ctaHidden') return 'false'
        return mockT(key)
      }

      vi.mocked(useI18n).mockReturnValue({
        t: mockTOnlyButton,
        locale: 'en',
        setLocale: vi.fn(),
      })

      render(<Aligners />)

      expect(screen.getByText('Click me')).toBeInTheDocument()
      expect(screen.queryByText('Ready to start?')).not.toBeInTheDocument()
      expect(screen.queryByText('Book a consultation')).not.toBeInTheDocument()
    })

    it('should hide CTA when ctaHidden is true', () => {
      const mockTHidden = (key: string) => {
        if (key === 'ctaHidden') return 'true'
        return mockT(key)
      }

      vi.mocked(useI18n).mockReturnValue({
        t: mockTHidden,
        locale: 'en',
        setLocale: vi.fn(),
      })

      render(<Aligners />)

      expect(screen.queryByText('Ready to start?')).not.toBeInTheDocument()
      expect(screen.queryByText('View clinics')).not.toBeInTheDocument()
    })
  })
})
