import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { Lightbox } from './Lightbox'
import type { BeforeAfterItem } from '@/lib/sectionsDefaults'

describe('Lightbox', () => {
  const mockCases: BeforeAfterItem[] = [
    { id: '1', before: '/before-1.jpg', after: '/after-1.jpg' },
    { id: '2', before: '/before-2.jpg', after: '/after-2.jpg' },
    { id: '3', before: '/before-3.jpg', after: '/after-3.jpg' },
  ]

  const defaultProps = {
    cases: mockCases,
    startIndex: 0,
    onClose: vi.fn(),
    beforeLabel: 'BEFORE',
    afterLabel: 'AFTER',
  }

  let originalOverflow: string

  beforeEach(() => {
    originalOverflow = document.body.style.overflow
  })

  afterEach(() => {
    document.body.style.overflow = originalOverflow
  })

  describe('rendering', () => {
    it('should render lightbox with dialog role', () => {
      render(<Lightbox {...defaultProps} />)
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('should render current image pair', () => {
      render(<Lightbox {...defaultProps} />)

      expect(screen.getByAltText('BEFORE – Patient 1')).toBeInTheDocument()
      expect(screen.getByAltText('AFTER – Patient 1')).toBeInTheDocument()
    })

    it('should render close button', () => {
      render(<Lightbox {...defaultProps} />)
      expect(screen.getByLabelText('Close')).toBeInTheDocument()
    })

    it('should render navigation buttons', () => {
      render(<Lightbox {...defaultProps} />)
      expect(screen.getByLabelText('Previous')).toBeInTheDocument()
      expect(screen.getByLabelText('Next')).toBeInTheDocument()
    })

    it('should render counter with current index', () => {
      render(<Lightbox {...defaultProps} />)
      expect(screen.getByText('1 / 3')).toBeInTheDocument()
    })

    it('should render labels on images', () => {
      render(<Lightbox {...defaultProps} />)

      const labels = screen.getAllByText('BEFORE')
      expect(labels).toHaveLength(1)

      const afterLabels = screen.getAllByText('AFTER')
      expect(afterLabels).toHaveLength(1)
    })

    it('should start at specified index', () => {
      render(<Lightbox {...defaultProps} startIndex={1} />)

      expect(screen.getByAltText('BEFORE – Patient 2')).toBeInTheDocument()
      expect(screen.getByAltText('AFTER – Patient 2')).toBeInTheDocument()
      expect(screen.getByText('2 / 3')).toBeInTheDocument()
    })
  })

  describe('navigation', () => {
    it('should navigate to next image when next button is clicked', async () => {
      const user = userEvent.setup()
      render(<Lightbox {...defaultProps} />)

      const nextButton = screen.getByLabelText('Next')
      await user.click(nextButton)

      expect(screen.getByAltText('BEFORE – Patient 2')).toBeInTheDocument()
      expect(screen.getByText('2 / 3')).toBeInTheDocument()
    })

    it('should navigate to previous image when previous button is clicked', async () => {
      const user = userEvent.setup()
      render(<Lightbox {...defaultProps} startIndex={1} />)

      const prevButton = screen.getByLabelText('Previous')
      await user.click(prevButton)

      expect(screen.getByAltText('BEFORE – Patient 1')).toBeInTheDocument()
      expect(screen.getByText('1 / 3')).toBeInTheDocument()
    })

    it('should wrap to last image when clicking previous on first image', async () => {
      const user = userEvent.setup()
      render(<Lightbox {...defaultProps} startIndex={0} />)

      const prevButton = screen.getByLabelText('Previous')
      await user.click(prevButton)

      expect(screen.getByAltText('BEFORE – Patient 3')).toBeInTheDocument()
      expect(screen.getByText('3 / 3')).toBeInTheDocument()
    })

    it('should wrap to first image when clicking next on last image', async () => {
      const user = userEvent.setup()
      render(<Lightbox {...defaultProps} startIndex={2} />)

      const nextButton = screen.getByLabelText('Next')
      await user.click(nextButton)

      expect(screen.getByAltText('BEFORE – Patient 1')).toBeInTheDocument()
      expect(screen.getByText('1 / 3')).toBeInTheDocument()
    })
  })

  describe('keyboard navigation', () => {
    it('should close on Escape key', async () => {
      const user = userEvent.setup()
      const onClose = vi.fn()
      render(<Lightbox {...defaultProps} onClose={onClose} />)

      await user.keyboard('{Escape}')

      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('should navigate to next on ArrowRight key', async () => {
      const user = userEvent.setup()
      render(<Lightbox {...defaultProps} />)

      await user.keyboard('{ArrowRight}')

      expect(screen.getByAltText('BEFORE – Patient 2')).toBeInTheDocument()
    })

    it('should navigate to previous on ArrowLeft key', async () => {
      const user = userEvent.setup()
      render(<Lightbox {...defaultProps} startIndex={1} />)

      await user.keyboard('{ArrowLeft}')

      expect(screen.getByAltText('BEFORE – Patient 1')).toBeInTheDocument()
    })
  })

  describe('close behavior', () => {
    it('should call onClose when close button is clicked', async () => {
      const user = userEvent.setup()
      const onClose = vi.fn()
      render(<Lightbox {...defaultProps} onClose={onClose} />)

      const closeButton = screen.getByLabelText('Close')
      await user.click(closeButton)

      expect(onClose).toHaveBeenCalled()
    })

    it('should call onClose when clicking backdrop', async () => {
      const user = userEvent.setup()
      const onClose = vi.fn()
      const { container } = render(<Lightbox {...defaultProps} onClose={onClose} />)

      const backdrop = container.querySelector('.fixed.inset-0')
      if (backdrop) {
        await user.click(backdrop)
      }

      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('should not close when clicking on image container', async () => {
      const user = userEvent.setup()
      const onClose = vi.fn()
      render(<Lightbox {...defaultProps} onClose={onClose} />)

      const imageContainer = screen.getByAltText('BEFORE – Patient 1').closest('.flex')
      if (imageContainer?.parentElement) {
        await user.click(imageContainer.parentElement)
      }

      expect(onClose).not.toHaveBeenCalled()
    })
  })

  describe('body scroll lock', () => {
    it('should lock body scroll when mounted', () => {
      render(<Lightbox {...defaultProps} />)
      expect(document.body.style.overflow).toBe('hidden')
    })

    it('should restore body scroll when unmounted', () => {
      const { unmount } = render(<Lightbox {...defaultProps} />)
      expect(document.body.style.overflow).toBe('hidden')

      unmount()
      expect(document.body.style.overflow).toBe('')
    })
  })

  describe('accessibility', () => {
    it('should have aria-modal attribute', () => {
      render(<Lightbox {...defaultProps} />)
      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveAttribute('aria-modal', 'true')
    })

    it('should have descriptive aria-label', () => {
      render(<Lightbox {...defaultProps} />)
      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveAttribute('aria-label', 'BEFORE / AFTER - 1 / 3')
    })

    it('should focus close button on mount', () => {
      render(<Lightbox {...defaultProps} />)
      const closeButton = screen.getByLabelText('Close')
      expect(closeButton).toHaveFocus()
    })

    it('should have descriptive alt text for images', () => {
      render(<Lightbox {...defaultProps} />)
      expect(screen.getByAltText('BEFORE – Patient 1')).toBeInTheDocument()
      expect(screen.getByAltText('AFTER – Patient 1')).toBeInTheDocument()
    })
  })

  describe('styling', () => {
    it('should have correct backdrop styling', () => {
      const { container } = render(<Lightbox {...defaultProps} />)
      const backdrop = container.querySelector('.fixed.inset-0')

      expect(backdrop?.className).toContain('bg-black/90')
      expect(backdrop?.className).toContain('z-50')
    })

    it('should render images in side-by-side layout', () => {
      const { container } = render(<Lightbox {...defaultProps} />)
      const layout = container.querySelector('.flex-col.md\\:flex-row')

      expect(layout).toBeInTheDocument()
    })
  })
})
