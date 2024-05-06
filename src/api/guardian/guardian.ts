import { GUARDIAN_ENDPOINT } from '@/utils/constants'
import { handleErrors, prettifyDate, sanitizeHTML } from '@/utils'
import { GuardianApiResponse, GuardianArticles } from '@/types/guardian'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { ApiPostResponse, PostResponse } from '@/types/generic'

const guardianAuthToken = import.meta.env.VITE_GUARDIAN_API_KEY || ''

export const getEverythingGuardianPosts = async (
  page = 0,
  query = ''
): Promise<ApiPostResponse> => {
  const queryString = query ? 'q=' + query : ''
  try {
    const response: AxiosResponse = await axios.get(
      `${GUARDIAN_ENDPOINT}?${queryString}&api-key=${guardianAuthToken}&page=${page}&show-fields=thumbnail,trailText,publication&page-size=20&order-by=relevance`
    )

    const data: GuardianApiResponse = response.data
    /* returning a standarize object. It's always a good practice. Because you don't have to worry about the backend api change. You'll only
       need to change in 1 place + there's no clutter
    */
    const res: PostResponse[] = data.response.results.map(
      (el: GuardianArticles) => {
        return {
          postUrl: el.webUrl,
          imageUrl: el.fields?.thumbnail,
          title: el.webTitle,
          description: sanitizeHTML(el.fields?.trailText),
          time: prettifyDate(el.webPublicationDate),
          source: el.fields?.publication,
        }
      }
    )

    return { response: res, totalPosts: data.response.total, prevPage: page }
  } catch (err: unknown) {
    const errorMessage = handleErrors(err as AxiosError)
    throw new Error(errorMessage as string)
  }
}
