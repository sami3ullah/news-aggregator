import React from 'react'
import Posts from '../posts/Posts'
import usePostStore from '@/store/posts'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getEverythingGuardianPosts } from '@/api/guardian/guardian'
import { getEveryNewsApiPosts } from '@/api/news-api/newsApi'
import { getEverythingNewyorkTimesPosts } from '@/api/newyork-times/newyork'

const PostsWrapper = () => {
  const searchQuery = usePostStore((state) => state.searchQuery)
  const filterPostCategory = usePostStore((state) => state.filterPostCategory)
  const filterPostSource = usePostStore((state) => state.filterPostSource)
  const appliedPostFilters = usePostStore((state) => state.appliedPostFilters)
  const setPosts = usePostStore((state) => state.setPosts)

  const queryFunction = ({ pageParam }: { pageParam: number }) => {
    if (filterPostCategory || filterPostSource) {
      return getEveryNewsApiPosts({
        pageParam,
        searchQuery,
        filterPostSource,
        filterPostCategory,
      })
    }
    if (searchQuery) {
      return getEverythingGuardianPosts({
        pageParam,
        searchQuery,
      })
    } else {
      return getEverythingGuardianPosts({
        pageParam,
        searchQuery,
      })
    }
  }

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
    queryFn: queryFunction,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.prevPage,
  })

  // setting posts  to global state
  React.useEffect(() => {
    setPosts(data)
  }, [data])

  return (
    <div>
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
