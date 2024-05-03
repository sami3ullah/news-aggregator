import { render, screen } from '@testing-library/react'
import NotFound from './NotFound'
import { MemoryRouter } from 'react-router-dom'

describe('NotFound', () => {
  test('Not found page is rendering', async () => {
    render(<NotFound />)
    // ASSERT
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  test('Renders not found page if invalid path', async () => {
    render(
      <MemoryRouter initialEntries={['/this-route-does-not-exist']}>
        <NotFound />
      </MemoryRouter>
    )
    // ASSERT
    expect(screen.getByText(/not found/i)).toBeInTheDocument()
  })
})
