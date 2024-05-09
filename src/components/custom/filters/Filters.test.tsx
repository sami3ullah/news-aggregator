// Filters.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Filters from './Filters'

describe('Filters Component', () => {
  it('should render correctly', () => {
    render(<Filters />)
    expect(screen.getByTestId(/filters/i)).toBeInTheDocument()
  })

  it('should not show "Clear Filters" button when no filters are applied', () => {
    render(<Filters />)
    expect(screen.queryByText(/clear filters/i)).not.toBeInTheDocument()
  })

  it('should open the filter sheet when "Filters Results" is clicked', async () => {
    render(<Filters />)
    fireEvent.click(screen.getByText(/filters results/i))
    expect(screen.getByText(/choose your filters/i)).toBeInTheDocument()
  })
})
