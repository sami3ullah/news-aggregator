import { NEWS_API_EVERYTHING_ENDPOINT } from '@/utils/constants'
import { handleErrors } from '@/utils'
import { NewsApiEverythingRes } from '@/types/newsApi'
import axios, { AxiosError, AxiosResponse } from 'axios'

const newsApiAuthToken = import.meta.env.VITE_NEWS_API_KEY || ''

type NewsApiResponse = {
  status: string
  totalResults: number
  articles: NewsApiEverythingRes[]
}

export const getEveryNewsApiPosts = async (
  query = 'covid',
  querySymbol = ''
): Promise<NewsApiResponse> => {
  try {
    const response: AxiosResponse = await axios.get(
      `https://newsapi.org/v2/${NEWS_API_EVERYTHING_ENDPOINT}?q=${querySymbol}${query}&apiKey=${newsApiAuthToken}&pageSize=20`
    )

    const data: NewsApiResponse = response.data
    return data
  } catch (err: unknown) {
    const errorMessage = handleErrors(err as AxiosError)
    throw new Error(errorMessage as string)
  }
}
