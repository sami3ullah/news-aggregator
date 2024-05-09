import { expect } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import Search from './Search'

describe('Search Component', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText } = render(<Search />)
    expect(getByPlaceholderText('Search articles...')).toBeInTheDocument()
  })

  it('updates input value on change', async () => {
    const { getByPlaceholderText } = render(<Search />)
    const input = getByPlaceholderText('Search articles...') as HTMLInputElement // Type assertion here
    fireEvent.change(input, { target: { value: 'test' } })
    expect(input.value).toBe('test')
  })
})
