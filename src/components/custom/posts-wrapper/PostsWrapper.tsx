import React from 'react'
import Posts from '../posts/Posts'
import usePostStore from '@/store/posts'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getEverythingGuardianPosts } from '@/api/guardian/guardian'
import { getEveryNewsApiPosts } from '@/api/news-api/newsApi'
import { getEverythingNewyorkTimesPosts } from '@/api/newyork-times/newyork'
import { PAGE_SIZE } from '@/utils/constants'

const PostsWrapper = () => {
  const searchQuery = usePostStore((state) => state.searchQuery)
  const filterPostCategory = usePostStore((state) => state.filterPostCategory)
  const filterPostSource = usePostStore((state) => state.filterPostSource)
  const filterPostDate = usePostStore((state) => state.filterPostDate)
  const appliedPostFilters = usePostStore((state) => state.appliedPostFilters)
  const setPosts = usePostStore((state) => state.setPosts)

  // deciding which API to use based on different conditions
  const queryFunction = ({ pageParam }: { pageParam: number }) => {
    if (filterPostCategory || filterPostSource || filterPostDate) {
      return getEveryNewsApiPosts({
        pageParam,
      })
    }
    if (searchQuery) {
      return getEverythingGuardianPosts({
        pageParam,
        searchQuery,
      })
    } else {
      return getEverythingNewyorkTimesPosts({
        pageParam,
        searchQuery,
      })
    }
  }

  // initial page number based on the API
  const initialPageParam =
    filterPostCategory || filterPostSource || filterPostDate || searchQuery
      ? 1
      : 0

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
    queryFn: queryFunction,
    initialPageParam: initialPageParam,
    // getNextPageParam: (lastPage) => lastPage.nextPage,
    getNextPageParam: (lastPage) => {
      if (
        lastPage.nextPage &&
        lastPage.nextPage * (PAGE_SIZE + 1) < lastPage.totalPosts
      ) {
        return lastPage.nextPage
      }
      return []
    },
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
