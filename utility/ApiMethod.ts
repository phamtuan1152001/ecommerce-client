import axios from 'axios'
import { BASE_URL_API_DEV } from "../constants/index"

import { getUserToken } from './common'

const apiMethod = axios.create({
  baseURL: BASE_URL_API_DEV,
  headers: {
    "Authorization": !!getUserToken() ? getUserToken() : ""
  }
})

apiMethod.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data)
    }
    return Promise.reject(error.message)
  }
)
apiMethod.interceptors.request.use(request => {
  return request
})

export default apiMethod
