import { ApiPostResponse, PostResponse, Select } from '@/types/generic'
import { makeNewsApiFilters } from '@/utils'
import { InfiniteData } from '@tanstack/react-query'
import { DateRange } from 'react-day-picker'
import { create } from 'zustand'

export type PostStore = {
  posts: Array<PostResponse>
  searchQuery: string
  filterPostCategory: string
  filterPostSource: string
  filterPostDate: DateRange | undefined
  appliedPostFilters: string
  preferencePostCategories: string
  preferencePostAuthors: string
  preferencePostSources: Select[]
  setPosts: (newPosts: InfiniteData<ApiPostResponse, unknown>) => void
  setSearchQuery: (query: string) => void
  setFilterPostCategory: (text: string) => void
  setFilterPostSource: (text: string) => void
  setFilterPostDate: (date: DateRange | undefined) => void
  setAppliedPostFilters: () => void
  setPreferencePostCategories: (text: string) => void
  setPreferencePostAuthors: (text: string) => void
  setPreferencePostSources: (items: Select[]) => void
  clearFilters: () => void
}

const usePostStore = create<PostStore>((set) => ({
  posts: [],
  searchQuery: '',
  filterPostCategory: '',
  filterPostSource: '',
  appliedPostFilters: '',
  filterPostDate: undefined,
  preferencePostCategories: '',
  preferencePostAuthors: '',
  preferencePostSources: [],

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
      console.log(filters)
      return {
        ...state,
        appliedPostFilters: filters,
      }
    })
  },

  setPreferencePostCategories(text) {
    set((state) => {
      return {
        ...state,
        preferencePostCategories: text,
      }
    })
  },

  setPreferencePostAuthors(text) {
    set((state) => {
      return {
        ...state,
        preferencePostAuthors: text,
      }
    })
  },

  setPreferencePostSources(items) {
    set((state) => {
      return {
        ...state,
        preferencePostSources: items,
      }
    })
  },

  clearFilters() {
    set((state) => {
      return {
        ...state,
        searchQuery: '',
        filterPostCategory: '',
        filterPostSource: '',
        filterPostDate: undefined,
      }
    })
  },
}))

export default usePostStore
