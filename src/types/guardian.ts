export type GuardianApiResponse = {
  response: Response
}

type Response = {
  status: string
  userTier: string
  total: number
  startIndex: number
  pageSize: number
  currentPage: number
  pages: number
  orderBy: string
  results: GuardianArticles[]
}

export type GuardianArticles = {
  id: string
  type: string
  sectionId: string
  sectionName: string
  webPublicationDate: string
  webTitle: string
  webUrl: string
  apiUrl: string
  fields?: Fields
  isHosted: boolean
  pillarId: string
  pillarName: string
}

interface Fields {
  headline: string
  standfirst: string
  trailText: string
  byline: string
  main: string
  body: string
  newspaperPageNumber: string
  wordcount: string
  commentCloseDate: string
  commentable: string
  firstPublicationDate: string
  isInappropriateForSponsorship: string
  isPremoderated: string
  lastModified: string
  newspaperEditionDate: string
  productionOffice: string
  publication: string
  shortUrl: string
  shouldHideAdverts: string
  showInRelatedContent: string
  thumbnail: string
  legallySensitive: string
  lang: string
  isLive: string
  bodyText: string
  charCount: string
  shouldHideReaderRevenue: string
  bylineHtml: string
}
