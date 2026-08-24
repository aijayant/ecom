import axios from 'axios'
import { getToken, removeToken } from '../security/utils/tokenUtils'

/**
 * Centralised Axios instance for all API calls.
 *
 * Base URL is read from the Vite env variable VITE_API_BASE_URL.
 * Fallback: http://localhost:8080/api  (Spring Boot default)
 *
 * Usage:
 *   import apiClient from '@/core/config/apiConfig'
 *   apiClient.get('/products')
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// ─── Request interceptor ────────────────────────────────────────────────────
// Attach JWT bearer token from localStorage on every request (if present)
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

// ─── Response interceptor ───────────────────────────────────────────────────
// Global error handling (401 → redirect to /login, etc.)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeToken()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default apiClient
