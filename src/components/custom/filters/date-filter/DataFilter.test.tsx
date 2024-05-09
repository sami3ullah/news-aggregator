import { render, fireEvent, screen } from '@testing-library/react'
import DateFilter from './DateFilter'

describe('DateFilter', () => {
  it('renders correctly with default state', () => {
    render(<DateFilter />)

    expect(screen.getByText('Pick a date')).toBeInTheDocument()
  })

  it('opens the calendar popover when the button is clicked', async () => {
    render(<DateFilter />)

    fireEvent.click(screen.getByText('Pick a date'))
    expect(await screen.findByTestId('pick a date')).toBeInTheDocument()
  })
})
