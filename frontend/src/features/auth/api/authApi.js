import apiClient from '../../../core/config/apiConfig'

/**
 * Auth API — maps to Spring Boot AuthController endpoints.
 *
 * All functions return the raw axios response (unwrapped in hooks/useAuth.js).
 * Endpoint paths should match your @RequestMapping in AuthController.
 */

/**
 * POST /auth/login
 * @param {{ email: string, password: string }} credentials
 */
export const login = (credentials) =>
  apiClient.post('/auth/login', credentials)

/**
 * POST /auth/register
 * @param {{ name: string, email: string, password: string }} data
 */
export const register = (data) =>
  apiClient.post('/auth/register', data)

/**
 * POST /auth/refresh
 * Sends the stored refresh token to get a new access token.
 * @param {string} refreshToken
 */
export const refreshToken = (refreshToken) =>
  apiClient.post('/auth/refresh', { refreshToken })

/**
 * POST /auth/logout
 * Server-side session/token invalidation (if implemented).
 */
export const logout = () =>
  apiClient.post('/auth/logout')
