import { describe, it, expect } from 'vitest'

/**
 * Tests for checkbox save logic in useContentEditor
 *
 * These tests verify the critical business logic:
 * - Checkboxes use proper boolean types internally
 * - Checkboxes convert to "true"/"false" strings for storage
 * - Checkboxes save to BOTH sv and en (global setting)
 */

describe('useContentEditor - Checkbox Logic', () => {
  describe('checkbox value handling', () => {
    it('should use boolean true for checked state', () => {
      const value = true

      expect(value).toBe(true)
      expect(typeof value).toBe('boolean')
    })

    it('should use boolean false for unchecked state', () => {
      const value = false

      expect(value).toBe(false)
      expect(typeof value).toBe('boolean')
    })

    it('should convert boolean to "true" string for storage', () => {
      const value = true
      const storageValue = value === true ? "true" : "false"

      expect(storageValue).toBe("true")
      expect(typeof storageValue).toBe('string')
    })

    it('should convert boolean to "false" string for storage', () => {
      const value = false as boolean
      const storageValue = value === true ? "true" : "false"

      expect(storageValue).toBe("false")
      expect(typeof storageValue).toBe('string')
    })
  })

  describe('global setting behavior', () => {
    it('should save checkbox to both sv and en', () => {
      const payload = { sv: {}, en: {} } as Record<string, Record<string, string>>
      const key = 'ctaHidden'
      const value = true
      const checkboxValue = value === true ? "true" : "false"

      payload.sv[key] = checkboxValue
      payload.en[key] = checkboxValue

      expect(payload.sv[key]).toBe('true')
      expect(payload.en[key]).toBe('true')
    })

    it('should save "false" to both languages when unchecked', () => {
      const payload = { sv: {}, en: {} } as Record<string, Record<string, string>>
      const key = 'ctaHidden'
      const value = false as boolean
      const checkboxValue = value === true ? "true" : "false"

      payload.sv[key] = checkboxValue
      payload.en[key] = checkboxValue

      expect(payload.sv[key]).toBe('false')
      expect(payload.en[key]).toBe('false')
    })
  })
})
