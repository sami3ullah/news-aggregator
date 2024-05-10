import React from 'react'
import Posts from '../posts/Posts'
import usePostStore from '@/store/posts'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getInitialPageParams, getNextParams, getPostsData } from '@/utils'

const PostsWrapper = () => {
  const searchQuery = usePostStore((state) => state.searchQuery)
  const appliedPostFilters = usePostStore((state) => state.appliedPostFilters)
  const setPosts = usePostStore((state) => state.setPosts)

  // Api call here
  const {
    isLoading,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    error,
  } = useInfiniteQuery({
    queryKey: ['posts', searchQuery, appliedPostFilters],
    //@ts-ignore -> known type issue in react query v5
    queryFn: ({ pageParam }) => getPostsData(pageParam),
    initialPageParam: getInitialPageParams(),
    getNextPageParam: (lastPage) => getNextParams(lastPage),
  })

  // setting posts  to global state
  React.useEffect(() => {
    if (data) {
      setPosts(data)
    }
  }, [data])

  return (
    <div data-testid="posts-wrapper">
      <Posts
        isLoading={isLoading}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        refetch={refetch}
        error={error}
      />
    </div>
  )
}

export default PostsWrapper
