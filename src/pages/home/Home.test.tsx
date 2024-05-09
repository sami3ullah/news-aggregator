import { render, screen } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { describe, it, expect } from 'vitest'
import Home from './Home'
import { queryClient } from '@/utils/reactQueryConfig'

describe('Home', () => {
  it('renders correctly', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    )

    expect(screen.getByAltText('logo')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument()
    expect(screen.getByTestId('filters')).toBeInTheDocument()
    expect(screen.getByTestId('posts-wrapper')).toBeInTheDocument()
  })
})
