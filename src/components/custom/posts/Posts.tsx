import Post from '@/components/custom/post/Post'
import React from 'react'
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  QueryObserverResult,
  RefetchOptions,
} from '@tanstack/react-query'
import ErrorBoundaryWrapped from '../error-boundary/ErrorBoundaryWrapped'
import Loader from '../loader/Loader'
import LoadMore from '../load-more/LoadMore'
import ErrorScreen from '../error-screen/ErrorScreen'
import usePostStore from '@/store/posts'

type Props = {
  isLoading: boolean
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<unknown, unknown>, Error>
  >
  hasNextPage: boolean
  isFetchingNextPage: boolean
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<InfiniteData<unknown, unknown>, Error>>
  error: Error | null
}
const Posts = ({
  isLoading,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  refetch,
  error,
}: Props) => {
  const posts = usePostStore((state) => state.posts)

  return (
    <div>
      {!!isLoading ? (
        <Loader />
      ) : (
        <ErrorBoundaryWrapped error={error?.message}>
          <div>
            {/* posts display */}
            <div className="flex gap-4 flex-wrap">
              {!!posts &&
                !!posts?.length &&
                posts?.map((article, index) => (
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
            {/* Error handling */}
            {!error ||
              (error?.message && (
                <div className="my-12">
                  <ErrorScreen
                    errorMessage={error?.message}
                    retryFn={() => refetch()}
                  />
                </div>
              ))}
            {/* load more */}
            {!error?.message && (
              <LoadMore
                articles={posts}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                fetchNextPage={fetchNextPage}
              />
            )}

            {/* if no results found */}
            {!!posts && posts?.length === 0 && (
              <div className="flex items-center justify-center min-h-[50vh]">
                <h3 className="text-xl md:text-3xl">Wow, soo empty \(o_o)/</h3>
              </div>
            )}
          </div>
        </ErrorBoundaryWrapped>
      )}
    </div>
  )
}

export default Posts
