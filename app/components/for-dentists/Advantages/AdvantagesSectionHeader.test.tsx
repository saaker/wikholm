import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AdvantagesSectionHeader } from './AdvantagesSectionHeader'

describe('AdvantagesSectionHeader', () => {
  describe('rendering with content', () => {
    it('should render all fields when provided', () => {
      render(
        <AdvantagesSectionHeader
          label="ADVANTAGES"
          title1="Why choose"
          title2="us"
          intro="We offer the best service"
        />
      )

      expect(screen.getByText('ADVANTAGES')).toBeInTheDocument()
      expect(screen.getByText('Why choose')).toBeInTheDocument()
      expect(screen.getByText('us')).toBeInTheDocument()
      expect(screen.getByText('We offer the best service')).toBeInTheDocument()
    })

    it('should render only label when other fields are empty', () => {
      render(<AdvantagesSectionHeader label="ADVANTAGES" />)

      expect(screen.getByText('ADVANTAGES')).toBeInTheDocument()
      expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    })

    it('should render only title when label and intro are empty', () => {
      render(<AdvantagesSectionHeader title1="Why choose" title2="us" />)

      expect(screen.getByText('Why choose')).toBeInTheDocument()
      expect(screen.getByText('us')).toBeInTheDocument()
    })

    it('should render only intro when label and titles are empty', () => {
      render(<AdvantagesSectionHeader intro="We offer the best service" />)

      expect(screen.getByText('We offer the best service')).toBeInTheDocument()
      expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    })
  })

  describe('empty content handling', () => {
    it('should return null when all fields are empty', () => {
      const { container } = render(<AdvantagesSectionHeader />)
      expect(container.firstChild).toBeNull()
    })

    it('should return null when all fields are whitespace', () => {
      const { container } = render(
        <AdvantagesSectionHeader
          label="   "
          title1="  "
          title2="  "
          intro="   "
        />
      )
      expect(container.firstChild).toBeNull()
    })

    it('should not render h2 when both title1 and title2 are empty', () => {
      render(<AdvantagesSectionHeader label="LABEL" intro="Intro text" />)

      expect(screen.getByText('LABEL')).toBeInTheDocument()
      expect(screen.getByText('Intro text')).toBeInTheDocument()
      expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    })

    it('should not render h2 when both title1 and title2 are whitespace', () => {
      render(
        <AdvantagesSectionHeader
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
    it('should apply default sticky positioning classes', () => {
      const { container } = render(<AdvantagesSectionHeader label="LABEL" />)
      const wrapper = container.firstChild as HTMLElement

      expect(wrapper.className).toContain('md:pt-[18%]')
      expect(wrapper.className).toContain('md:sticky')
      expect(wrapper.className).toContain('md:top-30')
      expect(wrapper.className).toContain('text-center')
      expect(wrapper.className).toContain('md:text-left')
    })

    it('should apply custom className', () => {
      const { container } = render(
        <AdvantagesSectionHeader label="LABEL" className="custom-class" />
      )
      const wrapper = container.firstChild as HTMLElement

      expect(wrapper.className).toContain('custom-class')
    })

    it('should render label with correct styling', () => {
      render(<AdvantagesSectionHeader label="ADVANTAGES" />)
      const label = screen.getByText('ADVANTAGES')

      expect(label.className).toContain('text-sm')
      expect(label.className).toContain('font-medium')
      expect(label.className).toContain('text-primary')
      expect(label.className).toContain('uppercase')
      expect(label.className).toContain('tracking-wider')
    })

    it('should render h2 with correct styling', () => {
      render(<AdvantagesSectionHeader title1="Why choose" title2="us" />)
      const heading = screen.getByRole('heading', { level: 2 })

      expect(heading.className).toContain('text-3xl')
      expect(heading.className).toContain('font-serif')
      expect(heading.className).toContain('font-semibold')
      expect(heading.className).toContain('text-foreground')
    })

    it('should render title2 with primary color', () => {
      render(<AdvantagesSectionHeader title1="Why choose" title2="us" />)
      const heading = screen.getByRole('heading')
      const span = heading.querySelector('span')

      expect(span).toBeInTheDocument()
      expect(span?.className).toContain('text-primary')
      expect(span?.textContent).toBe('us')
    })

    it('should render intro with correct styling', () => {
      render(<AdvantagesSectionHeader intro="We offer the best service" />)
      const intro = screen.getByText('We offer the best service')

      expect(intro.className).toContain('text-muted-dark')
      expect(intro.className).toContain('leading-relaxed')
    })
  })

  describe('title handling', () => {
    it('should render title with only title1', () => {
      render(<AdvantagesSectionHeader title1="Why choose us" />)
      const heading = screen.getByRole('heading')

      expect(heading).toHaveTextContent('Why choose us')
    })

    it('should render title with only title2', () => {
      render(<AdvantagesSectionHeader title2="us" />)
      const heading = screen.getByRole('heading')
      const span = heading.querySelector('span')

      expect(span?.textContent).toBe('us')
    })

    it('should render title with both title1 and title2', () => {
      render(<AdvantagesSectionHeader title1="Why choose" title2="us" />)
      const heading = screen.getByRole('heading')

      expect(heading).toHaveTextContent('Why choose us')
      expect(screen.getByText('Why choose')).toBeInTheDocument()
      expect(screen.getByText('us')).toBeInTheDocument()
    })
  })
})
