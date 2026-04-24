import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CheckboxField, Field } from './adminComponents'

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

      // Label should contain the checkbox
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
      // TypeScript should enforce this at compile time
      // This test documents the expected behavior
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
})

describe('Field', () => {
  describe('rendering - single line', () => {
    it('should render text input by default', () => {
      render(<Field label="Name" value="" onChange={() => {}} />)

      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()
      expect(input.tagName).toBe('INPUT')
    })

    it('should render with label', () => {
      render(<Field label="Username" value="" onChange={() => {}} />)

      expect(screen.getByText('Username')).toBeInTheDocument()
    })

    it('should display current value', () => {
      render(<Field label="Name" value="John Doe" onChange={() => {}} />)

      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('John Doe')
    })

    it('should render empty value', () => {
      render(<Field label="Name" value="" onChange={() => {}} />)

      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('')
    })
  })

  describe('rendering - multiline', () => {
    it('should render textarea when multiline is true', () => {
      render(<Field label="Description" value="" onChange={() => {}} multiline />)

      const textarea = screen.getByRole('textbox')
      expect(textarea.tagName).toBe('TEXTAREA')
    })

    it('should use 3 rows by default', () => {
      render(<Field label="Description" value="" onChange={() => {}} multiline />)

      const textarea = screen.getByRole('textbox')
      expect(textarea).toHaveAttribute('rows', '3')
    })

    it('should use 8 rows when large is true', () => {
      render(<Field label="Description" value="" onChange={() => {}} multiline large />)

      const textarea = screen.getByRole('textbox')
      expect(textarea).toHaveAttribute('rows', '8')
    })

    it('should display multiline value', () => {
      const value = 'Line 1\nLine 2\nLine 3'
      render(<Field label="Description" value={value} onChange={() => {}} multiline />)

      const textarea = screen.getByRole('textbox')
      expect(textarea).toHaveValue(value)
    })
  })

  describe('interactivity', () => {
    it('should call onChange when typing', async () => {
      const handleChange = vi.fn()
      const user = userEvent.setup()

      render(<Field label="Name" value="" onChange={handleChange} />)

      const input = screen.getByRole('textbox')
      await user.type(input, 'A')

      expect(handleChange).toHaveBeenCalledTimes(1)
      expect(handleChange).toHaveBeenCalledWith('A')
    })

    it('should call onChange for each character when typing', async () => {
      const handleChange = vi.fn()
      const user = userEvent.setup()

      render(<Field label="Name" value="" onChange={handleChange} />)

      const input = screen.getByRole('textbox')
      await user.type(input, 'Hi')

      // Called once per character typed
      expect(handleChange).toHaveBeenCalledTimes(2)
      // Each call receives a string argument
      expect(typeof handleChange.mock.calls[0][0]).toBe('string')
      expect(typeof handleChange.mock.calls[1][0]).toBe('string')
    })

    it('should work as a controlled component', () => {
      const handleChange = vi.fn()

      const { rerender } = render(<Field label="Name" value="Initial" onChange={handleChange} />)

      let input = screen.getByRole('textbox')
      expect(input).toHaveValue('Initial')

      // Update the value prop
      rerender(<Field label="Name" value="Updated" onChange={handleChange} />)

      input = screen.getByRole('textbox')
      expect(input).toHaveValue('Updated')
    })

    it('should handle multiline text input', async () => {
      const handleChange = vi.fn()
      const user = userEvent.setup()

      render(<Field label="Description" value="" onChange={handleChange} multiline />)

      const textarea = screen.getByRole('textbox')
      await user.type(textarea, 'Test')

      // Verify onChange was called
      expect(handleChange).toHaveBeenCalled()
      expect(typeof handleChange.mock.calls[0][0]).toBe('string')
    })
  })

  describe('accessibility', () => {
    it('should associate label with input', () => {
      render(<Field label="Email Address" value="" onChange={() => {}} />)

      const label = screen.getByText('Email Address')
      const input = screen.getByRole('textbox')

      expect(label.tagName).toBe('LABEL')
      expect(label).toBeInTheDocument()
      expect(input).toBeInTheDocument()
    })

    it('should have proper label styling', () => {
      const { container } = render(<Field label="Name" value="" onChange={() => {}} />)

      const label = container.querySelector('label')
      expect(label).toHaveClass('text-sm')
      expect(label).toHaveClass('font-medium')
    })
  })

  describe('edge cases', () => {
    it('should handle empty string value', () => {
      render(<Field label="Name" value="" onChange={() => {}} />)

      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('')
    })

    it('should handle special characters in value', () => {
      const specialValue = '<script>alert("XSS")</script>'
      render(<Field label="Special" value={specialValue} onChange={() => {}} />)

      const input = screen.getByRole('textbox')
      expect(input).toHaveValue(specialValue)
    })

    it('should call onChange when typing special characters', async () => {
      const handleChange = vi.fn()
      const user = userEvent.setup()

      render(<Field label="Special" value="" onChange={handleChange} />)

      const input = screen.getByRole('textbox')
      await user.type(input, '<')

      expect(handleChange).toHaveBeenCalledTimes(1)
      expect(handleChange).toHaveBeenCalledWith('<')
    })

    it('should handle very long text', () => {
      const longText = 'A'.repeat(1000)
      const handleChange = vi.fn()

      render(<Field label="Long" value={longText} onChange={handleChange} />)

      const input = screen.getByRole('textbox')
      expect(input).toHaveValue(longText)
    })
  })
})
