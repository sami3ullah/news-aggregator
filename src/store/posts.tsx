import { ApiEnumType, ApiPostResponse, PostResponse } from '@/types/generic'
import { makeNewsApiFilters } from '@/utils'
import { InfiniteData } from '@tanstack/react-query'
import { DateRange } from 'react-day-picker'
import { create } from 'zustand'

export type PostStore = {
  posts: Array<PostResponse>
  searchQuery: string
  apiType: ApiEnumType
  filterPostCategory: string
  filterPostSource: string
  filterPostDate: DateRange | undefined
  appliedPostFilters: string
  setPosts: (newPosts: InfiniteData<ApiPostResponse, unknown>) => void
  setSearchQuery: (query: string) => void
  setApiType: (apiType: ApiEnumType) => void
  setFilterPostCategory: (text: string) => void
  setFilterPostSource: (text: string) => void
  setFilterPostDate: (date: DateRange | undefined) => void
  setAppliedPostFilters: () => void
  clearFilters: () => void
}

const usePostStore = create<PostStore>((set) => ({
  posts: [],
  searchQuery: '',
  filterPostCategory: '',
  filterPostSource: '',
  appliedPostFilters: '',
  filterPostDate: undefined,
  apiType: ApiEnumType.GUARDIAN,

  setPosts(newPosts: InfiniteData<ApiPostResponse, unknown>) {
    set((state) => {
      // flattening the pages and getting the main content in an array
      const articles = newPosts?.pages?.reduce<PostResponse[]>((acc, page) => {
        return [...acc, ...(page as ApiPostResponse)?.response]
      }, [])

      return {
        ...state,
        posts: articles,
      }
    })
  },

  setSearchQuery(query) {
    set((state) => ({
      ...state,
      searchQuery: query,
    }))
  },

  setApiType(apiType: ApiEnumType) {
    set((state) => ({
      ...state,
      apiType: apiType,
    }))
  },

  setFilterPostCategory(text) {
    set((state) => ({
      ...state,
      filterPostCategory: text,
      filtersApplied: true,
    }))
  },

  setFilterPostSource(text) {
    set((state) => ({
      ...state,
      filterPostSource: text,
      filtersApplied: true,
    }))
  },

  setFilterPostDate(date) {
    set((state) => ({
      ...state,
      filterPostDate: date,
    }))
  },

  setAppliedPostFilters() {
    set((state) => {
      const filters = makeNewsApiFilters()
      return {
        ...state,
        appliedPostFilters: filters,
      }
    })
  },

  clearFilters() {
    set((state) => {
      return {
        ...state,
        searchQuery: '',
        appliedPostFilters: '',
        filterPostCategory: '',
        filterPostSource: '',
        filterPostDate: undefined,
      }
    })
  },
}))

export default usePostStore
