import Post from '@/components/custom/post/Post'
import React from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getEveryNewsApiPosts } from '@/api/news-api/newsApi'
import { ApiPostResponse, PostResponse } from '@/types/generic'
import ErrorBoundaryWrapped from '../error-boundary/ErrorBoundaryWrapped'
import Loader from '../loader/Loader'
import LoadMore from '../load-more/LoadMore'
import ErrorScreen from '../error-screen/ErrorScreen'
import { getEverythingGuardianPosts } from '@/api/guardian/guardian'
import { getEverythingNewyorkTimesPosts } from '@/api/newyork-times/newyork'

type Props = {
  searchQuery: string
}

const Posts = ({ searchQuery }: Props) => {
  const {
    isLoading,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    error,
  } = useInfiniteQuery({
    queryKey: ['posts', searchQuery],
    //@ts-ignore -> known type issue in react query v5
    queryFn: ({ pageParam }) =>
      getEverythingNewyorkTimesPosts({
        pageParam,
        searchQuery,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.prevPage,
  })

  const articles = data?.pages?.reduce<PostResponse[]>((acc, page) => {
    return [...acc, ...(page as ApiPostResponse)?.response]
  }, [])

  return (
    <div>
      {!!isLoading ? (
        <Loader />
      ) : (
        <ErrorBoundaryWrapped error={error?.message}>
          <div>
            {/* posts display */}
            <div className="flex gap-4 flex-wrap">
              {!!articles &&
                !!articles?.length &&
                articles?.map((article, index) => (
                  <React.Fragment key={index}>
                    <Post
                      postUrl={article.postUrl}
                      imageUrl={article.imageUrl ?? ''}
                      title={article.title}
                      description={article.description ?? ''}
                      time={article.time}
                      source={article.source ?? 'Unknown'}
                    />
                  </React.Fragment>
                ))}
            </div>
            {/* load more */}
            <LoadMore
              articles={articles}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
            />

            {/* if no results found */}
            {!!articles && articles.length === 0 && (
              <div className="flex items-center justify-center">
                <h3 className="text-2xl">Wow, soo empty :-)</h3>
              </div>
            )}

            {/* Error handling */}
            {!error ||
              (error?.message && (
                <ErrorScreen
                  errorMessage={error?.message}
                  retryFn={() => refetch()}
                />
              ))}
          </div>
        </ErrorBoundaryWrapped>
      )}
    </div>
  )
}

export default Posts
