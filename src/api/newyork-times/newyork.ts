import { NEWYORK_TIMES_ENDPOINT, PAGE_SIZE } from '@/utils/constants'
import { handleErrors, prettifyDate } from '@/utils'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { ApiPostResponse, PostResponse } from '@/types/generic'

const newsApiAuthToken = import.meta.env.VITE_NEWYORK_TIMES_API_KEY || ''
console.log(newsApiAuthToken)

export const getEverythingNewyorkTimesPosts = async ({
  pageParam = 1,
  searchQuery = '',
}): Promise<ApiPostResponse> => {
  const queryString = searchQuery ? 'q=' + searchQuery : ''

  try {
    const response: AxiosResponse = await axios.get(
      `${NEWYORK_TIMES_ENDPOINT}?${queryString}&api-key=${newsApiAuthToken}&page=${pageParam}`
    )

    const data: NewyorkTimesResponse = response.data
    /* returning a standarize object. It's always a good practice. Because you don't have to worry about the backend api change. You'll only
    need to change in 1 place + there's no clutter
    */
    console.log(data)
    const res: PostResponse[] = data?.response?.docs?.map(
      (el: NewyorkTimesArticles) => {
        return {
          postUrl: el.web_url,
          imageUrl: `http://www.nytimes.com/${el.multimedia[0].url}`,
          title: el.abstract,
          description: el.lead_paragraph,
          time: prettifyDate(el.pub_date),
          source: el.source,
        }
      }
    )

    // Limit the number of results to PAGE_SIZE as newyorktimes api doesn't have page-size
    // console.log(pageParam * PAGE_SIZE, res.length)
    const limitedRes = res.slice(0, PAGE_SIZE)
    const totalPosts = data?.response?.meta?.hits

    return {
      response: limitedRes,
      totalPosts: totalPosts,
      prevPage: pageParam * res.length < totalPosts ? pageParam + 1 : undefined,
    }
  } catch (err: unknown) {
    const errorMessage = handleErrors(err as AxiosError)
    throw new Error(errorMessage as string)
  }
}
