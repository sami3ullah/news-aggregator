import { create } from 'zustand'

export type PostStoreKey = {
  posts: Array<any>
}

const usePostStore = create((set) => ({
  posts: [],
  onFetchPosts: (postsData: any) => {
    set((state: PostStoreKey) => {
      return {
        ...state,
        posts: { ...state.posts, ...postsData },
      }
    })
  },
}))

export default usePostStore
