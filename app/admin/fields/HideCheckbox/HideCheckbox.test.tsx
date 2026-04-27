import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { HideCheckbox } from './HideCheckbox'

describe('HideCheckbox', () => {
  describe('rendering', () => {
    it('should render checkbox with label', () => {
      render(<HideCheckbox checked={false} onChange={vi.fn()} />)

      expect(screen.getByRole('checkbox')).toBeInTheDocument()
      expect(screen.getByText('Dold (visas inte på sidan)')).toBeInTheDocument()
    })

    it('should render checked state', () => {
      render(<HideCheckbox checked={true} onChange={vi.fn()} />)

      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toBeChecked()
    })

    it('should render unchecked state', () => {
      render(<HideCheckbox checked={false} onChange={vi.fn()} />)

      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).not.toBeChecked()
    })
  })

  describe('user interaction', () => {
    it('should call onChange when checkbox is clicked', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()

      render(<HideCheckbox checked={false} onChange={handleChange} />)

      const checkbox = screen.getByRole('checkbox')
      await user.click(checkbox)

      expect(handleChange).toHaveBeenCalledTimes(1)
      expect(handleChange).toHaveBeenCalledWith(true)
    })

    it('should call onChange with false when unchecking', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()

      render(<HideCheckbox checked={true} onChange={handleChange} />)

      const checkbox = screen.getByRole('checkbox')
      await user.click(checkbox)

      expect(handleChange).toHaveBeenCalledTimes(1)
      expect(handleChange).toHaveBeenCalledWith(false)
    })

    it('should call onChange when label is clicked', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()

      render(<HideCheckbox checked={false} onChange={handleChange} />)

      const label = screen.getByText('Dold (visas inte på sidan)')
      await user.click(label)

      expect(handleChange).toHaveBeenCalledTimes(1)
      expect(handleChange).toHaveBeenCalledWith(true)
    })
  })

  describe('styling', () => {
    it('should have correct checkbox classes', () => {
      render(<HideCheckbox checked={false} onChange={vi.fn()} />)

      const checkbox = screen.getByRole('checkbox')
      expect(checkbox.className).toContain('rounded')
      expect(checkbox.className).toContain('border-border')
      expect(checkbox.className).toContain('text-primary')
      expect(checkbox.className).toContain('focus:ring-primary')
    })

    it('should have correct label container classes', () => {
      const { container } = render(<HideCheckbox checked={false} onChange={vi.fn()} />)

      const label = container.querySelector('label')
      expect(label?.className).toContain('flex')
      expect(label?.className).toContain('items-center')
      expect(label?.className).toContain('gap-2')
      expect(label?.className).toContain('text-sm')
    })

    it('should have correct span classes', () => {
      render(<HideCheckbox checked={false} onChange={vi.fn()} />)

      const span = screen.getByText('Dold (visas inte på sidan)')
      expect(span.className).toContain('font-medium')
      expect(span.className).toContain('text-foreground')
    })
  })

  describe('accessibility', () => {
    it('should be keyboard accessible', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()

      render(<HideCheckbox checked={false} onChange={handleChange} />)

      const checkbox = screen.getByRole('checkbox')
      checkbox.focus()
      await user.keyboard(' ')

      expect(handleChange).toHaveBeenCalledWith(true)
    })

    it('should have proper label association', () => {
      render(<HideCheckbox checked={false} onChange={vi.fn()} />)

      const checkbox = screen.getByRole('checkbox')
      const label = screen.getByText('Dold (visas inte på sidan)')

      expect(checkbox).toBeInTheDocument()
      expect(label).toBeInTheDocument()
      expect(checkbox.parentElement?.tagName).toBe('LABEL')
    })
  })

  describe('controlled component behavior', () => {
    it('should reflect controlled checked state', () => {
      const { rerender } = render(<HideCheckbox checked={false} onChange={vi.fn()} />)

      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).not.toBeChecked()

      rerender(<HideCheckbox checked={true} onChange={vi.fn()} />)
      expect(checkbox).toBeChecked()

      rerender(<HideCheckbox checked={false} onChange={vi.fn()} />)
      expect(checkbox).not.toBeChecked()
    })
  })
})
