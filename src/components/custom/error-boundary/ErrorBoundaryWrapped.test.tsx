import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import ErrorBoundaryWrapped from './ErrorBoundaryWrapped'
import '@testing-library/jest-dom'

type ErrorProps = {
  errorMessage: string
  retryFn: () => void
}

// Mock the ErrorScreen component to simplify testing
vi.mock('../error-screen/ErrorScreen', () => ({
  default: ({ errorMessage, retryFn }: ErrorProps) => (
    <div>
      <div>Mocked Error Screen: {errorMessage}</div>
      <button onClick={retryFn}>Retry</button>
    </div>
  ),
}))

// Helper component to simulate an error
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div>No error</div>
}

describe('ErrorBoundaryWrapped', () => {
  it('renders children without errors', () => {
    render(
      <ErrorBoundaryWrapped>
        <div>Child component</div>
      </ErrorBoundaryWrapped>
    )
    expect(screen.getByText('Child component')).toBeInTheDocument()
  })

  it('displays custom error message when an error is thrown', () => {
    const customErrorMessage = 'Custom error message'
    render(
      <ErrorBoundaryWrapped error={customErrorMessage}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundaryWrapped>
    )
    expect(screen.getByText(/custom error message/i)).toBeInTheDocument()
  })

  it('displays default error message when no error is provided', () => {
    render(
      <ErrorBoundaryWrapped>
        <ThrowError shouldThrow={true} />
      </ErrorBoundaryWrapped>
    )
    expect(screen.getByText(/Something wrong happened/i)).toBeInTheDocument()
  })
})
