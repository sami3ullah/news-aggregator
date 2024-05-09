// // Import necessary utilities from React Testing Library and Vitest
// import { render, screen, waitFor } from '@testing-library/react'
// import { describe, it, expect, vi, beforeEach } from 'vitest'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import PostsWrapper from './PostsWrapper' // Adjust the import path as necessary
// import * as usePostStoreModule from '@/store/posts'
// import * as guardianApi from '@/api/guardian/guardian'
// import * as newsApi from '@/api/news-api/newsApi'
// import * as newyorkTimesApi from '@/api/newyork-times/newyork'

// // Mock the store and API calls
// vi.mock('@/store/posts', () => ({
//   usePostStore: vi.fn(),
// }))
// vi.mock('@/api/guardian/guardian')
// vi.mock('@/api/news-api/newsApi')
// vi.mock('@/api/newyork-times/newyork')

// describe('PostsWrapper', () => {
//   let queryClient = new QueryClient()

//   beforeEach(() => {
//     queryClient = new QueryClient()
//     // Reset mocks before each test
//     vi.resetAllMocks()
//   })

//   it('renders loading state correctly', async () => {
//     // Mock store and API behavior for this test case
//     usePostStoreModule.usePostStore.mockImplementation(() => ({
//       searchQuery: '',
//       appliedPostFilters: null,
//       setPosts: vi.fn(),
//     }))
//     // Mock the infinite query to simulate loading state
//     vi.spyOn(
//       require('@tanstack/react-query'),
//       'useInfiniteQuery'
//     ).mockReturnValue({
//       isLoading: true,
//       data: undefined,
//       fetchNextPage: vi.fn(),
//       hasNextPage: false,
//       isFetchingNextPage: false,
//       refetch: vi.fn(),
//       error: null,
//     })

//     render(
//       <QueryClientProvider client={queryClient}>
//         <PostsWrapper />
//       </QueryClientProvider>
//     )

//     // Check for loading text or spinner
//     expect(screen.getByText(/loading/i)).toBeInTheDocument()
//   })

//   // Add more tests here to cover different states and behaviors
// })
