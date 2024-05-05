import { AxiosError, HttpStatusCode } from 'axios'

/**
 *
 * @param dateString as string
 * @returns returns date if date greater than a year other returns date in ago format
 */
export function prettifyDate(dateString: string): string {
  // Parse the date string into a Date object
  const date = new Date(dateString)

  // Get the current time in milliseconds
  const now = new Date().getTime()

  // Calculate the difference in milliseconds
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
  if (error.response) {
    // if the response is between (5xx, 4xx)
    const errorMessage = getErrorResponse(error)
    return errorMessage
  }
  if (error.request) {
    // The client never received a response, like in the case of no internet etc.
    if (error.message === 'Network Error') {
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
      return HttpStatusCode.BadRequest
    case 401:
      return HttpStatusCode.Unauthorized
    case 403:
      return HttpStatusCode.Forbidden
    case 404:
      return HttpStatusCode.NotFound
    case 500:
      return HttpStatusCode.InternalServerError
    case 502:
      return HttpStatusCode.BadGateway
    default:
      return 'Something went wrong'
  }
}
