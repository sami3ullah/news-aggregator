import Post from '@/components/custom/post/Post'
import React from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getEveryNewsApiPosts } from '@/api/news-api/newsApi'
import { Button } from '@/components/ui-library/button'
import { ApiPostResponse, PostResponse } from '@/types/generic'

type Props = {
  searchQuery: string
}

const Posts = ({ searchQuery }: Props) => {
  const querySymbol = ''
  const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['posts', searchQuery],
      queryFn: ({ pageParam = 1 }: { pageParam: number }) =>
        getEveryNewsApiPosts({
          pageParam,
          searchQuery,
          querySymbol,
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.prevPage,
    })

  const articles = data?.pages.reduce<PostResponse[]>((acc, page) => {
    return [...acc, ...(page as ApiPostResponse).response]
  }, [])

  return (
    <div>
      {!!isLoading ? (
        'Loading...'
      ) : (
        <>
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
          <div className="w-full mb-24 mt-12">
            <Button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
              className="w-full px-6 bg-black text-lg uppercase"
            >
              {isFetchingNextPage
                ? 'Loading more...'
                : hasNextPage
                  ? 'Load More'
                  : 'Nothing more to load'}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default Posts
