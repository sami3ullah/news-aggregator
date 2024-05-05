import { NEWS_API_EVERYTHING_ENDPOINT } from '@/utils/constants'
import { handleErrors } from '@/utils'
import { NewsApiEverythingRes } from '@/types/newsApi'
import axios, { AxiosError } from 'axios'

const newsApiAuthToken = import.meta.env.VITE_NEWS_API_KEY || ''

export const getEveryNewsApiPost = async (
  querySymbol = '',
  query = 'covid'
): Promise<NewsApiEverythingRes> => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/${NEWS_API_EVERYTHING_ENDPOINT}?q=${querySymbol}${query}&apiKey=${newsApiAuthToken}`
    )
    console.log(response)
    const { data } = response?.data
    return data
  } catch (err: unknown) {
    const errorMessage = handleErrors(err as AxiosError)
    throw new Error(errorMessage as string)
  }
}
