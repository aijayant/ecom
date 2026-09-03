import apiClient from '../../../api/client'

/**
 * Auth API — maps to Spring Boot AuthController endpoints.
 *
 * All functions return the raw axios response (unwrapped in hooks/useAuth.js).
 * Endpoint paths should match your @RequestMapping in AuthController.
 */

/**
 * POST /auth/login
 * @param {{ loginId: string, password: string }} credentials
 */
export const login = (credentials) =>
  apiClient.post('/auth/login', credentials)

/**
 * POST /auth/register
 * @param {{ fullName: string, email: string, password: string }} data
 */
export const register = (data) =>
  apiClient.post('/auth/register', data)

/**
 * POST /auth/refresh
 * Sends an empty payload; the HttpOnly cookie is attached automatically by the browser.
 */
export const refreshToken = () =>
  apiClient.post('/auth/refresh', {}, { withCredentials: true })

/**
 * POST /auth/logout
 * Server-side session/token invalidation (if implemented).
 */
export const logout = () =>
  apiClient.post('/auth/logout')
