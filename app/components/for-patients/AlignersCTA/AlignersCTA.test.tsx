import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AlignersCTA } from './AlignersCTA'

describe('AlignersCTA', () => {
  describe('rendering', () => {
    it('should render with all fields populated', () => {
      render(
        <AlignersCTA
          ctaReady="Ready?"
          ctaBook="Book now"
          ctaViewClinics="View clinics"
          ctaViewClinicsLink="#locations"
        />
      )

      expect(screen.getByText('Ready?')).toBeInTheDocument()
      expect(screen.getByText('Book now')).toBeInTheDocument()
      expect(screen.getByText('View clinics')).toBeInTheDocument()
    })

    it('should render with only button', () => {
      render(
        <AlignersCTA
          ctaReady=""
          ctaBook=""
          ctaViewClinics="Click here"
          ctaViewClinicsLink="#test"
        />
      )

      expect(screen.queryByText('Ready?')).not.toBeInTheDocument()
      expect(screen.queryByText('Book now')).not.toBeInTheDocument()
      expect(screen.getByText('Click here')).toBeInTheDocument()
    })

    it('should render with only text content', () => {
      render(
        <AlignersCTA
          ctaReady="Title"
          ctaBook="Subtitle"
          ctaViewClinics=""
          ctaViewClinicsLink=""
        />
      )

      expect(screen.getByText('Title')).toBeInTheDocument()
      expect(screen.getByText('Subtitle')).toBeInTheDocument()
      expect(screen.queryByRole('link')).not.toBeInTheDocument()
    })

    it('should render with only title', () => {
      render(
        <AlignersCTA
          ctaReady="Just title"
          ctaBook=""
          ctaViewClinics=""
          ctaViewClinicsLink=""
        />
      )

      expect(screen.getByText('Just title')).toBeInTheDocument()
    })

    it('should render with only description', () => {
      render(
        <AlignersCTA
          ctaReady=""
          ctaBook="Just description"
          ctaViewClinics=""
          ctaViewClinicsLink=""
        />
      )

      expect(screen.getByText('Just description')).toBeInTheDocument()
    })
  })

  describe('conditional rendering', () => {
    it('should return null when all fields are empty', () => {
      const { container } = render(
        <AlignersCTA
          ctaReady=""
          ctaBook=""
          ctaViewClinics=""
          ctaViewClinicsLink=""
        />
      )

      expect(container.firstChild).toBeNull()
    })

    it('should return null when all fields are whitespace', () => {
      const { container } = render(
        <AlignersCTA
          ctaReady="   "
          ctaBook="  "
          ctaViewClinics="  "
          ctaViewClinicsLink=""
        />
      )

      expect(container.firstChild).toBeNull()
    })

    it('should render when at least one field has content', () => {
      render(
        <AlignersCTA
          ctaReady="   "
          ctaBook="  "
          ctaViewClinics="Button"
          ctaViewClinicsLink="#test"
        />
      )

      expect(screen.getByText('Button')).toBeInTheDocument()
    })
  })

  describe('link behavior', () => {
    it('should use provided link', () => {
      render(
        <AlignersCTA
          ctaReady=""
          ctaBook=""
          ctaViewClinics="Click"
          ctaViewClinicsLink="/custom-page"
        />
      )

      const link = screen.getByText('Click').closest('a')
      expect(link).toHaveAttribute('href', '/custom-page')
    })

    it('should fallback to #locations when link is empty', () => {
      render(
        <AlignersCTA
          ctaReady=""
          ctaBook=""
          ctaViewClinics="Click"
          ctaViewClinicsLink=""
        />
      )

      const link = screen.getByText('Click').closest('a')
      expect(link).toHaveAttribute('href', '#locations')
    })

    it('should support external links', () => {
      render(
        <AlignersCTA
          ctaReady=""
          ctaBook=""
          ctaViewClinics="External"
          ctaViewClinicsLink="https://example.com"
        />
      )

      const link = screen.getByText('External').closest('a')
      expect(link).toHaveAttribute('href', 'https://example.com')
    })

    it('should support relative paths', () => {
      render(
        <AlignersCTA
          ctaReady=""
          ctaBook=""
          ctaViewClinics="Relative"
          ctaViewClinicsLink="/for-patienter#faq"
        />
      )

      const link = screen.getByText('Relative').closest('a')
      expect(link).toHaveAttribute('href', '/for-patienter#faq')
    })
  })

  describe('className prop', () => {
    it('should use default mt-16 className', () => {
      const { container } = render(
        <AlignersCTA
          ctaReady="Test"
          ctaBook=""
          ctaViewClinics=""
          ctaViewClinicsLink=""
        />
      )

      const wrapper = container.querySelector('.mt-16')
      expect(wrapper).toBeInTheDocument()
    })

    it('should use custom className when provided', () => {
      const { container } = render(
        <AlignersCTA
          ctaReady="Test"
          ctaBook=""
          ctaViewClinics=""
          ctaViewClinicsLink=""
          className="custom-class"
        />
      )

      const wrapper = container.querySelector('.custom-class')
      expect(wrapper).toBeInTheDocument()
      expect(container.querySelector('.mt-16')).not.toBeInTheDocument()
    })

    it('should support empty className', () => {
      const { container } = render(
        <AlignersCTA
          ctaReady="Test"
          ctaBook=""
          ctaViewClinics=""
          ctaViewClinicsLink=""
          className=""
        />
      )

      expect(container.querySelector('.mt-16')).not.toBeInTheDocument()
    })
  })

  describe('styling', () => {
    it('should have proper button styling', () => {
      render(
        <AlignersCTA
          ctaReady=""
          ctaBook=""
          ctaViewClinics="Button"
          ctaViewClinicsLink="#test"
        />
      )

      const link = screen.getByText('Button').closest('a')
      expect(link).toHaveClass('bg-primary-dark')
      expect(link).toHaveClass('text-white')
      expect(link).toHaveClass('rounded-full')
    })

    it('should have text-center class on wrapper', () => {
      const { container } = render(
        <AlignersCTA
          ctaReady="Test"
          ctaBook=""
          ctaViewClinics=""
          ctaViewClinicsLink=""
        />
      )

      const wrapper = container.querySelector('.text-center')
      expect(wrapper).toBeInTheDocument()
    })
  })

  describe('accessibility', () => {
    it('should have focus styles on link', () => {
      render(
        <AlignersCTA
          ctaReady=""
          ctaBook=""
          ctaViewClinics="Click"
          ctaViewClinicsLink="#test"
        />
      )

      const link = screen.getByText('Click').closest('a')
      expect(link).toHaveClass('focus-visible:outline-none')
      expect(link).toHaveClass('focus-visible:ring-2')
    })

    it('should have proper semantic structure', () => {
      render(
        <AlignersCTA
          ctaReady="Title"
          ctaBook="Description"
          ctaViewClinics="Link"
          ctaViewClinicsLink="#test"
        />
      )

      const title = screen.getByText('Title')
      expect(title.tagName).toBe('P')

      const desc = screen.getByText('Description')
      expect(desc.tagName).toBe('P')

      const link = screen.getByText('Link')
      expect(link.tagName).toBe('A')
    })
  })

  describe('edge cases', () => {
    it('should handle very long text content', () => {
      const longText = 'A'.repeat(200)
      render(
        <AlignersCTA
          ctaReady={longText}
          ctaBook=""
          ctaViewClinics=""
          ctaViewClinicsLink=""
        />
      )

      expect(screen.getByText(longText)).toBeInTheDocument()
    })

    it('should handle special characters', () => {
      render(
        <AlignersCTA
          ctaReady="<Title> & 'Quotes'"
          ctaBook='"Double" quotes'
          ctaViewClinics="Button <>&"
          ctaViewClinicsLink="#test"
        />
      )

      expect(screen.getByText("<Title> & 'Quotes'")).toBeInTheDocument()
      expect(screen.getByText('"Double" quotes')).toBeInTheDocument()
      expect(screen.getByText('Button <>&')).toBeInTheDocument()
    })
  })
})
