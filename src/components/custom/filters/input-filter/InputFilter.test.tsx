// Import necessary utilities from testing libraries
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import InputFilter from './InputFilter'

// Here's a simple mock that calls the function immediately for testing purposes
vi.mock('@/hooks/useDebounce', () => ({
  default: (fn: any) => fn,
}))

describe('InputFilter', () => {
  let setValueMock: any

  beforeEach(() => {
    setValueMock = vi.fn()
  })

  it('renders correctly with initial props', () => {
    render(
      <InputFilter
        name="Test"
        placeholder="Type here..."
        value=""
        setValue={setValueMock}
      />
    )

    expect(screen.getByPlaceholderText('Type here...')).toBeInTheDocument()
    expect(screen.getByLabelText('Test')).toBeInTheDocument()
  })

  it('updates input value on change', async () => {
    render(
      <InputFilter
        name="Test"
        placeholder="Type here..."
        value=""
        setValue={setValueMock}
      />
    )

    const input = screen.getByPlaceholderText('Type here...')
    await act(async () => {
      fireEvent.change(input, { target: { value: 'New value' } })
    })

    expect(input).toHaveValue('New value')
  })

  it('calls setValue with the debounced input value', async () => {
    render(
      <InputFilter
        name="Test"
        placeholder="Type here..."
        value=""
        setValue={setValueMock}
      />
    )

    const input = screen.getByPlaceholderText('Type here...')
    await act(async () => {
      fireEvent.change(input, { target: { value: 'New value' } })
    })

    expect(setValueMock).toHaveBeenCalledWith('New value')
  })

  it('updates input value when prop changes', async () => {
    const { rerender } = render(
      <InputFilter
        name="Test"
        placeholder="Type here..."
        value="Initial"
        setValue={setValueMock}
      />
    )

    expect(screen.getByPlaceholderText('Type here...')).toHaveValue('Initial')

    rerender(
      <InputFilter
        name="Test"
        placeholder="Type here..."
        value="Updated"
        setValue={setValueMock}
      />
    )

    expect(screen.getByPlaceholderText('Type here...')).toHaveValue('Updated')
  })
})
