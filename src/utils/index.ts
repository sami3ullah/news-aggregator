import { AxiosError } from 'axios'
import { DateRange } from 'react-day-picker'
import usePostStore from '@/store/posts'
import { Select } from '@/types/generic'

/**
 *
 * @param dateString as string
 * @returns returns date if date greater than a year other returns date in ago format
 */
export function prettifyDate(dateString: string): string {
  const date = new Date(dateString)
  // Get the current time in milliseconds
  const now = new Date().getTime()
  const difference = now - date.getTime()

  // Calculate the number of seconds, minutes, hours, days, weeks, months and years
  const seconds = Math.floor(difference / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)
  const years = Math.floor(months / 12)

  // Define the output format based on the difference
  if (years > 0) {
    return date.toLocaleDateString('en-US', { year: 'numeric' })
  } else if (months > 0) {
    return `${months} month${months > 1 ? 's' : ''} ago`
  } else if (weeks > 0) {
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`
  } else if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  }
}

/**
 *
 * @param text string
 * @param characters number
 * @returns returns the truncated text with respect to rows
 */
export function truncateTextByChars(text: string, charLimit = 260): string {
  if (text.length <= charLimit) {
    return text // Return original text if it's already shorter than the limit
  } else {
    return text.substring(0, charLimit) + '...' // Truncate text and add ellipsis
  }
}

/**
 *
 * @param error takes an Axios Error
 * @returns respective error message
 */
export const handleErrors = (error: AxiosError) => {
  if (error?.response) {
    // if the response is between (5xx, 4xx)
    const errorMessage = getErrorResponse(error)
    return errorMessage
  }
  if (error?.request) {
    // The client never received a response, like in the case of no internet etc.
    if (error.code === 'ERR_NETWORK') {
      return 'Something wrong with your internet. Please check you internet connection'
    }
    return error.message
  }

  return 'Something unknown happened'
}

const getErrorResponse = (error: AxiosError) => {
  const errorCode = error.response?.status
  switch (errorCode) {
    case 400:
      return 'Bad Request'
    case 401:
      return 'You are unauthorize'
    case 403:
      return "You don't have the permission to access the resource"
    case 404:
      return "The resource you're looking for is not found"
    case 426:
      return 'Please upgrade your API (>_<)'
    case 429:
      return 'Too many requests. slow down :('
    case 500:
      return 'Internal server error'
    case 502:
      return 'Bad Gateway'
    default:
      return 'Something went wrong'
  }
}

/**
 *
 * @param text takes text as string
 * @returns sanitized and clean text without html tags
 */
export const sanitizeHTML = (text: string | undefined): string => {
  // Regular expression to match HTML tags
  const htmlRegex = /<[^>]*>/g

  // Remove HTML tags from the text
  const sanitizedText = text?.replace(htmlRegex, '') ?? ''

  return sanitizedText
}

/**
 *
 * @param date as Date or string
 * @returns date as yyyy-mm-dd format in string
 */
export const formatDateToIsoFormat = (date: Date | undefined): string => {
  // Ensure date is a Date object
  const dateObject = date instanceof Date ? date : new Date(date ?? '')

  // Return date in ISO format
  return dateObject.toISOString()
}

export const makeNewsApiFilters = () => {
  const {
    searchQuery,
    filterPostCategory,
    filterPostDate,
    filterPostSource,
    preferencePostSources,
    preferencePostAuthors,
    preferencePostCategories,
  } = usePostStore.getState()

  let combinedString = ''
  let query = queryFilter(
    searchQuery,
    filterPostCategory,
    preferencePostAuthors,
    preferencePostCategories
  )
  let date = dateFilter(filterPostDate)

  if (query) {
    combinedString += query
  }

  if (date) {
    combinedString += date
  }

  if (filterPostSource) {
    combinedString += getSources(filterPostSource, preferencePostSources)
  }

  return combinedString
}

const queryFilter = (
  searchQuery: string,
  filterPostCategory: string,
  preferencePostAuthors: string,
  preferencePostCategories: string
) => {
  let queryString = ''
  if (searchQuery && filterPostCategory) {
    queryString = `q=(${searchQuery} AND ${filterPostCategory})`
    if (preferencePostAuthors || preferencePostCategories) {
      queryString += ` AND ${formatPreferences(
        preferencePostAuthors,
        preferencePostCategories
      )}`
    }
  } else if (filterPostCategory) {
    queryString = `q=+${filterPostCategory}`
    if (preferencePostAuthors || preferencePostCategories) {
      queryString += ` AND ${formatPreferences(
        preferencePostAuthors,
        preferencePostCategories
      )}`
    }
  } else if (searchQuery) {
    queryString = `q=${searchQuery}`
    if (preferencePostAuthors || preferencePostCategories) {
      queryString += ` AND ${formatPreferences(
        preferencePostAuthors,
        preferencePostCategories
      )}`
    }
  } else {
    if (preferencePostAuthors || preferencePostCategories) {
      queryString += formatPreferences(
        preferencePostAuthors,
        preferencePostCategories
      )
    } else {
      // Failsafe, with newsApi q is a required param
      queryString = `q=random`
    }
  }

  return queryString
}

const getSources = (source: string, sources: Select[]): string => {
  // Create an array with the initial source if it's not empty
  const allSources = source ? [source] : []

  // Add the ids from the sources array to the allSources array if they exist
  sources.forEach((s: Select) => {
    if (s.value) {
      allSources.push(s.value)
    }
  })

  // Join all non-empty sources with commas and prepend with '&sources=' if there are any sources
  return allSources.length > 0 ? `&sources=${allSources.join(',')}` : ''
}

// Function to format authors and categories into a part of the search query
const formatPreferences = (authors: string, categories: string) => {
  // Split, trim, and filter out empty strings for authors if any
  const authorsArray = authors
    .split(',')
    .map((author) => author.trim())
    .filter((author) => author)
  const categoriesArray = categories
    .split(',')
    .map((category) => category.trim())
    .filter((category) => category)
  const combinedPreferences = authorsArray.concat(categoriesArray).join(' OR ')
  return combinedPreferences ? `(${combinedPreferences})` : ''
}

const dateFilter = (date: DateRange | undefined) => {
  let dateFilter = ''
  if (date) {
    if (date.to) {
      return (dateFilter = `&from=${formatDateToIsoFormat(date.from)}&to=${formatDateToIsoFormat(date.to)}`)
    }
    return (dateFilter = `&from=${formatDateToIsoFormat(date.from)}&to=${formatDateToIsoFormat(date.from)}`)
  }
  return dateFilter
}
