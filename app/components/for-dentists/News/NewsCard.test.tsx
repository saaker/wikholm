import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NewsCard } from './NewsCard'
import type { NewsItem } from '@/lib/sectionsDefaults'

const mockNewsItem: NewsItem = {
  id: 'test-1',
  color: 'bg-teal-800 text-white',
  image: '/test-image.jpg',
  sv: {
    tag: 'GUIDE',
    date: '15 mars 2026',
    title: 'Test Article Title',
    desc: 'Test article description',
    body: 'Full article body text',
  },
  en: {
    tag: 'GUIDE',
    date: 'March 15, 2026',
    title: 'Test Article Title',
    desc: 'Test article description',
    body: 'Full article body text',
  },
}

const mockNewsItemWithoutBody: NewsItem = {
  ...mockNewsItem,
  sv: {
    ...mockNewsItem.sv,
    body: '',
  },
  en: {
    ...mockNewsItem.en,
    body: '',
  },
}

describe('NewsCard', () => {
  describe('rendering', () => {
    it('should render article content in Swedish', () => {
      render(<NewsCard article={mockNewsItem} locale="sv" />)

      expect(screen.getByText('GUIDE')).toBeInTheDocument()
      expect(screen.getByText('15 mars 2026')).toBeInTheDocument()
      expect(screen.getByText('Test Article Title')).toBeInTheDocument()
      expect(screen.getByText('Test article description')).toBeInTheDocument()
    })

    it('should render article content in English', () => {
      render(<NewsCard article={mockNewsItem} locale="en" />)

      expect(screen.getByText('GUIDE')).toBeInTheDocument()
      expect(screen.getByText('March 15, 2026')).toBeInTheDocument()
      expect(screen.getByText('Test Article Title')).toBeInTheDocument()
      expect(screen.getByText('Test article description')).toBeInTheDocument()
    })

    it('should apply custom className', () => {
      const { container } = render(
        <NewsCard article={mockNewsItem} className="custom-class" />
      )

      const article = container.querySelector('article')
      expect(article).toHaveClass('custom-class')
    })

    it('should apply article color to badge', () => {
      render(<NewsCard article={mockNewsItem} />)

      const badge = screen.getByText('GUIDE')
      expect(badge).toHaveClass('bg-teal-800')
      expect(badge).toHaveClass('text-white')
    })
  })

  describe('"Read more" link', () => {
    it('should show "Läs mer" when article has body (Swedish)', () => {
      render(<NewsCard article={mockNewsItem} locale="sv" />)

      expect(screen.getByText('Läs mer')).toBeInTheDocument()
    })

    it('should show "Read more" when article has body (English)', () => {
      render(<NewsCard article={mockNewsItem} locale="en" />)

      expect(screen.getByText('Read more')).toBeInTheDocument()
    })

    it('should NOT show "Läs mer" when article has no body', () => {
      render(<NewsCard article={mockNewsItemWithoutBody} locale="sv" />)

      expect(screen.queryByText('Läs mer')).not.toBeInTheDocument()
    })
  })

  describe('interactivity', () => {
    it('should be clickable when article has body', () => {
      render(<NewsCard article={mockNewsItem} onClick={() => {}} />)

      const article = screen.getByRole('button')
      expect(article).toBeInTheDocument()
    })

    it('should NOT be clickable when article has no body', () => {
      render(<NewsCard article={mockNewsItemWithoutBody} />)

      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('should call onClick when clicked', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()

      render(<NewsCard article={mockNewsItem} onClick={handleClick} />)

      const article = screen.getByRole('button')
      await user.click(article)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should call onClick when Enter key is pressed', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()

      render(<NewsCard article={mockNewsItem} onClick={handleClick} />)

      const article = screen.getByRole('button')
      article.focus()
      await user.keyboard('{Enter}')

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should call onClick when Space key is pressed', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()

      render(<NewsCard article={mockNewsItem} onClick={handleClick} />)

      const article = screen.getByRole('button')
      article.focus()
      await user.keyboard(' ')

      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('accessibility', () => {
    it('should have proper tabIndex when clickable', () => {
      render(<NewsCard article={mockNewsItem} onClick={() => {}} />)

      const article = screen.getByRole('button')
      expect(article).toHaveAttribute('tabIndex', '0')
    })

    it('should have cursor-pointer class when clickable', () => {
      const { container } = render(<NewsCard article={mockNewsItem} onClick={() => {}} />)

      const article = container.querySelector('article')
      expect(article).toHaveClass('cursor-pointer')
    })

    it('should have focus ring when clickable', () => {
      const { container } = render(<NewsCard article={mockNewsItem} onClick={() => {}} />)

      const article = container.querySelector('article')
      expect(article).toHaveClass('focus-visible:ring-2')
      expect(article).toHaveClass('focus-visible:ring-primary')
    })
  })
})
