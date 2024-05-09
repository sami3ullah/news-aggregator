import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'
import { sources } from '@/utils/constants/sources'
import SourceFilter from './SourceFilter'

// Mock the ResizeObserver
const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Stub the global ResizeObserver
vi.stubGlobal('ResizeObserver', ResizeObserverMock)
window.HTMLElement.prototype.scrollIntoView = vi.fn()

describe('SourceFilter Component', () => {
  it('renders correctly with initial state', () => {
    render(<SourceFilter />)
    expect(screen.getByText('Source')).toBeInTheDocument()
    expect(screen.getByText('Select a source...')).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toHaveAttribute(
      'aria-expanded',
      'false'
    )
  })

  it('opens the popover when the button is clicked', () => {
    render(<SourceFilter />)
    const button = screen.getByRole('combobox')
    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByPlaceholderText('Search sources...')).toBeInTheDocument()
  })

  it('displays the correct number of sources', () => {
    render(<SourceFilter />)
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getAllByRole('option').length).toBe(sources.length)
  })
})
