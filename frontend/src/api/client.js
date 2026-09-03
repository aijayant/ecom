import axios from 'axios'
import { getToken, setToken, clearTokens } from '../core/security/utils/tokenUtils'

export class ApiError extends Error {
  constructor(status, title, detail, fieldErrors = {}) {
    super(detail ?? title);
    this.status = status;
    this.title = title;
    this.detail = detail;
    this.fieldErrors = fieldErrors;
  }
}

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

// Mutex flag and queue to prevent multiple concurrent refresh token requests
let isRefreshing = false
let pendingQueue = []

function resolvePending(token) {
  pendingQueue.forEach((resolve) => resolve(token));
  pendingQueue = [];
}

/**
 * Response Interceptor
 * Handles global API errors. Specifically, intercepts 401 Unauthorized responses 
 * and attempts to silently refresh the access token before retrying the original request.
 */
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Proceed if the error is 401, we haven't retried, and it's not an auth request (like login)
    if (
      error.response?.status === 401 && 
      !originalRequest._retry && 
      !originalRequest.url.includes('/auth/login') && 
      !originalRequest.url.includes('/auth/register')
    ) {
      
      // If a refresh is already in progress, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push((token) => {
            if (!token) return reject(error);
            originalRequest._retry = true;
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(apiClient(originalRequest));
          });
        });
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        // Request a new access token (the HttpOnly cookie is attached automatically)
        const { data } = await axios.post(`${apiClient.defaults.baseURL}/auth/refresh`, {}, { 
          withCredentials: true 
        })

        // Update in-memory storage with the new access token
        setToken(data.accessToken)
        
        // Resolve all queued requests with the new token
        resolvePending(data.accessToken)
        
        // Update the failed request's header and retry it
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
        return apiClient(originalRequest)
      } catch (refreshError) {
        // If the refresh request fails, force a logout
        resolvePending(null)
        clearTokens()
        window.location.href = '/login'
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    // Normalize Spring's RFC 9457 ProblemDetail into ApiError
    const problem = error.response?.data ?? {}
    throw new ApiError(
      error.response?.status ?? 0,
      problem.title ?? error.message,
      problem.detail,
      problem.errors ?? {}
    )
  }
)

export default apiClient
