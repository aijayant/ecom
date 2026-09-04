/**
 * Token Utilities
 * 
 * Manages JWT tokens in memory. 
 * Storing tokens in variables rather than localStorage prevents XSS attacks from reading them.
 * Note: A full page reload will clear these variables. This is an interim security measure 
 * until the backend implements HttpOnly cookies for the refresh token.
 */

let inMemoryAccessToken = null

export const setToken = (token) => {
  inMemoryAccessToken = token
}

export const getToken = () => inMemoryAccessToken

export const removeToken = () => {
  inMemoryAccessToken = null
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Verifies if the current access token exists and has not expired.
 * Does not verify the JWT signature (that is handled by the backend).
 */
export const isAuthenticated = () => {
  const token = getToken()
  if (!token) return false

  try {
    // Decode the JWT payload (base64) to check the 'exp' (expiration) claim
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.exp * 1000 > Date.now()
  } catch {
    return false
  }
}

/**
 * Clears all token data from memory (used during logout).
 */
export const clearTokens = () => {
  removeToken()
}

/**
 * Extracts the user role from the JWT payload.
 */
export const getUserRole = () => {
  const token = getToken()
  if (!token) return null

  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.role || null
  } catch {
    return null
  }
}
