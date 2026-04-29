import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CheckboxField } from './CheckboxField'

describe('CheckboxField', () => {
  describe('rendering', () => {
    it('should render with label', () => {
      render(<CheckboxField label="Test Checkbox" value={false} onChange={() => {}} />)

      expect(screen.getByText('Test Checkbox')).toBeInTheDocument()
    })

    it('should render unchecked state', () => {
      render(<CheckboxField label="Test" value={false} onChange={() => {}} />)

      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).not.toBeChecked()
    })

    it('should render checked state', () => {
      render(<CheckboxField label="Test" value={true} onChange={() => {}} />)

      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toBeChecked()
    })

    it('should show checkmark icon when checked', () => {
      const { container } = render(<CheckboxField label="Test" value={true} onChange={() => {}} />)

      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })

    it('should not show checkmark icon when unchecked', () => {
      const { container } = render(<CheckboxField label="Test" value={false} onChange={() => {}} />)

      const svg = container.querySelector('svg')
      expect(svg).not.toBeInTheDocument()
    })
  })

  describe('interactivity', () => {
    it('should call onChange with true when checking', async () => {
      const handleChange = vi.fn()
      const user = userEvent.setup()

      render(<CheckboxField label="Test" value={false} onChange={handleChange} />)

      const checkbox = screen.getByRole('checkbox')
      await user.click(checkbox)

      expect(handleChange).toHaveBeenCalledTimes(1)
      expect(handleChange).toHaveBeenCalledWith(true)
    })

    it('should call onChange with false when unchecking', async () => {
      const handleChange = vi.fn()
      const user = userEvent.setup()

      render(<CheckboxField label="Test" value={true} onChange={handleChange} />)

      const checkbox = screen.getByRole('checkbox')
      await user.click(checkbox)

      expect(handleChange).toHaveBeenCalledTimes(1)
      expect(handleChange).toHaveBeenCalledWith(false)
    })

    it('should be clickable via label', async () => {
      const handleChange = vi.fn()
      const user = userEvent.setup()

      render(<CheckboxField label="Click Me" value={false} onChange={handleChange} />)

      const label = screen.getByText('Click Me')
      await user.click(label)

      expect(handleChange).toHaveBeenCalledWith(true)
    })
  })

  describe('accessibility', () => {
    it('should have checkbox role', () => {
      render(<CheckboxField label="Test" value={false} onChange={() => {}} />)

      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toBeInTheDocument()
    })

    it('should associate label with checkbox', () => {
      render(<CheckboxField label="Associated Label" value={false} onChange={() => {}} />)

      const checkbox = screen.getByRole('checkbox')
      const label = screen.getByText('Associated Label')

      expect(label.closest('label')).toContainElement(checkbox)
    })

    it('should have cursor-pointer class on label', () => {
      const { container } = render(<CheckboxField label="Test" value={false} onChange={() => {}} />)

      const label = container.querySelector('label')
      expect(label).toHaveClass('cursor-pointer')
    })
  })

  describe('type safety', () => {
    it('should accept boolean true value', () => {
      render(<CheckboxField label="Test" value={true} onChange={() => {}} />)
      expect(screen.getByRole('checkbox')).toBeChecked()
    })

    it('should accept boolean false value', () => {
      render(<CheckboxField label="Test" value={false} onChange={() => {}} />)
      expect(screen.getByRole('checkbox')).not.toBeChecked()
    })

    it('should call onChange with boolean (not string)', async () => {
      const handleChange = vi.fn()
      const user = userEvent.setup()

      render(<CheckboxField label="Test" value={false} onChange={handleChange} />)

      await user.click(screen.getByRole('checkbox'))

      expect(typeof handleChange.mock.calls[0][0]).toBe('boolean')
      expect(handleChange.mock.calls[0][0]).toBe(true)
    })
  })

  describe('disabled state', () => {
    it('should render disabled checkbox when disabled prop is true', () => {
      render(<CheckboxField label="Test" value={false} onChange={() => {}} disabled={true} />)

      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toBeDisabled()
    })

    it('should not call onChange when disabled and clicked', async () => {
      const handleChange = vi.fn()
      const user = userEvent.setup()

      render(<CheckboxField label="Test" value={false} onChange={handleChange} disabled={true} />)

      const checkbox = screen.getByRole('checkbox')
      await user.click(checkbox)

      expect(handleChange).not.toHaveBeenCalled()
    })

    it('should have cursor-not-allowed class on label when disabled', () => {
      const { container } = render(<CheckboxField label="Test" value={false} onChange={() => {}} disabled={true} />)

      const label = container.querySelector('label')
      expect(label).toHaveClass('cursor-not-allowed')
    })

    it('should have line-through on label text when disabled', () => {
      const { container } = render(<CheckboxField label="Test Label" value={false} onChange={() => {}} disabled={true} />)

      const labelText = screen.getByText('Test Label')
      expect(labelText).toHaveClass('line-through')
    })

    it('should not be disabled by default', () => {
      render(<CheckboxField label="Test" value={false} onChange={() => {}} />)

      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).not.toBeDisabled()
    })
  })

  describe('helper text', () => {
    it('should render helper text when provided', () => {
      render(<CheckboxField label="Test" value={false} onChange={() => {}} helperText="This is helper text" />)

      expect(screen.getByText('This is helper text')).toBeInTheDocument()
    })

    it('should not render helper text when not provided', () => {
      const { container } = render(<CheckboxField label="Test" value={false} onChange={() => {}} />)

      const helperText = container.querySelector('.text-xs.text-muted-dark')
      expect(helperText).not.toBeInTheDocument()
    })

    it('should render both label and helper text', () => {
      render(<CheckboxField label="Main Label" value={false} onChange={() => {}} helperText="Helper" />)

      expect(screen.getByText('Main Label')).toBeInTheDocument()
      expect(screen.getByText('Helper')).toBeInTheDocument()
    })
  })
})
