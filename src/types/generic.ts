import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  QueryObserverResult,
  RefetchOptions,
} from '@tanstack/react-query'

export type PostResponse = {
  postUrl: string
  imageUrl?: string
  title: string
  description?: string
  time: string
  source?: string
}

export type ApiPostResponse = {
  response: PostResponse[]
  totalPosts: number
  nextPage: number | undefined
}

export type Select = {
  label: string
  value: string
}

export type fetchNextPageType = (
  options?: FetchNextPageOptions | undefined
) => Promise<InfiniteQueryObserverResult<InfiniteData<unknown, unknown>, Error>>

export type refetchQueryType = (
  options?: RefetchOptions | undefined
) => Promise<QueryObserverResult<InfiniteData<unknown, unknown>, Error>>
