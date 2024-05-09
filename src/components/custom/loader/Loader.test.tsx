import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Loader from './Loader'

describe('Loader component', () => {
  it('renders and displays the loading icon', () => {
    render(<Loader />)
    const loadingIcon = screen.getByTestId('spinner')
    expect(loadingIcon).toBeInTheDocument()
    expect(loadingIcon).toHaveClass('animate-spin w-12')
  })
})
