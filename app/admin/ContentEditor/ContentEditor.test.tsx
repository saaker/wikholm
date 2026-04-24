import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContentEditor } from './ContentEditor'

describe('ContentEditor', () => {
  const defaultProps = {
    sectionId: 'hero',
    locale: 'sv' as const,
    setLocale: vi.fn(),
    draft: {
      heroLabel: 'Test Label',
      heroTitle1: 'Test Title 1',
      heroTitle2: 'Test Title 2',
    },
    onChange: vi.fn(),
    onSave: vi.fn(),
    onReset: vi.fn(),
    saving: false,
    readOnly: false,
  }

  describe('language reminder banner', () => {
    it('should render language reminder banner', () => {
      render(<ContentEditor {...defaultProps} />)

      expect(screen.getByText(/Don't forget to add the/)).toBeInTheDocument()
    })

    it('should show "English" reminder when locale is Swedish', () => {
      render(<ContentEditor {...defaultProps} locale="sv" />)

      expect(screen.getByText(/Don't forget to add the/)).toBeInTheDocument()
      const strongElement = screen.getByText('English', { selector: 'strong' })
      expect(strongElement).toBeInTheDocument()
    })

    it('should show "Swedish" reminder when locale is English', () => {
      render(<ContentEditor {...defaultProps} locale="en" />)

      expect(screen.getByText(/Don't forget to add the/)).toBeInTheDocument()
      expect(screen.getByText('Swedish')).toBeInTheDocument()
    })

    it('should display lightbulb emoji in banner', () => {
      render(<ContentEditor {...defaultProps} />)

      expect(screen.getByText('💡')).toBeInTheDocument()
    })
  })

  describe('language toggle', () => {
    it('should render language toggle buttons', () => {
      render(<ContentEditor {...defaultProps} />)

      expect(screen.getByRole('button', { name: 'Svenska' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'English' })).toBeInTheDocument()
    })

    it('should call setLocale when switching language', async () => {
      const setLocale = vi.fn()
      const user = userEvent.setup()

      render(<ContentEditor {...defaultProps} setLocale={setLocale} locale="sv" />)

      const englishButton = screen.getByRole('button', { name: 'English' })
      await user.click(englishButton)

      expect(setLocale).toHaveBeenCalledWith('en')
    })

    it('should highlight active language', () => {
      const { container } = render(<ContentEditor {...defaultProps} locale="sv" />)

      const buttons = container.querySelectorAll('button')
      const svenskaButton = Array.from(buttons).find(btn => btn.textContent === 'Svenska')
      const englishButton = Array.from(buttons).find(btn => btn.textContent === 'English')

      expect(svenskaButton).toHaveClass('bg-surface')
      expect(englishButton).toHaveClass('text-muted-dark')
    })
  })

  describe('action buttons', () => {
    it('should render save button', () => {
      render(<ContentEditor {...defaultProps} />)

      expect(screen.getByText('Spara ändringar')).toBeInTheDocument()
    })

    it('should render reset button', () => {
      render(<ContentEditor {...defaultProps} />)

      expect(screen.getByText('Återställ till standard')).toBeInTheDocument()
    })

    it('should call onSave when save button is clicked', async () => {
      const onSave = vi.fn()
      const user = userEvent.setup()

      render(<ContentEditor {...defaultProps} onSave={onSave} />)

      const saveButton = screen.getByText('Spara ändringar')
      await user.click(saveButton)

      expect(onSave).toHaveBeenCalledTimes(1)
    })

    it('should call onReset when reset button is clicked', async () => {
      const onReset = vi.fn()
      const user = userEvent.setup()

      render(<ContentEditor {...defaultProps} onReset={onReset} />)

      const resetButton = screen.getByText('Återställ till standard')
      await user.click(resetButton)

      expect(onReset).toHaveBeenCalledTimes(1)
    })

    it('should disable save button when saving', () => {
      render(<ContentEditor {...defaultProps} saving={true} />)

      const saveButton = screen.getByText('Sparar...')
      expect(saveButton).toBeDisabled()
    })

    it('should show saving state', () => {
      render(<ContentEditor {...defaultProps} saving={true} />)

      expect(screen.getByText('Sparar...')).toBeInTheDocument()
    })
  })

  describe('read-only mode', () => {
    it('should disable fieldset when readOnly is true', () => {
      const { container } = render(<ContentEditor {...defaultProps} readOnly={true} />)

      const fieldset = container.querySelector('fieldset')
      expect(fieldset).toBeDisabled()
    })

    it('should apply opacity when readOnly is true', () => {
      const { container } = render(<ContentEditor {...defaultProps} readOnly={true} />)

      const fieldset = container.querySelector('fieldset')
      expect(fieldset).toHaveClass('opacity-60')
    })
  })

  describe('preview section', () => {
    it('should render preview label', () => {
      render(<ContentEditor {...defaultProps} />)

      expect(screen.getByText('Förhandsgranskning')).toBeInTheDocument()
    })
  })

  describe('section not found', () => {
    it('should return null for unknown sectionId', () => {
      const { container } = render(
        <ContentEditor {...defaultProps} sectionId="unknown-section" />
      )

      expect(container.firstChild).toBeNull()
    })
  })
})
