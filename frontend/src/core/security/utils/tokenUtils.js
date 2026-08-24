/**
 * Token utilities — thin wrappers around localStorage.
 *
 * All JWT access/refresh token operations go through here so that
 * the storage strategy (localStorage, sessionStorage, httpOnly cookie)
 * can be swapped in one place.
 */

const ACCESS_TOKEN_KEY = 'ecom_access_token'
const REFRESH_TOKEN_KEY = 'ecom_refresh_token'

// ─── Access Token ────────────────────────────────────────────────────────────

/** Store the JWT access token */
export const setToken = (token) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token)
}

/** Retrieve the JWT access token (null if absent) */
export const getToken = () => localStorage.getItem(ACCESS_TOKEN_KEY)

/** Remove the JWT access token */
export const removeToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}

// ─── Refresh Token ───────────────────────────────────────────────────────────

/** Store the JWT refresh token */
export const setRefreshToken = (token) => {
  localStorage.setItem(REFRESH_TOKEN_KEY, token)
}

/** Retrieve the JWT refresh token (null if absent) */
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY)

/** Remove the JWT refresh token */
export const removeRefreshToken = () => {
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Returns true if a valid (non-expired) access token exists */
export const isAuthenticated = () => {
  const token = getToken()
  if (!token) return false

  try {
    // Decode payload (no signature verification — that's the server's job)
    const payload = JSON.parse(atob(token.split('.')[1]))
    // exp is in seconds; Date.now() is in ms
    return payload.exp * 1000 > Date.now()
  } catch {
    return false
  }
}

/** Clear all auth tokens (used on logout) */
export const clearTokens = () => {
  removeToken()
  removeRefreshToken()
}
