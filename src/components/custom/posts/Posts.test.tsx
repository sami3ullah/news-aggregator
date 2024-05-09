// import React from 'react'
// import { describe, it, expect, vi, beforeEach } from 'vitest'
// import { render, screen, fireEvent } from '@testing-library/react'
// import Posts from './Posts'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import usePostStore from '@/store/posts'

// // Mock the usePostStore hook
// vi.mock('@/store/posts', () => ({
//   usePostStore: vi.fn(),
// }))

// // Setup a query client for testing
// const queryClient = new QueryClient()

// const wrapper = ({ children }: { children: React.ReactNode }) => (
//   <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
// )

// describe('Posts Component', () => {
//   beforeEach(() => {
//     // Reset the mock before each test
//     vi.resetAllMocks()
//     // Provide a default implementation for the mock
//     usePostStore.mockImplementation(() => ({
//       posts: [],
//     }))
//   })

//   it('renders loader when loading', () => {
//     render(
//       <Posts
//         isLoading={true}
//         fetchNextPage={() => Promise.resolve()}
//         hasNextPage={false}
//         isFetchingNextPage={false}
//         refetch={() => Promise.resolve()}
//         error={null}
//       />,
//       { wrapper }
//     )
//     expect(screen.getByText(/loading/i)).toBeInTheDocument()
//   })

//   it('renders error screen when there is an error', async () => {
//     render(
//       <Posts
//         isLoading={false}
//         fetchNextPage={() => Promise.resolve()}
//         hasNextPage={false}
//         isFetchingNextPage={false}
//         refetch={() => Promise.resolve()}
//         error={new Error('Test Error')}
//       />,
//       { wrapper }
//     )
//     expect(screen.getByText(/test error/i)).toBeInTheDocument()
//     const retryButton = screen.getByRole('button', { name: /retry/i })
//     fireEvent.click(retryButton)
//     // You should implement the refetch mock to verify retry functionality
//   })

//   it('renders posts when available', () => {
//     usePostStore.mockImplementation(() => ({
//       posts: [
//         {
//           postUrl: 'http://example.com/post1',
//           imageUrl: 'http://example.com/image1.jpg',
//           title: 'Post 1',
//           description: 'Description 1',
//           time: '2023-01-01T00:00:00Z',
//           source: 'Source 1',
//         },
//       ],
//     }))
//     render(
//       <Posts
//         isLoading={false}
//         fetchNextPage={() => Promise.resolve()}
//         hasNextPage={true}
//         isFetchingNextPage={false}
//         refetch={() => Promise.resolve()}
//         error={null}
//       />,
//       { wrapper }
//     )
//     expect(screen.getByText('Post 1')).toBeInTheDocument()
//   })

//   it('renders load more button when there are more posts to load', async () => {
//     usePostStore.mockImplementation(() => ({
//       posts: [
//         {
//           postUrl: 'http://example.com/post1',
//           imageUrl: 'http://example.com/image1.jpg',
//           title: 'Post 1',
//           description: 'Description 1',
//           time: '2023-01-01T00:00:00Z',
//           source: 'Source 1',
//         },
//       ],
//     }))
//     render(
//       <Posts
//         isLoading={false}
//         fetchNextPage={() => Promise.resolve()}
//         hasNextPage={true}
//         isFetchingNextPage={false}
//         refetch={() => Promise.resolve()}
//         error={null}
//       />,
//       { wrapper }
//     )
//     expect(screen.getByText(/load more/i)).toBeInTheDocument()
//   })

//   // Add more tests as needed for different states and interactions
// })
