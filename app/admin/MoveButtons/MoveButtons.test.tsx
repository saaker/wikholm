import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MoveButtons } from './MoveButtons'

describe('MoveButtons', () => {
  describe('rendering', () => {
    it('should render two buttons', () => {
      render(<MoveButtons index={1} total={3} onMove={() => {}} />)

      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(2)
    })

    it('should render up button with correct title', () => {
      const { container } = render(<MoveButtons index={1} total={3} onMove={() => {}} />)

      const upButton = container.querySelector('button[title="Flytta upp"]')
      expect(upButton).toBeInTheDocument()
    })

    it('should render down button with correct title', () => {
      const { container } = render(<MoveButtons index={1} total={3} onMove={() => {}} />)

      const downButton = container.querySelector('button[title="Flytta ner"]')
      expect(downButton).toBeInTheDocument()
    })

    it('should render SVG icons in both buttons', () => {
      const { container } = render(<MoveButtons index={1} total={3} onMove={() => {}} />)

      const svgs = container.querySelectorAll('svg')
      expect(svgs).toHaveLength(2)
    })
  })

  describe('disabled states - first item', () => {
    it('should disable up button for first item', () => {
      const { container } = render(<MoveButtons index={0} total={3} onMove={() => {}} />)

      const upButton = container.querySelector('button[title="Flytta upp"]')
      expect(upButton).toBeDisabled()
    })

    it('should enable down button for first item', () => {
      const { container } = render(<MoveButtons index={0} total={3} onMove={() => {}} />)

      const downButton = container.querySelector('button[title="Flytta ner"]')
      expect(downButton).not.toBeDisabled()
    })

    it('should apply opacity style to disabled up button', () => {
      const { container } = render(<MoveButtons index={0} total={3} onMove={() => {}} />)

      const upButton = container.querySelector('button[title="Flytta upp"]')
      expect(upButton).toHaveClass('disabled:opacity-30')
    })
  })

  describe('disabled states - last item', () => {
    it('should enable up button for last item', () => {
      const { container } = render(<MoveButtons index={2} total={3} onMove={() => {}} />)

      const upButton = container.querySelector('button[title="Flytta upp"]')
      expect(upButton).not.toBeDisabled()
    })

    it('should disable down button for last item', () => {
      const { container } = render(<MoveButtons index={2} total={3} onMove={() => {}} />)

      const downButton = container.querySelector('button[title="Flytta ner"]')
      expect(downButton).toBeDisabled()
    })

    it('should apply opacity style to disabled down button', () => {
      const { container } = render(<MoveButtons index={2} total={3} onMove={() => {}} />)

      const downButton = container.querySelector('button[title="Flytta ner"]')
      expect(downButton).toHaveClass('disabled:opacity-30')
    })
  })

  describe('disabled states - middle item', () => {
    it('should enable both buttons for middle item', () => {
      const { container } = render(<MoveButtons index={1} total={3} onMove={() => {}} />)

      const upButton = container.querySelector('button[title="Flytta upp"]')
      const downButton = container.querySelector('button[title="Flytta ner"]')

      expect(upButton).not.toBeDisabled()
      expect(downButton).not.toBeDisabled()
    })
  })

  describe('disabled states - single item', () => {
    it('should disable both buttons for single item', () => {
      const { container } = render(<MoveButtons index={0} total={1} onMove={() => {}} />)

      const upButton = container.querySelector('button[title="Flytta upp"]')
      const downButton = container.querySelector('button[title="Flytta ner"]')

      expect(upButton).toBeDisabled()
      expect(downButton).toBeDisabled()
    })
  })

  describe('interactivity - up button', () => {
    it('should call onMove with correct arguments when up button clicked', async () => {
      const handleMove = vi.fn()
      const user = userEvent.setup()
      const { container } = render(<MoveButtons index={2} total={5} onMove={handleMove} />)

      const upButton = container.querySelector('button[title="Flytta upp"]')
      await user.click(upButton!)

      expect(handleMove).toHaveBeenCalledTimes(1)
      expect(handleMove).toHaveBeenCalledWith(2, 1)
    })

    it('should not call onMove when disabled up button clicked', async () => {
      const handleMove = vi.fn()
      const user = userEvent.setup()
      const { container } = render(<MoveButtons index={0} total={3} onMove={handleMove} />)

      const upButton = container.querySelector('button[title="Flytta upp"]')
      await user.click(upButton!)

      expect(handleMove).not.toHaveBeenCalled()
    })

    it('should move from position 1 to 0', async () => {
      const handleMove = vi.fn()
      const user = userEvent.setup()
      const { container } = render(<MoveButtons index={1} total={3} onMove={handleMove} />)

      const upButton = container.querySelector('button[title="Flytta upp"]')
      await user.click(upButton!)

      expect(handleMove).toHaveBeenCalledWith(1, 0)
    })

    it('should move from position 4 to 3', async () => {
      const handleMove = vi.fn()
      const user = userEvent.setup()
      const { container } = render(<MoveButtons index={4} total={5} onMove={handleMove} />)

      const upButton = container.querySelector('button[title="Flytta upp"]')
      await user.click(upButton!)

      expect(handleMove).toHaveBeenCalledWith(4, 3)
    })
  })

  describe('interactivity - down button', () => {
    it('should call onMove with correct arguments when down button clicked', async () => {
      const handleMove = vi.fn()
      const user = userEvent.setup()
      const { container } = render(<MoveButtons index={1} total={5} onMove={handleMove} />)

      const downButton = container.querySelector('button[title="Flytta ner"]')
      await user.click(downButton!)

      expect(handleMove).toHaveBeenCalledTimes(1)
      expect(handleMove).toHaveBeenCalledWith(1, 2)
    })

    it('should not call onMove when disabled down button clicked', async () => {
      const handleMove = vi.fn()
      const user = userEvent.setup()
      const { container } = render(<MoveButtons index={2} total={3} onMove={handleMove} />)

      const downButton = container.querySelector('button[title="Flytta ner"]')
      await user.click(downButton!)

      expect(handleMove).not.toHaveBeenCalled()
    })

    it('should move from position 0 to 1', async () => {
      const handleMove = vi.fn()
      const user = userEvent.setup()
      const { container } = render(<MoveButtons index={0} total={3} onMove={handleMove} />)

      const downButton = container.querySelector('button[title="Flytta ner"]')
      await user.click(downButton!)

      expect(handleMove).toHaveBeenCalledWith(0, 1)
    })

    it('should move from position 3 to 4', async () => {
      const handleMove = vi.fn()
      const user = userEvent.setup()
      const { container } = render(<MoveButtons index={3} total={5} onMove={handleMove} />)

      const downButton = container.querySelector('button[title="Flytta ner"]')
      await user.click(downButton!)

      expect(handleMove).toHaveBeenCalledWith(3, 4)
    })
  })

  describe('styling', () => {
    it('should apply hover styles to buttons', () => {
      const { container } = render(<MoveButtons index={1} total={3} onMove={() => {}} />)

      const buttons = container.querySelectorAll('button')
      buttons.forEach((button) => {
        expect(button).toHaveClass('hover:bg-muted')
      })
    })

    it('should apply rounded styles to buttons', () => {
      const { container } = render(<MoveButtons index={1} total={3} onMove={() => {}} />)

      const buttons = container.querySelectorAll('button')
      buttons.forEach((button) => {
        expect(button).toHaveClass('rounded-lg')
      })
    })

    it('should apply flex layout to container', () => {
      const { container } = render(<MoveButtons index={1} total={3} onMove={() => {}} />)

      const wrapper = container.querySelector('.flex.flex-col')
      expect(wrapper).toBeInTheDocument()
    })
  })

  describe('edge cases', () => {
    it('should handle total of 2 items', () => {
      const { container } = render(<MoveButtons index={0} total={2} onMove={() => {}} />)

      const upButton = container.querySelector('button[title="Flytta upp"]')
      const downButton = container.querySelector('button[title="Flytta ner"]')

      expect(upButton).toBeDisabled()
      expect(downButton).not.toBeDisabled()
    })

    it('should handle large total count', () => {
      const { container } = render(<MoveButtons index={50} total={100} onMove={() => {}} />)

      const upButton = container.querySelector('button[title="Flytta upp"]')
      const downButton = container.querySelector('button[title="Flytta ner"]')

      expect(upButton).not.toBeDisabled()
      expect(downButton).not.toBeDisabled()
    })

    it('should work correctly at boundary positions', async () => {
      const handleMove = vi.fn()
      const user = userEvent.setup()

      // Test moving from second-to-last to last
      const { container, rerender } = render(
        <MoveButtons index={8} total={10} onMove={handleMove} />
      )

      const downButton = container.querySelector('button[title="Flytta ner"]')
      await user.click(downButton!)

      expect(handleMove).toHaveBeenCalledWith(8, 9)

      // Test moving from second to first
      rerender(<MoveButtons index={1} total={10} onMove={handleMove} />)

      const upButton = container.querySelector('button[title="Flytta upp"]')
      await user.click(upButton!)

      expect(handleMove).toHaveBeenCalledWith(1, 0)
    })
  })

  describe('type safety', () => {
    it('should accept valid index and total props', () => {
      expect(() => {
        render(<MoveButtons index={0} total={1} onMove={() => {}} />)
      }).not.toThrow()
    })

    it('should call onMove with number arguments', async () => {
      const handleMove = vi.fn()
      const user = userEvent.setup()
      const { container } = render(<MoveButtons index={1} total={3} onMove={handleMove} />)

      const upButton = container.querySelector('button[title="Flytta upp"]')
      await user.click(upButton!)

      expect(typeof handleMove.mock.calls[0][0]).toBe('number')
      expect(typeof handleMove.mock.calls[0][1]).toBe('number')
    })
  })
})
