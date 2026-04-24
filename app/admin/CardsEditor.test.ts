import { describe, it, expect } from 'vitest'

/**
 * Tests for CardsEditor helper functions
 */

// Type guard helper (extracted from CardsEditor.tsx for testing)
function isCardHidden(item: Record<string, unknown>): boolean {
  return Boolean((item as { hidden?: boolean }).hidden)
}

describe('CardsEditor - Helper Functions', () => {
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
})

/**
 * Tests for filter logic used in components
 */
describe('Card Filter Logic', () => {
  describe('filtering hidden cards', () => {
    type Card = { id: string; hidden?: boolean }

    it('should filter out hidden cards', () => {
      const cards: Card[] = [
        { id: '1', hidden: false },
        { id: '2', hidden: true },
        { id: '3', hidden: false },
        { id: '4', hidden: true },
      ]

      const visible = cards.filter((card) => !card.hidden)

      expect(visible).toHaveLength(2)
      expect(visible.map((c) => c.id)).toEqual(['1', '3'])
    })

    it('should show all cards when none are hidden', () => {
      const cards: Card[] = [
        { id: '1', hidden: false },
        { id: '2', hidden: false },
        { id: '3', hidden: false },
      ]

      const visible = cards.filter((card) => !card.hidden)

      expect(visible).toHaveLength(3)
    })

    it('should show all cards when hidden property is undefined', () => {
      const cards: Card[] = [
        { id: '1' },
        { id: '2' },
        { id: '3' },
      ]

      const visible = cards.filter((card) => !card.hidden)

      expect(visible).toHaveLength(3)
    })

    it('should hide all cards when all are hidden', () => {
      const cards: Card[] = [
        { id: '1', hidden: true },
        { id: '2', hidden: true },
      ]

      const visible = cards.filter((card) => !card.hidden)

      expect(visible).toHaveLength(0)
    })

    it('should handle empty array', () => {
      const cards: Card[] = []

      const visible = cards.filter((card) => !card.hidden)

      expect(visible).toHaveLength(0)
    })
  })
})
