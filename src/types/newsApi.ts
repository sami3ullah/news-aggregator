export type NewsApiEverythingRes = {
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
