import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { IconPicker } from './IconPicker'

describe('IconPicker', () => {
  describe('rendering', () => {
    it('should render with label', () => {
      render(<IconPicker value="heart" onChange={() => {}} />)

      expect(screen.getByText('Ikon')).toBeInTheDocument()
    })

    it('should render selected icon', () => {
      const { container } = render(<IconPicker value="heart" onChange={() => {}} />)

      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('should display icon label', () => {
      render(<IconPicker value="heart" onChange={() => {}} />)

      expect(screen.getByText(/hjärta/i)).toBeInTheDocument()
    })

    it('should not show dropdown initially', () => {
      const { container } = render(<IconPicker value="heart" onChange={() => {}} />)

      const dropdown = container.querySelector('.grid-cols-4')
      expect(dropdown).not.toBeInTheDocument()
    })
  })

  describe('interactivity', () => {
    it('should open dropdown when button clicked', async () => {
      const user = userEvent.setup()
      const { container } = render(<IconPicker value="heart" onChange={() => {}} />)

      const button = screen.getByRole('button')
      await user.click(button)

      const dropdown = container.querySelector('.grid-cols-4')
      expect(dropdown).toBeInTheDocument()
    })

    it('should close dropdown when button clicked again', async () => {
      const user = userEvent.setup()
      const { container } = render(<IconPicker value="heart" onChange={() => {}} />)

      const button = screen.getByRole('button')

      await user.click(button)
      let dropdown = container.querySelector('.grid-cols-4')
      expect(dropdown).toBeInTheDocument()

      await user.click(button)
      dropdown = container.querySelector('.grid-cols-4')
      expect(dropdown).not.toBeInTheDocument()
    })

    it('should call onChange when icon selected', async () => {
      const handleChange = vi.fn()
      const user = userEvent.setup()
      render(<IconPicker value="heart" onChange={handleChange} />)

      const button = screen.getByRole('button')
      await user.click(button)

      const icons = screen.getAllByRole('button')
      await user.click(icons[1])

      expect(handleChange).toHaveBeenCalledTimes(1)
      expect(typeof handleChange.mock.calls[0][0]).toBe('string')
    })

    it('should close dropdown after selecting icon', async () => {
      const user = userEvent.setup()
      const { container } = render(<IconPicker value="heart" onChange={() => {}} />)

      const button = screen.getByRole('button')
      await user.click(button)

      const icons = screen.getAllByRole('button')
      await user.click(icons[1])

      const dropdown = container.querySelector('.grid-cols-4')
      expect(dropdown).not.toBeInTheDocument()
    })
  })

  describe('dropdown content', () => {
    it('should display all available icons in dropdown', async () => {
      const user = userEvent.setup()
      render(<IconPicker value="heart" onChange={() => {}} />)

      const button = screen.getByRole('button')
      await user.click(button)

      const icons = screen.getAllByRole('button')
      expect(icons.length).toBeGreaterThan(10)
    })

    it('should highlight currently selected icon', async () => {
      const user = userEvent.setup()
      const { container } = render(<IconPicker value="heart" onChange={() => {}} />)

      const button = screen.getByRole('button')
      await user.click(button)

      const selectedIcon = container.querySelector('.ring-1.ring-primary\\/30')
      expect(selectedIcon).toBeInTheDocument()
    })
  })

  describe('styling', () => {
    it('should have dropdown chevron', () => {
      const { container } = render(<IconPicker value="heart" onChange={() => {}} />)

      const chevron = container.querySelector('svg')
      expect(chevron).toBeInTheDocument()
    })

    it('should apply hover styles to button', () => {
      render(<IconPicker value="heart" onChange={() => {}} />)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('hover:border-primary/30')
    })
  })

  describe('edge cases', () => {
    it('should handle empty icon value', () => {
      render(<IconPicker value="" onChange={() => {}} />)

      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('should handle unknown icon value', () => {
      render(<IconPicker value="unknown-icon" onChange={() => {}} />)

      const button = screen.getByRole('button')
      expect(button).toHaveTextContent('unknown-icon')
    })
  })
})
