import { Button } from '@/components/ui-library/button'
import { PostResponse } from '@/types/generic'
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query'
import { LoaderCircle } from 'lucide-react'

type Props = {
  articles: PostResponse[]
  hasNextPage: boolean
  isFetchingNextPage: boolean
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<unknown, unknown>, Error>
  >
}

const LoadMore = ({
  articles,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: Props) => {
  return (
    <>
      {!!articles && !!articles.length && hasNextPage && (
        <div className="w-full mb-24 mt-12">
          <Button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            className="w-full px-6 bg-black text-md uppercase"
          >
            {isFetchingNextPage ? (
              <div className="flex gap-2">
                <LoaderCircle className="animate-spin" />
                Loading more...
              </div>
            ) : hasNextPage ? (
              'Load More'
            ) : (
              'Nothing more to load'
            )}
          </Button>
        </div>
      )}
    </>
  )
}

export default LoadMore
