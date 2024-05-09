import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Post } from './Post'

// Mock the Image component to simplify testing
vi.mock('../image/Image', () => {
  return {
    __esModule: true,
    default: () => <img alt="mocked image" />,
  }
})

describe('Post component', () => {
  it('renders correctly with given props', () => {
    const props = {
      postUrl: 'https://example.com',
      imageUrl: 'https://example.com/image.jpg',
      title: 'Test Title',
      description: 'Test Description',
      time: '10:00 AM',
      source: 'Test Source',
    }
    render(<Post {...props} />)
    expect(screen.getByRole('link')).toHaveAttribute('href', props.postUrl)
    expect(screen.getByText(props.title)).toBeInTheDocument()
    expect(screen.getByText(props.description)).toBeInTheDocument()
    expect(screen.getByText(props.time)).toBeInTheDocument()
    expect(screen.getByText(`By ${props.source}`)).toBeInTheDocument()
    // Since the Image component is mocked, we check for the mocked image alt text
    expect(screen.getByAltText('mocked image')).toBeInTheDocument()
  })
})
