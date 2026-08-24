import apiClient from '../../../core/config/apiConfig'

/**
 * User API — maps to Spring Boot UserController endpoints.
 *
 * Endpoint paths should match your @RequestMapping in UserController.
 */

/**
 * GET /user/profile
 * Returns the profile of the currently authenticated user.
 */
export const getProfile = () =>
  apiClient.get('/user/profile')

/**
 * PUT /user/profile
 * Updates the profile of the currently authenticated user.
 * @param {{ name?: string, email?: string, phone?: string }} data
 */
export const updateProfile = (data) =>
  apiClient.put('/user/profile', data)

/**
 * GET /user/{id}/roles
 * Fetch roles for a specific user (admin-only).
 * @param {string|number} userId
 */
export const getUserRoles = (userId) =>
  apiClient.get(`/user/${userId}/roles`)
