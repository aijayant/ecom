import apiClient from '../../../api/client'

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

/**
 * GET /v1/users
 * Fetch paginated users.
 * @param {Object} params - { page, size, sort }
 */
export const getUsers = (params) =>
  apiClient.get('/v1/users', { params })

/**
 * POST /v1/users
 * Creates a new user.
 */
export const createUser = (payload) =>
  apiClient.post('/v1/users', payload)

/**
 * PUT /v1/users/{id}
 * Updates an existing user.
 */
export const updateUser = (id, payload) =>
  apiClient.put(`/v1/users/${id}`, payload)

/**
 * DELETE /v1/users/{id}
 * Deletes a user.
 */
export const deleteUser = (id) =>
  apiClient.delete(`/v1/users/${id}`)
