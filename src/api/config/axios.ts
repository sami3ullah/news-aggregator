// Adding interceptor, so we can add the base url before calling the API
// This way we don't need to add the based URL again and again
// Also we'll be adding things like tokens, so we don't have to manually add them each time

import axios from 'axios'

const authToken = import.meta.env.VITE_AUTHORIZATION_TOKEN || ''

// setting the URL based on the environment of the app
const url = ''

// creating the axios resource
const APIResource = axios.create()

APIResource.interceptors.request.use(
  (config) => {
    config.url = `${url}${config.url}`
    const accessToken = authToken
    config.headers.Authorization = `Bearer ${accessToken}`
    config.headers['Content-Type'] = `application/json`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export { APIResource }
