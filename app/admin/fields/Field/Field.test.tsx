import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Field } from './Field'

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

      expect(handleChange).toHaveBeenCalledTimes(2)
      expect(typeof handleChange.mock.calls[0][0]).toBe('string')
      expect(typeof handleChange.mock.calls[1][0]).toBe('string')
    })

    it('should work as a controlled component', () => {
      const handleChange = vi.fn()

      const { rerender } = render(<Field label="Name" value="Initial" onChange={handleChange} />)

      let input = screen.getByRole('textbox')
      expect(input).toHaveValue('Initial')

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
