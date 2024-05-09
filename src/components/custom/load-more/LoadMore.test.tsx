// LoadMore.test.tsx
import { describe, expect, it, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import LoadMore from './LoadMore'

const dummyData = [
  {
    postUrl: 'https://www.dummy.com',
    imageUrl: 'https://dummy.com',
    title: 'Dummy',
    description: 'sdfaeg sag sarg sg ',
    time: '2012-02-03',
    source: 'BBC',
  },
]

describe('LoadMore Component', () => {
  const mockFetchNextPage = vi.fn()

  it('renders the button when there are articles and a next page', () => {
    render(
      <LoadMore
        articles={dummyData}
        hasNextPage={true}
        isFetchingNextPage={false}
        fetchNextPage={mockFetchNextPage}
      />
    )
    expect(screen.getByText('Load More')).toBeInTheDocument()
  })

  it('does not render the button when there are no articles', () => {
    render(
      <LoadMore
        articles={[]}
        hasNextPage={true}
        isFetchingNextPage={false}
        fetchNextPage={mockFetchNextPage}
      />
    )

    expect(screen.queryByText('Load More')).not.toBeInTheDocument()
  })

  it('shows "Loading more..." with a spinner when fetching the next page', () => {
    render(
      <LoadMore
        articles={dummyData}
        hasNextPage={true}
        isFetchingNextPage={true}
        fetchNextPage={mockFetchNextPage}
      />
    )

    expect(screen.getByText('Loading more...')).toBeInTheDocument()
    expect(screen.getByTestId('spinbutton')).toHaveClass('animate-spin')
  })

  it('calls fetchNextPage when the button is clicked', () => {
    render(
      <LoadMore
        articles={dummyData}
        hasNextPage={true}
        isFetchingNextPage={false}
        fetchNextPage={mockFetchNextPage}
      />
    )

    fireEvent.click(screen.getByText('Load More'))
    expect(mockFetchNextPage).toHaveBeenCalled()
  })
})
