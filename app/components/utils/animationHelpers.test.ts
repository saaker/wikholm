import { describe, it, expect } from 'vitest'
import { getDelayClass } from './animationHelpers'

describe('getDelayClass', () => {
  describe('2-column grid (default)', () => {
    it('should return delay-1 for first row (indices 0-1)', () => {
      expect(getDelayClass(0)).toBe('delay-1')
      expect(getDelayClass(1)).toBe('delay-1')
    })

    it('should return delay-2 for second row (indices 2-3)', () => {
      expect(getDelayClass(2)).toBe('delay-2')
      expect(getDelayClass(3)).toBe('delay-2')
    })

    it('should return delay-3 for third row (indices 4-5)', () => {
      expect(getDelayClass(4)).toBe('delay-3')
      expect(getDelayClass(5)).toBe('delay-3')
    })

    it('should cap at delay-5 for rows beyond 5', () => {
      expect(getDelayClass(8)).toBe('delay-5')
      expect(getDelayClass(9)).toBe('delay-5')
      expect(getDelayClass(100)).toBe('delay-5')
    })
  })

  describe('3-column grid', () => {
    it('should return delay-1 for first row (indices 0-2)', () => {
      expect(getDelayClass(0, 3)).toBe('delay-1')
      expect(getDelayClass(1, 3)).toBe('delay-1')
      expect(getDelayClass(2, 3)).toBe('delay-1')
    })

    it('should return delay-2 for second row (indices 3-5)', () => {
      expect(getDelayClass(3, 3)).toBe('delay-2')
      expect(getDelayClass(4, 3)).toBe('delay-2')
      expect(getDelayClass(5, 3)).toBe('delay-2')
    })

    it('should cap at delay-5', () => {
      expect(getDelayClass(12, 3)).toBe('delay-5')
      expect(getDelayClass(100, 3)).toBe('delay-5')
    })
  })

  describe('4-column grid', () => {
    it('should return delay-1 for first row (indices 0-3)', () => {
      expect(getDelayClass(0, 4)).toBe('delay-1')
      expect(getDelayClass(1, 4)).toBe('delay-1')
      expect(getDelayClass(2, 4)).toBe('delay-1')
      expect(getDelayClass(3, 4)).toBe('delay-1')
    })

    it('should return delay-2 for second row (indices 4-7)', () => {
      expect(getDelayClass(4, 4)).toBe('delay-2')
      expect(getDelayClass(7, 4)).toBe('delay-2')
    })
  })

  describe('edge cases', () => {
    it('should handle index 0', () => {
      expect(getDelayClass(0)).toBe('delay-1')
      expect(getDelayClass(0, 1)).toBe('delay-1')
      expect(getDelayClass(0, 10)).toBe('delay-1')
    })

    it('should handle single column grid', () => {
      expect(getDelayClass(0, 1)).toBe('delay-1')
      expect(getDelayClass(1, 1)).toBe('delay-2')
      expect(getDelayClass(2, 1)).toBe('delay-3')
      expect(getDelayClass(4, 1)).toBe('delay-5')
      expect(getDelayClass(5, 1)).toBe('delay-5')
    })
  })
})
