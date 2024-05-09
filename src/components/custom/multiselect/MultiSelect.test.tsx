import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'
import Multiselect from './MultiSelect' // Adjust the import path according to your file structure
import { sources } from '@/utils/constants/sources'

describe('Multiselect', () => {
  it('renders the component', () => {
    render(<Multiselect name="Test" values={[]} setValue={vi.fn()} />)
    expect(screen.getByTestId(/test/i)).toBeInTheDocument()
  })

  it('handles keyboard interactions correctly', () => {
    const setValueMock = vi.fn()
    const initialSource = sources[0]
    render(
      <Multiselect
        name="Test"
        values={[initialSource]}
        setValue={setValueMock}
      />
    )

    const input = screen.getByPlaceholderText(/select sources/i)
    fireEvent.keyDown(input, { key: 'Backspace' })
    expect(setValueMock).toHaveBeenCalledWith([])
  })

  it('allows adding an item', async () => {
    const firstSource = sources[0]
    const setValueMock = vi.fn()
    render(
      <Multiselect name="Test" values={[firstSource]} setValue={setValueMock} />
    )

    fireEvent.click(screen.getByPlaceholderText(/select sources/i))
    fireEvent.click(screen.getByText(firstSource.label))

    expect(screen.findByText(firstSource.label)).toBeTruthy()
  })

  it('allows removing an item', async () => {
    const initialSource = sources[0]
    const setValueMock = vi.fn()
    render(
      <Multiselect
        name="Test"
        values={[initialSource]}
        setValue={setValueMock}
      />
    )

    fireEvent.click(screen.getByTestId('remove button'))
    expect(setValueMock).toHaveBeenCalledWith([])
  })
})
