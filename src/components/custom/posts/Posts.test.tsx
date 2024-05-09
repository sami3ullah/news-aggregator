import { render, waitFor, screen } from '@testing-library/react'
import Posts from './Posts'

// Mock the usePostStore hook
vi.mock('@/store/posts', () => ({
  __esModule: true,
  default: vi.fn(),
}))

describe('Posts Component', () => {
  it('renders the component', () => {
    render(
      <Posts
        isLoading={true}
        fetchNextPage={vi.fn()}
        hasNextPage={false}
        isFetchingNextPage={false}
        refetch={vi.fn()}
        error={null}
      />
    )
    expect(screen.getByTestId('posts')).toBeInTheDocument()
  })
  it('renders loader when isLoading is true', () => {
    render(
      <Posts
        isLoading={true}
        fetchNextPage={vi.fn()}
        hasNextPage={false}
        isFetchingNextPage={false}
        refetch={vi.fn()}
        error={null}
      />
    )
    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })
})
