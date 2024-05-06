import { NEWS_API_EVERYTHING_ENDPOINT, PAGE_SIZE } from '@/utils/constants'
import { handleErrors, prettifyDate } from '@/utils'
import { NewApiEverythingArticles, NewsApiEverythingRes } from '@/types/newsApi'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { ApiPostResponse, PostResponse } from '@/types/generic'

const newsApiAuthToken = import.meta.env.VITE_NEWS_API_KEY || ''

export const getEveryNewsApiPosts = async ({
  pageParam = 1,
  searchQuery = '',
  querySymbol = '',
}): Promise<ApiPostResponse> => {
  const queryString = `q=${querySymbol}${searchQuery}`
  // const queryString = `q=jets`
  try {
    const response: AxiosResponse = await axios.get(
      `${NEWS_API_EVERYTHING_ENDPOINT}?${queryString}&apiKey=${newsApiAuthToken}&page=${pageParam}&pageSize=${PAGE_SIZE}&sortBy=relevance`
    )

    const data: NewsApiEverythingRes = response.data
    /* returning a standarize object. It's always a good practice. Because you don't have to worry about the backend api change. You'll only
       need to change in 1 place + there's no clutter
    */
    const res: PostResponse[] = data.articles.map(
      (el: NewApiEverythingArticles) => {
        return {
          postUrl: el.url,
          imageUrl: el.urlToImage,
          title: el.title,
          description: el.description,
          time: prettifyDate(el.publishedAt),
          source: el.source.name,
        }
      }
    )
    return {
      response: res,
      totalPosts: data.totalResults,
      prevPage:
        pageParam * res.length < data.totalResults ? pageParam + 1 : undefined,
    }
  } catch (err: unknown) {
    const errorMessage = handleErrors(err as AxiosError)
    throw new Error(errorMessage as string)
  }
}
