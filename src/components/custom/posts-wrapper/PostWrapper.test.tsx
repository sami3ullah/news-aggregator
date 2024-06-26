import { render, screen } from '@testing-library/react'
import PostsWrapper from './PostsWrapper'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/utils/reactQueryConfig'

describe('PostsWrapper', () => {
  it('renders the component', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <PostsWrapper />
      </QueryClientProvider>
    )

    expect(screen.getByTestId('posts-wrapper')).toBeInTheDocument()
  })
})
