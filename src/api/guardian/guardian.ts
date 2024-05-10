import { GUARDIAN_ENDPOINT, PAGE_SIZE } from '@/utils/constants'
import { handleErrors, prettifyDate, sanitizeHTML } from '@/utils'
import { GuardianApiResponse, GuardianArticles } from '@/types/guardian'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { ApiPostResponse, PostResponse } from '@/types/generic'

const guardianAuthToken = import.meta.env.VITE_GUARDIAN_API_KEY || ''

export const getEverythingGuardianPosts = async ({
  pageParam = 1,
  searchQuery = '',
}): Promise<ApiPostResponse> => {
  const queryString = searchQuery ? 'q=' + searchQuery : ''
  try {
    const response: AxiosResponse = await axios.get(
      `${GUARDIAN_ENDPOINT}?${queryString}&api-key=${guardianAuthToken}&page=${pageParam}&page-size=${PAGE_SIZE}&show-fields=thumbnail,trailText,publication&order-by=relevance`
    )

    const data: GuardianApiResponse = response.data
    /* returning a standarize object. It's always a good practice. Because you don't have to worry about the backend api change. You'll only
       need to change in 1 place + there's no clutter
    */
    const res: PostResponse[] = data.response.results.map(
      (el: GuardianArticles) => {
        return {
          postUrl: el?.webUrl,
          imageUrl: el?.fields?.thumbnail,
          title: el?.webTitle,
          description: sanitizeHTML(el?.fields?.trailText),
          time: prettifyDate(el?.webPublicationDate),
          source: el?.fields?.publication,
        }
      }
    )

    const totalPosts = data.response.total

    return {
      response: res,
      totalPosts: totalPosts,
      nextPage:
        (pageParam + 1) * res.length < totalPosts ? pageParam + 1 : undefined,
    }
  } catch (err: unknown) {
    const errorMessage = handleErrors(err as AxiosError)
    throw new Error(errorMessage as string)
  }
}
