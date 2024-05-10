import { render, screen } from '@testing-library/react'
import NotFound from './NotFound'
import { MemoryRouter } from 'react-router-dom'

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')), // use actual for all non-hook parts
  useNavigate: () => vi.fn(), // mock useNavigate to a dummy function
}))

describe('NotFound', () => {
  test('Page is rendering', async () => {
    render(<NotFound />)
    // ASSERT
    expect(screen.getByText(/You seems lost/i)).toBeInTheDocument()
  })

  test('Renders not found page if invalid path', async () => {
    render(
      <MemoryRouter initialEntries={['/this-route-does-not-exist']}>
        <NotFound />
      </MemoryRouter>
    )
    // ASSERT
    expect(screen.getByText(/You seems lost/i)).toBeInTheDocument()
  })
})
