import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { BeforeAfterCard } from './BeforeAfterCard'
import type { BeforeAfterItem } from '@/lib/sectionsDefaults'

describe('BeforeAfterCard', () => {
  const mockItem: BeforeAfterItem = {
    id: '1',
    before: '/images/before-1.jpg',
    after: '/images/after-1.jpg',
  }

  describe('rendering', () => {
    it('should render before and after images', () => {
      render(
        <BeforeAfterCard
          item={mockItem}
          beforeLabel="FÖRE"
          afterLabel="EFTER"
        />
      )

      expect(screen.getByAltText('FÖRE – Patient 1')).toBeInTheDocument()
      expect(screen.getByAltText('EFTER – Patient 1')).toBeInTheDocument()
    })

    it('should render labels correctly', () => {
      render(
        <BeforeAfterCard
          item={mockItem}
          beforeLabel="BEFORE"
          afterLabel="AFTER"
        />
      )

      expect(screen.getByText('BEFORE')).toBeInTheDocument()
      expect(screen.getByText('AFTER')).toBeInTheDocument()
    })

    it('should render with custom className', () => {
      const { container } = render(
        <BeforeAfterCard
          item={mockItem}
          beforeLabel="FÖRE"
          afterLabel="EFTER"
          className="custom-class"
        />
      )

      const card = container.firstChild as HTMLElement
      expect(card.className).toContain('custom-class')
    })
  })

  describe('empty content handling', () => {
    it('should show placeholder when before image is missing', () => {
      const itemWithoutBefore: BeforeAfterItem = {
        ...mockItem,
        before: '',
      }

      render(
        <BeforeAfterCard
          item={itemWithoutBefore}
          beforeLabel="FÖRE"
          afterLabel="EFTER"
          noImageText="No image"
        />
      )

      const placeholders = screen.getAllByText('No image')
      expect(placeholders).toHaveLength(1)
      expect(screen.getByAltText('EFTER – Patient 1')).toBeInTheDocument()
    })

    it('should show placeholder when after image is missing', () => {
      const itemWithoutAfter: BeforeAfterItem = {
        ...mockItem,
        after: '',
      }

      render(
        <BeforeAfterCard
          item={itemWithoutAfter}
          beforeLabel="FÖRE"
          afterLabel="EFTER"
          noImageText="No image"
        />
      )

      const placeholders = screen.getAllByText('No image')
      expect(placeholders).toHaveLength(1)
      expect(screen.getByAltText('FÖRE – Patient 1')).toBeInTheDocument()
    })

    it('should return null when both images are missing (non-preview)', () => {
      const emptyItem: BeforeAfterItem = {
        id: '1',
        before: '',
        after: '',
      }

      const { container } = render(
        <BeforeAfterCard
          item={emptyItem}
          beforeLabel="FÖRE"
          afterLabel="EFTER"
        />
      )

      expect(container.firstChild).toBeNull()
    })

    it('should render in preview mode even when both images are missing', () => {
      const emptyItem: BeforeAfterItem = {
        id: '1',
        before: '',
        after: '',
      }

      render(
        <BeforeAfterCard
          item={emptyItem}
          beforeLabel="FÖRE"
          afterLabel="EFTER"
          noImageText="No image"
          preview
        />
      )

      const placeholders = screen.getAllByText('No image')
      expect(placeholders).toHaveLength(2)
    })

    it('should use custom noImageText when provided', () => {
      const emptyItem: BeforeAfterItem = {
        id: '1',
        before: '',
        after: '',
      }

      render(
        <BeforeAfterCard
          item={emptyItem}
          beforeLabel="BEFORE"
          afterLabel="AFTER"
          noImageText="Custom placeholder"
          preview
        />
      )

      expect(screen.getAllByText('Custom placeholder')).toHaveLength(2)
    })
  })

  describe('interactive behavior', () => {
    it('should render as button when onClick is provided', () => {
      const { container } = render(
        <BeforeAfterCard
          item={mockItem}
          beforeLabel="FÖRE"
          afterLabel="EFTER"
          onClick={vi.fn()}
        />
      )

      const card = container.firstChild as HTMLElement
      expect(card.tagName).toBe('BUTTON')
    })

    it('should render as div when onClick is not provided', () => {
      const { container } = render(
        <BeforeAfterCard
          item={mockItem}
          beforeLabel="FÖRE"
          afterLabel="EFTER"
        />
      )

      const card = container.firstChild as HTMLElement
      expect(card.tagName).toBe('DIV')
    })

    it('should call onClick when clicked', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()

      render(
        <BeforeAfterCard
          item={mockItem}
          beforeLabel="FÖRE"
          afterLabel="EFTER"
          onClick={handleClick}
        />
      )

      const card = screen.getByRole('button')
      await user.click(card)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should have hover classes when onClick is provided', () => {
      const { container } = render(
        <BeforeAfterCard
          item={mockItem}
          beforeLabel="FÖRE"
          afterLabel="EFTER"
          onClick={vi.fn()}
        />
      )

      const card = container.firstChild as HTMLElement
      expect(card.className).toContain('cursor-pointer')
      expect(card.className).toContain('hover:shadow-md')
      expect(card.className).toContain('hover:scale-[1.01]')
    })

    it('should not have hover classes when onClick is not provided', () => {
      const { container } = render(
        <BeforeAfterCard
          item={mockItem}
          beforeLabel="FÖRE"
          afterLabel="EFTER"
        />
      )

      const card = container.firstChild as HTMLElement
      expect(card.className).not.toContain('cursor-pointer')
      expect(card.className).not.toContain('hover:shadow-md')
    })
  })

  describe('styling', () => {
    it('should have correct container classes', () => {
      const { container } = render(
        <BeforeAfterCard
          item={mockItem}
          beforeLabel="FÖRE"
          afterLabel="EFTER"
        />
      )

      const card = container.firstChild as HTMLElement
      expect(card.className).toContain('bg-surface')
      expect(card.className).toContain('rounded-2xl')
      expect(card.className).toContain('border')
      expect(card.className).toContain('shadow-sm')
    })

    it('should render grid with two columns', () => {
      const { container } = render(
        <BeforeAfterCard
          item={mockItem}
          beforeLabel="FÖRE"
          afterLabel="EFTER"
        />
      )

      const grid = container.querySelector('.grid.grid-cols-2')
      expect(grid).toBeInTheDocument()
    })

    it('should render before label with correct styling', () => {
      render(
        <BeforeAfterCard
          item={mockItem}
          beforeLabel="BEFORE TEST"
          afterLabel="EFTER"
        />
      )

      const beforeLabel = screen.getByText('BEFORE TEST')
      expect(beforeLabel.className).toContain('uppercase')
      expect(beforeLabel.className).toContain('rounded-full')
      expect(beforeLabel.className).toContain('bg-foreground/80')
    })

    it('should render after label with correct styling', () => {
      render(
        <BeforeAfterCard
          item={mockItem}
          beforeLabel="FÖRE"
          afterLabel="AFTER TEST"
        />
      )

      const afterLabel = screen.getByText('AFTER TEST')
      expect(afterLabel.className).toContain('uppercase')
      expect(afterLabel.className).toContain('rounded-full')
      expect(afterLabel.className).toContain('bg-primary-dark')
    })
  })

  describe('ref forwarding', () => {
    it('should forward ref to button when onClick is provided', () => {
      const ref = { current: null as HTMLButtonElement | null }

      render(
        <BeforeAfterCard
          ref={ref}
          item={mockItem}
          beforeLabel="FÖRE"
          afterLabel="EFTER"
          onClick={vi.fn()}
        />
      )

      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
      expect(ref.current?.tagName).toBe('BUTTON')
    })

    it('should forward ref to div when onClick is not provided', () => {
      const ref = { current: null as HTMLDivElement | null }

      render(
        <BeforeAfterCard
          ref={ref}
          item={mockItem}
          beforeLabel="FÖRE"
          afterLabel="EFTER"
        />
      )

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
      expect(ref.current?.tagName).toBe('DIV')
    })
  })

  describe('accessibility', () => {
    it('should be keyboard accessible when interactive', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()

      render(
        <BeforeAfterCard
          item={mockItem}
          beforeLabel="FÖRE"
          afterLabel="EFTER"
          onClick={handleClick}
        />
      )

      const card = screen.getByRole('button')
      card.focus()
      await user.keyboard('{Enter}')

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should have focus-visible styles when interactive', () => {
      const { container } = render(
        <BeforeAfterCard
          item={mockItem}
          beforeLabel="FÖRE"
          afterLabel="EFTER"
          onClick={vi.fn()}
        />
      )

      const card = container.firstChild as HTMLElement
      expect(card.className).toContain('focus-visible:outline-none')
      expect(card.className).toContain('focus-visible:ring-2')
      expect(card.className).toContain('focus-visible:ring-primary')
    })

    it('should have descriptive alt text for images', () => {
      render(
        <BeforeAfterCard
          item={mockItem}
          beforeLabel="FÖRE"
          afterLabel="EFTER"
        />
      )

      expect(screen.getByAltText('FÖRE – Patient 1')).toBeInTheDocument()
      expect(screen.getByAltText('EFTER – Patient 1')).toBeInTheDocument()
    })
  })
})
