import { describe, it, expect } from 'vitest'
import { hasLanguageContent, isCardHidden } from './cardHelpers'

describe('cardHelpers', () => {
  describe('isCardHidden', () => {
    it('should return true when hidden is true', () => {
      const item = { id: '1', hidden: true }
      expect(isCardHidden(item)).toBe(true)
    })

    it('should return false when hidden is false', () => {
      const item = { id: '1', hidden: false }
      expect(isCardHidden(item)).toBe(false)
    })

    it('should return false when hidden is undefined', () => {
      const item = { id: '1' }
      expect(isCardHidden(item)).toBe(false)
    })

    it('should return false for empty object', () => {
      const item = {}
      expect(isCardHidden(item)).toBe(false)
    })

    it('should work with different card types', () => {
      const serviceCard = { id: 's1', icon: 'check', hidden: true }
      const newsCard = { id: 'n1', color: 'bg-teal', hidden: false }
      const faqCard = { id: 'f1', sv: {}, en: {} }

      expect(isCardHidden(serviceCard)).toBe(true)
      expect(isCardHidden(newsCard)).toBe(false)
      expect(isCardHidden(faqCard)).toBe(false)
    })
  })

  describe('hasLanguageContent', () => {
    describe('FAQ cards', () => {
      it('should return true when question is filled', () => {
        const item = {
          id: 'faq-1',
          sv: { question: 'Hur lång tid tar behandlingen?', answer: '' },
          en: { question: '', answer: '' }
        }
        expect(hasLanguageContent('faq', item, 'sv')).toBe(true)
        expect(hasLanguageContent('faq', item, 'en')).toBe(false)
      })

      it('should return true when answer is filled', () => {
        const item = {
          id: 'faq-1',
          sv: { question: '', answer: 'Det varierar mellan 6-18 månader' },
          en: { question: '', answer: '' }
        }
        expect(hasLanguageContent('faq', item, 'sv')).toBe(true)
        expect(hasLanguageContent('faq', item, 'en')).toBe(false)
      })

      it('should return true when both are filled', () => {
        const item = {
          id: 'faq-1',
          sv: { question: 'Fråga?', answer: 'Svar' },
          en: { question: 'Question?', answer: 'Answer' }
        }
        expect(hasLanguageContent('faq', item, 'sv')).toBe(true)
        expect(hasLanguageContent('faq', item, 'en')).toBe(true)
      })

      it('should return false when both are empty', () => {
        const item = {
          id: 'faq-1',
          sv: { question: '', answer: '' },
          en: { question: '', answer: '' }
        }
        expect(hasLanguageContent('faq', item, 'sv')).toBe(false)
        expect(hasLanguageContent('faq', item, 'en')).toBe(false)
      })

      it('should ignore whitespace-only content', () => {
        const item = {
          id: 'faq-1',
          sv: { question: '   ', answer: '  ' },
          en: { question: '', answer: '' }
        }
        expect(hasLanguageContent('faq', item, 'sv')).toBe(false)
      })
    })

    describe('Service cards', () => {
      it('should return true when title is filled', () => {
        const item = {
          id: 'svc-1',
          icon: 'check',
          sv: { title: 'TPS', desc: '' },
          en: { title: '', desc: '' }
        }
        expect(hasLanguageContent('services', item, 'sv')).toBe(true)
        expect(hasLanguageContent('services', item, 'en')).toBe(false)
      })

      it('should return true when desc is filled', () => {
        const item = {
          id: 'svc-1',
          icon: 'check',
          sv: { title: '', desc: 'Beskrivning här' },
          en: { title: '', desc: '' }
        }
        expect(hasLanguageContent('services', item, 'sv')).toBe(true)
        expect(hasLanguageContent('services', item, 'en')).toBe(false)
      })
    })

    describe('Aligner cards', () => {
      it('should check title and desc', () => {
        const item = {
          id: 'al-1',
          icon: 'check',
          sv: { title: 'Invisalign', desc: '' },
          en: { title: '', desc: '' }
        }
        expect(hasLanguageContent('aligners', item, 'sv')).toBe(true)
        expect(hasLanguageContent('aligners', item, 'en')).toBe(false)
      })
    })

    describe('News cards', () => {
      it('should check title and desc for news', () => {
        const item = {
          id: 'news-1',
          color: 'bg-teal',
          sv: { tag: '', date: '', title: 'Rubrik', desc: '', body: '' },
          en: { tag: '', date: '', title: '', desc: '', body: '' }
        }
        expect(hasLanguageContent('news', item, 'sv')).toBe(true)
        expect(hasLanguageContent('news', item, 'en')).toBe(false)
      })
    })

    describe('Myth cards', () => {
      it('should check myth and truth fields', () => {
        const item = {
          id: 'myth-1',
          sv: { myth: 'Det gör ont', truth: '' },
          en: { myth: '', truth: '' }
        }
        expect(hasLanguageContent('myths', item, 'sv')).toBe(true)
        expect(hasLanguageContent('myths', item, 'en')).toBe(false)
      })
    })

    describe('BeforeAfter cards', () => {
      it('should always return true (no language versions)', () => {
        const item = {
          id: 'ba-1',
          before: '/img/before.jpg',
          after: '/img/after.jpg'
        }
        expect(hasLanguageContent('beforeAfter', item, 'sv')).toBe(true)
        expect(hasLanguageContent('beforeAfter', item, 'en')).toBe(true)
      })
    })

    describe('Edge cases', () => {
      it('should return false when language data is missing', () => {
        const item = {
          id: 'faq-1',
          sv: { question: 'Fråga', answer: 'Svar' }
          // en is missing
        }
        expect(hasLanguageContent('faq', item, 'en')).toBe(false)
      })

      it('should return false when language data is undefined', () => {
        const item = {
          id: 'faq-1',
          sv: { question: 'Fråga', answer: 'Svar' },
          en: undefined
        }
        expect(hasLanguageContent('faq', item, 'en')).toBe(false)
      })
    })
  })
})
