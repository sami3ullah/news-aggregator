import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Image from './Image'

describe('Image Component', () => {
  it('renders an image with the provided src', async () => {
    const testSrc = 'test-image.jpg'
    render(<Image src={testSrc} alt="Test image" />)
    const image = screen.getByRole('img', { name: /test image/i })
    expect(image).toHaveAttribute('src', testSrc)
  })

  it('switches to fallbackSrc if the initial src fails to load', async () => {
    const testSrc = 'test-image.jpg'
    const fallbackSrc = 'fallback-image.jpg'
    render(<Image src={testSrc} fallbackSrc={fallbackSrc} alt="Test image" />)
    const image = screen.getByRole('img', { name: /test image/i })
    fireEvent.error(image)
    expect(image).toHaveAttribute('src', fallbackSrc)
  })

  it('calls onLoad callback when the image successfully loads', async () => {
    const onLoadMock = vi.fn()
    const testSrc = 'test-image.jpg'
    render(<Image src={testSrc} onLoad={onLoadMock} alt="Test image" />)
    const image = screen.getByRole('img', { name: /test image/i })
    fireEvent.load(image)
    expect(onLoadMock).toHaveBeenCalled()
  })

  it('calls onError callback when the image fails to load', async () => {
    const onErrorMock = vi.fn()
    const testSrc = 'test-image.jpg'
    render(<Image src={testSrc} onError={onErrorMock} alt="Test image" />)
    const image = screen.getByRole('img', { name: /test image/i })
    fireEvent.error(image)
    expect(onErrorMock).toHaveBeenCalled()
  })
})
