export type NewsApiEverythingRes = {
  status: string
  totalResults: number
  articles: NewApiEverythingArticles[]
}

export type NewApiEverythingArticles = {
  source: Source
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  content: string
}

type Source = {
  id: null | string
  name: string
}

export type NewApiErrorRes = {
  code: string
  message: string
  status: string
}
