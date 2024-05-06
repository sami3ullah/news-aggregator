type NewyorkTimesResponse = {
  status: string
  copyright: string
  response: ApiResponse
}

type ApiResponse = {
  docs: NewyorkTimesArticles[]
  meta: Meta
}

type Meta = {
  hits: number
  offset: number
  time: number
}

type NewyorkTimesArticles = {
  abstract: string
  web_url: string
  snippet: string
  lead_paragraph: string
  source: string
  multimedia: Multimedia[]
  headline: Headline
  keywords: Keyword[]
  pub_date: string
  document_type: string
  news_desk: string
  section_name: string
  subsection_name: string
  byline: Byline
  _id: string
  word_count: number
  uri: string
  print_section?: string
  print_page?: string
  type_of_material?: string
}

type Byline = {
  original: null | string
  person: Person[]
  organization: null
}

type Person = {
  firstname: string
  middlename: null
  lastname: string
  qualifier: null
  title: null
  role: string
  organization: string
  rank: number
}

type Keyword = {
  name: string
  value: string
  rank: number
  major: string
}

type Headline = {
  main: string
  kicker: null
  content_kicker: null
  print_headline: null | string
  name: null
  seo: null
  sub: null
}

type Multimedia = {
  rank: number
  subtype: string
  caption: null
  credit: null
  type: string
  url: string
  height: number
  width: number
  legacy: Legacy
  subType: string
  crop_name: string
}

type Legacy = {
  xlarge?: string
  xlargewidth?: number
  xlargeheight?: number
  thumbnail?: string
  thumbnailwidth?: number
  thumbnailheight?: number
  widewidth?: number
  wideheight?: number
  wide?: string
}
