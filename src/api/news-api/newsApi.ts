import { NEWS_API_EVERYTHING_ENDPOINT } from '@/utils/constants'
import { handleErrors, prettifyDate } from '@/utils'
import { NewApiEverythingArticles, NewsApiEverythingRes } from '@/types/newsApi'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { ApiPostResponse } from '@/types/generic'

const newsApiAuthToken = import.meta.env.VITE_NEWS_API_KEY || ''

export const getEveryNewsApiPosts = async (
  query = 'covid',
  querySymbol = ''
): Promise<ApiPostResponse[]> => {
  try {
    const response: AxiosResponse = await axios.get(
      `https://newsapi.org/v2/${NEWS_API_EVERYTHING_ENDPOINT}?q=${querySymbol}${query}&apiKey=${newsApiAuthToken}&pageSize=20&sortBy=publishedAt`
    )

    const data: NewsApiEverythingRes = response.data
    /* returning a standarize object. It's always a good practice. Because you don't have to worry about the backend api change. You'll only
       need to change in 1 place + there's no clutter
    */
    const res = data.articles.map((el: NewApiEverythingArticles) => {
      return {
        postUrl: el.url,
        imageUrl: el.urlToImage,
        title: el.title,
        description: el.description,
        time: prettifyDate(el.publishedAt),
        source: el.source.name,
      }
    })
    return res
  } catch (err: unknown) {
    const errorMessage = handleErrors(err as AxiosError)
    throw new Error(errorMessage as string)
  }
}
