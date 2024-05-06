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
  prevPage: unknown
}
