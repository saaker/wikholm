import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { useContentEditor } from './useContentEditor'

// Mock basePath
vi.mock('@/lib/basePath', () => ({
  default: '',
}))

// Mock the section definitions
vi.mock('../adminTypes', () => ({
  dentistContentSections: [
    {
      id: 'test-section',
      label: 'Test Section',
      fields: [
        { key: 'testText', label: 'Test Text' },
        { key: 'testCheckbox', label: 'Test Checkbox', checkbox: true },
      ],
    },
  ],
  patientContentSections: [],
}))

// Mock translations
vi.mock('@/lib/i18n', () => ({
  translations: {
    sv: {
      testText: 'Default Swedish',
      testCheckbox: 'false',
    },
    en: {
      testText: 'Default English',
      testCheckbox: 'false',
    },
  },
}))

// Mock DEFAULT_SECTIONS and mergeSections
vi.mock('@/lib/sectionsDefaults', () => ({
  DEFAULT_SECTIONS: {},
  mergeSections: (data: unknown) => data,
}))

describe('useContentEditor - Boolean Conversion Integration', () => {
  let fetchMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    fetchMock = vi.fn()
    global.fetch = fetchMock as typeof fetch
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('loading content', () => {
    it('should convert checkbox string "true" to boolean when loading', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          sv: { testCheckbox: 'true' },
          en: { testCheckbox: 'true' },
        }),
      })

      const activeItem = { type: 'content' as const, sectionId: 'test-section', title: 'Test' }
      const { result } = renderHook(() =>
        useContentEditor(activeItem, {}, vi.fn())
      )

      await act(async () => {
        await result.current.fetchContent()
      })

      // Wait for draft to be updated
      await waitFor(
        () => {
          expect(result.current.draft.testCheckbox).toBe(true)
        },
        { timeout: 3000 }
      )

      expect(typeof result.current.draft.testCheckbox).toBe('boolean')
    })

    it('should convert checkbox string "false" to boolean when loading', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          sv: { testCheckbox: 'false' },
          en: { testCheckbox: 'false' },
        }),
      })

      const activeItem = { type: 'content' as const, sectionId: 'test-section', title: 'Test' }
      const { result } = renderHook(() =>
        useContentEditor(activeItem, {}, vi.fn())
      )

      await act(async () => {
        await result.current.fetchContent()
      })

      await waitFor(
        () => {
          expect(result.current.draft.testCheckbox).toBe(false)
        },
        { timeout: 3000 }
      )

      expect(typeof result.current.draft.testCheckbox).toBe('boolean')
    })

    it('should keep text fields as strings', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          sv: { testText: 'Custom Text' },
          en: { testText: 'Custom Text' },
        }),
      })

      const activeItem = { type: 'content' as const, sectionId: 'test-section', title: 'Test' }
      const { result } = renderHook(() =>
        useContentEditor(activeItem, {}, vi.fn())
      )

      await act(async () => {
        await result.current.fetchContent()
      })

      await waitFor(
        () => {
          expect(result.current.draft.testText).toBe('Custom Text')
        },
        { timeout: 3000 }
      )

      expect(typeof result.current.draft.testText).toBe('string')
    })
  })

  describe('saving content', () => {
    it('should convert boolean to string "true" when saving', async () => {
      // Initial load
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          sv: {},
          en: {},
        }),
      })

      const activeItem = { type: 'content' as const, sectionId: 'test-section', title: 'Test' }
      const showMessage = vi.fn()
      const { result } = renderHook(() =>
        useContentEditor(activeItem, {}, showMessage)
      )

      await act(async () => {
        await result.current.fetchContent()
      })

      // Wait for initial draft
      await waitFor(() => {
        expect(result.current.draft).toBeDefined()
      })

      // Update checkbox to true
      act(() => {
        result.current.handleFieldChange('testCheckbox', true)
      })

      // Mock save response
      let savedPayload: unknown
      fetchMock.mockImplementationOnce(async (_url, options) => {
        savedPayload = JSON.parse(options.body as string)
        return {
          ok: true,
          json: async () => savedPayload,
        }
      })

      // Save
      await act(async () => {
        await result.current.handleContentSave()
      })

      // Verify the saved payload has string "true"
      expect(savedPayload).toBeDefined()
      const payload = savedPayload as { sv: Record<string, string>; en: Record<string, string> }
      expect(payload.sv.testCheckbox).toBe('true')
      expect(payload.en.testCheckbox).toBe('true')
      expect(typeof payload.sv.testCheckbox).toBe('string')
    })

    it('should save checkbox to both languages (global setting)', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          sv: {},
          en: {},
        }),
      })

      const activeItem = { type: 'content' as const, sectionId: 'test-section', title: 'Test' }
      const { result } = renderHook(() =>
        useContentEditor(activeItem, {}, vi.fn())
      )

      await act(async () => {
        await result.current.fetchContent()
      })

      await waitFor(() => {
        expect(result.current.draft).toBeDefined()
      })

      act(() => {
        result.current.handleFieldChange('testCheckbox', true)
      })

      let savedPayload: unknown
      fetchMock.mockImplementationOnce(async (_url, options) => {
        savedPayload = JSON.parse(options.body as string)
        return {
          ok: true,
          json: async () => savedPayload,
        }
      })

      await act(async () => {
        await result.current.handleContentSave()
      })

      const payload = savedPayload as { sv: Record<string, string>; en: Record<string, string> }
      // Both languages should have the same checkbox value
      expect(payload.sv.testCheckbox).toBe('true')
      expect(payload.en.testCheckbox).toBe('true')
    })

    it('should only save text fields to current language', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          sv: {},
          en: {},
        }),
      })

      const activeItem = { type: 'content' as const, sectionId: 'test-section', title: 'Test' }
      const { result } = renderHook(() =>
        useContentEditor(activeItem, {}, vi.fn())
      )

      await act(async () => {
        await result.current.fetchContent()
      })

      await waitFor(() => {
        expect(result.current.draft).toBeDefined()
      })

      // Set locale to Swedish
      act(() => {
        result.current.setContentLocale('sv')
      })

      // Update text field
      act(() => {
        result.current.handleFieldChange('testText', 'Swedish Text')
      })

      let savedPayload: unknown
      fetchMock.mockImplementationOnce(async (_url, options) => {
        savedPayload = JSON.parse(options.body as string)
        return {
          ok: true,
          json: async () => savedPayload,
        }
      })

      await act(async () => {
        await result.current.handleContentSave()
      })

      const payload = savedPayload as { sv: Record<string, string>; en: Record<string, string> }
      // Only Swedish should have the text
      expect(payload.sv.testText).toBe('Swedish Text')
      expect(payload.en.testText).toBeUndefined()
    })
  })

  describe('error handling', () => {
    it('should show error on failed save', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          sv: {},
          en: {},
        }),
      })

      const activeItem = { type: 'content' as const, sectionId: 'test-section', title: 'Test' }
      const showMessage = vi.fn()
      const { result } = renderHook(() =>
        useContentEditor(activeItem, {}, showMessage)
      )

      await act(async () => {
        await result.current.fetchContent()
      })

      // Mock failed save
      fetchMock.mockResolvedValueOnce({
        ok: false,
      })

      await act(async () => {
        await result.current.handleContentSave()
      })

      expect(showMessage).toHaveBeenCalledWith('error', expect.any(String))
    })
  })
})
