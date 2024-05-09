// ErrorScreen.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import ErrorScreen from './ErrorScreen'

vi.mock('@/components/ui-library/button', () => ({
  Button: vi.fn(({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  )),
}))

vi.mock('lucide-react', () => ({
  LoaderCircle: vi.fn(() => <span>Loading...</span>),
}))

describe('ErrorScreen', () => {
  it('renders the error message', () => {
    const errorMessage = 'An error occurred!'
    render(<ErrorScreen errorMessage={errorMessage} retryFn={() => {}} />)

    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })

  it('shows loading indicator when retrying', async () => {
    const retryFn = vi.fn()
    render(<ErrorScreen errorMessage="Error" retryFn={retryFn} />)

    fireEvent.click(screen.getByText(/try again/i))
    expect(screen.getByText(/loading.../i)).toBeInTheDocument()
  })

  it('calls retryFn when button is clicked', async () => {
    const retryFn = vi.fn()
    render(<ErrorScreen errorMessage="Error" retryFn={retryFn} />)

    fireEvent.click(screen.getByText(/try again/i))
    await waitFor(() => expect(retryFn).toHaveBeenCalled())
  })

  it('applies full height class when fullHeight is true', () => {
    const { container } = render(
      <ErrorScreen errorMessage="Error" retryFn={() => {}} fullHeight />
    )

    expect(container.firstChild).toHaveClass('min-h-screen')
  })
})
