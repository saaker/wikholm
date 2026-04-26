import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ImagePickerField } from './ImagePickerField'

describe('ImagePickerField', () => {
  let fetchMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    fetchMock = vi.fn()
    global.fetch = fetchMock as typeof fetch
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('rendering', () => {
    it('should render with label', () => {
      render(<ImagePickerField label="Image" value="" onChange={() => {}} />)

      expect(screen.getByText('Image')).toBeInTheDocument()
    })

    it('should render text input', () => {
      render(<ImagePickerField label="Image" value="" onChange={() => {}} />)

      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('placeholder', '/images/news/photo.jpg')
    })

    it('should render picker button', () => {
      const { container } = render(<ImagePickerField label="Image" value="" onChange={() => {}} />)

      const pickerButton = container.querySelector('button[title="Välj från bildbiblioteket"]')
      expect(pickerButton).toBeInTheDocument()
    })

    it('should display current value in input', () => {
      render(<ImagePickerField label="Image" value="/images/news/test.jpg" onChange={() => {}} />)

      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('/images/news/test.jpg')
    })

    it('should show preview when value is set', () => {
      const { container } = render(<ImagePickerField label="Image" value="/images/news/test.jpg" onChange={() => {}} />)

      const preview = container.querySelector('img[alt="Preview"]')
      expect(preview).toBeInTheDocument()
      expect(preview).toHaveAttribute('src', '/images/news/test.jpg')
    })

    it('should not show preview when value is empty', () => {
      const { container } = render(<ImagePickerField label="Image" value="" onChange={() => {}} />)

      const preview = container.querySelector('img[alt="Preview"]')
      expect(preview).not.toBeInTheDocument()
    })
  })

  describe('interactivity', () => {
    it('should call onChange when typing in input', async () => {
      const handleChange = vi.fn()
      const user = userEvent.setup()

      render(<ImagePickerField label="Image" value="" onChange={handleChange} />)

      const input = screen.getByRole('textbox')
      await user.type(input, '/test.jpg')

      expect(handleChange).toHaveBeenCalled()
    })

    it('should open modal when picker button clicked', async () => {
      fetchMock.mockResolvedValueOnce({
        json: async () => ({ folders: ['news', 'team'] }),
      })

      const user = userEvent.setup()
      const { container } = render(<ImagePickerField label="Image" value="" onChange={() => {}} />)

      const pickerButton = container.querySelector('button[title="Välj från bildbiblioteket"]')
      await user.click(pickerButton!)

      await waitFor(() => {
        expect(screen.getByText('Välj bild')).toBeInTheDocument()
      })
    })

    it('should fetch folders when modal opens', async () => {
      fetchMock.mockResolvedValueOnce({
        json: async () => ({ folders: ['news', 'team'] }),
      })

      const user = userEvent.setup()
      const { container } = render(<ImagePickerField label="Image" value="" onChange={() => {}} />)

      const pickerButton = container.querySelector('button[title="Välj från bildbiblioteket"]')
      await user.click(pickerButton!)

      await waitFor(() => {
        expect(fetchMock).toHaveBeenCalledWith('/api/images')
      })
    })

    it('should close modal when close button clicked', async () => {
      fetchMock.mockResolvedValueOnce({
        json: async () => ({ folders: ['news'] }),
      })

      const user = userEvent.setup()
      const { container } = render(<ImagePickerField label="Image" value="" onChange={() => {}} />)

      const pickerButton = container.querySelector('button[title="Välj från bildbiblioteket"]')
      await user.click(pickerButton!)

      await waitFor(() => {
        expect(screen.getByText('Välj bild')).toBeInTheDocument()
      })

      const closeButton = screen.getByText('✕')
      await user.click(closeButton)

      expect(screen.queryByText('Välj bild')).not.toBeInTheDocument()
    })
  })

  describe('modal content', () => {
    it('should display folders in modal', async () => {
      fetchMock.mockResolvedValueOnce({
        json: async () => ({ folders: ['news', 'team', 'gallery'] }),
      })

      const user = userEvent.setup()
      const { container } = render(<ImagePickerField label="Image" value="" onChange={() => {}} />)

      const pickerButton = container.querySelector('button[title="Välj från bildbiblioteket"]')
      await user.click(pickerButton!)

      await waitFor(() => {
        expect(screen.getByText('news')).toBeInTheDocument()
        expect(screen.getByText('team')).toBeInTheDocument()
        expect(screen.getByText('gallery')).toBeInTheDocument()
      })
    })

    it('should load images when folder clicked', async () => {
      fetchMock
        .mockResolvedValueOnce({
          json: async () => ({ folders: ['news'] }),
        })
        .mockResolvedValueOnce({
          json: async () => ({ images: ['photo1.jpg', 'photo2.jpg'] }),
        })

      const user = userEvent.setup()
      const { container } = render(<ImagePickerField label="Image" value="" onChange={() => {}} />)

      const pickerButton = container.querySelector('button[title="Välj från bildbiblioteket"]')
      await user.click(pickerButton!)

      await waitFor(() => {
        expect(screen.getByText('news')).toBeInTheDocument()
      })

      const folderButton = screen.getByText('news')
      await user.click(folderButton)

      await waitFor(() => {
        expect(fetchMock).toHaveBeenCalledWith('/api/images?folder=news')
      })
    })

    it('should select image and close modal when image clicked', async () => {
      const handleChange = vi.fn()
      fetchMock
        .mockResolvedValueOnce({
          json: async () => ({ folders: ['news'] }),
        })
        .mockResolvedValueOnce({
          json: async () => ({ images: ['photo.jpg'] }),
        })

      const user = userEvent.setup()
      const { container } = render(<ImagePickerField label="Image" value="" onChange={handleChange} />)

      const pickerButton = container.querySelector('button[title="Välj från bildbiblioteket"]')
      await user.click(pickerButton!)

      await waitFor(() => {
        expect(screen.getByText('news')).toBeInTheDocument()
      })

      await user.click(screen.getByText('news'))

      await waitFor(() => {
        expect(screen.getByText('photo.jpg')).toBeInTheDocument()
      })

      const imageButton = screen.getByText('photo.jpg').closest('button')
      await user.click(imageButton!)

      expect(handleChange).toHaveBeenCalledWith('/images/news/photo.jpg')
      expect(screen.queryByText('Välj bild')).not.toBeInTheDocument()
    })
  })

  describe('default folder behavior', () => {
    it('should auto-load default folder if specified', async () => {
      fetchMock
        .mockResolvedValueOnce({
          json: async () => ({ folders: ['news', 'team'] }),
        })
        .mockResolvedValueOnce({
          json: async () => ({ images: ['default.jpg'] }),
        })

      const user = userEvent.setup()
      const { container } = render(
        <ImagePickerField label="Image" value="" onChange={() => {}} defaultFolder="news" />
      )

      const pickerButton = container.querySelector('button[title="Välj från bildbiblioteket"]')
      await user.click(pickerButton!)

      await waitFor(() => {
        expect(fetchMock).toHaveBeenCalledWith('/api/images?folder=news')
      })
    })
  })

  describe('edge cases', () => {
    it('should handle fetch error gracefully', async () => {
      fetchMock.mockRejectedValueOnce(new Error('Network error'))

      const user = userEvent.setup()
      const { container } = render(<ImagePickerField label="Image" value="" onChange={() => {}} />)

      const pickerButton = container.querySelector('button[title="Välj från bildbiblioteket"]')
      await user.click(pickerButton!)

      await waitFor(() => {
        expect(screen.getByText('Välj bild')).toBeInTheDocument()
      })
    })

    it('should handle empty folders list', async () => {
      fetchMock.mockResolvedValueOnce({
        json: async () => ({ folders: [] }),
      })

      const user = userEvent.setup()
      const { container } = render(<ImagePickerField label="Image" value="" onChange={() => {}} />)

      const pickerButton = container.querySelector('button[title="Välj från bildbiblioteket"]')
      await user.click(pickerButton!)

      await waitFor(() => {
        expect(screen.getByText('Välj bild')).toBeInTheDocument()
      })
    })

    it('should handle HTTP URL in value', () => {
      const { container } = render(
        <ImagePickerField label="Image" value="https://example.com/image.jpg" onChange={() => {}} />
      )

      const preview = container.querySelector('img[alt="Preview"]')
      expect(preview).toHaveAttribute('src', 'https://example.com/image.jpg')
    })
  })
})
