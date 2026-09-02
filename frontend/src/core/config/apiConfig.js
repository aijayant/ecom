import axios from 'axios'
import { getToken, getRefreshToken, setToken, clearTokens } from '../security/utils/tokenUtils'

/**
 * Global Axios Instance
 * Configures the base URL, default headers, and credentials policy for all API requests.
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
  // Ensures cross-origin requests include credentials (required for HttpOnly cookies)
  withCredentials: true,
})

/**
 * Request Interceptor
 * Automatically attaches the Bearer token to the Authorization header if the user is authenticated.
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Mutex flag to prevent multiple concurrent refresh token requests
let isRefreshing = false

/**
 * Response Interceptor
 * Handles global API errors. Specifically, intercepts 401 Unauthorized responses 
 * and attempts to silently refresh the access token before retrying the original request.
 */
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Proceed if the error is 401 and we haven't already attempted to retry this specific request
    if (error.response?.status === 401 && !originalRequest._retry) {
      
      // If a refresh is already in progress, reject to avoid infinite loops/race conditions
      if (isRefreshing) {
        return Promise.reject(error)
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const refreshToken = getRefreshToken()

        if (!refreshToken) {
          throw new Error('Refresh token not found')
        }

        // Request a new access token using the refresh token
        const { data } = await axios.post(`${apiClient.defaults.baseURL}/auth/refresh`, {
          refreshToken
        }, { withCredentials: true })

        // Update in-memory storage with the new access token
        setToken(data.accessToken)
        
        // Update the failed request's header and retry it
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
        isRefreshing = false
        
        return apiClient(originalRequest)
      } catch (refreshError) {
        // If the refresh request fails (e.g., refresh token is expired), force a logout
        isRefreshing = false
        clearTokens()
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default apiClient
