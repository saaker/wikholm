import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BeforeAfterSectionHeader } from './BeforeAfterSectionHeader'

describe('BeforeAfterSectionHeader', () => {
  describe('rendering with content', () => {
    it('should render all fields when provided', () => {
      render(
        <BeforeAfterSectionHeader
          label="BEFORE & AFTER"
          title1="See the"
          title2="Results"
          intro="Real transformations from real patients"
        />
      )

      expect(screen.getByText('BEFORE & AFTER')).toBeInTheDocument()
      expect(screen.getByText('See the')).toBeInTheDocument()
      expect(screen.getByText('Results')).toBeInTheDocument()
      expect(screen.getByText('Real transformations from real patients')).toBeInTheDocument()
    })

    it('should render only label when other fields are empty', () => {
      render(<BeforeAfterSectionHeader label="BEFORE & AFTER" />)

      expect(screen.getByText('BEFORE & AFTER')).toBeInTheDocument()
      expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    })

    it('should render only title when label and intro are empty', () => {
      render(<BeforeAfterSectionHeader title1="See the" title2="Results" />)

      expect(screen.getByText('See the')).toBeInTheDocument()
      expect(screen.getByText('Results')).toBeInTheDocument()
    })

    it('should render only intro when label and titles are empty', () => {
      render(<BeforeAfterSectionHeader intro="Real transformations" />)

      expect(screen.getByText('Real transformations')).toBeInTheDocument()
      expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    })
  })

  describe('empty content handling', () => {
    it('should return null when all fields are empty', () => {
      const { container } = render(<BeforeAfterSectionHeader />)
      expect(container.firstChild).toBeNull()
    })

    it('should return null when all fields are whitespace', () => {
      const { container } = render(
        <BeforeAfterSectionHeader
          label="   "
          title1="  "
          title2="  "
          intro="   "
        />
      )
      expect(container.firstChild).toBeNull()
    })

    it('should not render h2 when both title1 and title2 are empty', () => {
      render(<BeforeAfterSectionHeader label="LABEL" intro="Intro text" />)

      expect(screen.getByText('LABEL')).toBeInTheDocument()
      expect(screen.getByText('Intro text')).toBeInTheDocument()
      expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    })

    it('should not render h2 when both title1 and title2 are whitespace', () => {
      render(
        <BeforeAfterSectionHeader
          label="LABEL"
          title1="  "
          title2="  "
          intro="Intro text"
        />
      )

      expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    })
  })

  describe('styling', () => {
    it('should apply default classes', () => {
      const { container } = render(<BeforeAfterSectionHeader label="LABEL" />)
      const wrapper = container.firstChild as HTMLElement

      expect(wrapper.className).toContain('text-center')
      expect(wrapper.className).toContain('max-w-2xl')
      expect(wrapper.className).toContain('mx-auto')
      expect(wrapper.className).toContain('mb-16')
    })

    it('should apply custom className', () => {
      const { container } = render(
        <BeforeAfterSectionHeader label="LABEL" className="custom-class" />
      )
      const wrapper = container.firstChild as HTMLElement

      expect(wrapper.className).toContain('custom-class')
    })

    it('should render label with correct styling', () => {
      render(<BeforeAfterSectionHeader label="BEFORE & AFTER" />)
      const label = screen.getByText('BEFORE & AFTER')

      expect(label.className).toContain('text-sm')
      expect(label.className).toContain('font-medium')
      expect(label.className).toContain('text-primary')
      expect(label.className).toContain('uppercase')
      expect(label.className).toContain('tracking-wider')
    })

    it('should render h2 with correct styling', () => {
      render(<BeforeAfterSectionHeader title1="See the" title2="Results" />)
      const heading = screen.getByRole('heading', { level: 2 })

      expect(heading.className).toContain('text-3xl')
      expect(heading.className).toContain('font-serif')
      expect(heading.className).toContain('font-semibold')
      expect(heading.className).toContain('text-foreground')
    })

    it('should render title2 with primary color', () => {
      render(<BeforeAfterSectionHeader title1="See the" title2="Results" />)
      const heading = screen.getByRole('heading')
      const span = heading.querySelector('span')

      expect(span).toBeInTheDocument()
      expect(span?.className).toContain('text-primary')
      expect(span?.textContent).toBe('Results')
    })

    it('should render intro with correct styling', () => {
      render(<BeforeAfterSectionHeader intro="Real transformations" />)
      const intro = screen.getByText('Real transformations')

      expect(intro.className).toContain('text-muted-dark')
      expect(intro.className).toContain('leading-relaxed')
    })
  })

  describe('title handling', () => {
    it('should render title with only title1', () => {
      render(<BeforeAfterSectionHeader title1="See the Results" />)
      const heading = screen.getByRole('heading')

      expect(heading).toHaveTextContent('See the Results')
    })

    it('should render title with only title2', () => {
      render(<BeforeAfterSectionHeader title2="Results" />)
      const heading = screen.getByRole('heading')
      const span = heading.querySelector('span')

      expect(span?.textContent).toBe('Results')
    })

    it('should render title with both title1 and title2', () => {
      render(<BeforeAfterSectionHeader title1="See the" title2="Results" />)
      const heading = screen.getByRole('heading')

      expect(heading).toHaveTextContent('See the Results')
      expect(screen.getByText('See the')).toBeInTheDocument()
      expect(screen.getByText('Results')).toBeInTheDocument()
    })
  })
})
