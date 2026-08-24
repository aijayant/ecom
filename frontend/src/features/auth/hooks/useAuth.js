import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import * as authApi from '../api/authApi'
import {
  setToken,
  setRefreshToken,
  clearTokens,
  isAuthenticated,
} from '../../../core/security/utils/tokenUtils'

/**
 * useAuth — central authentication hook.
 *
 * Manages login, register, and logout state.
 * Persists tokens via tokenUtils.
 *
 * Usage:
 *   const { login, register, logout, isLoading, error, user } = useAuth()
 *
 * TODO: Wrap with React Context (AuthProvider) when global auth state is needed.
 */
export const useAuth = () => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError]         = useState(null)

  // ─── Login ─────────────────────────────────────────────────────────────────
  const login = useCallback(async (credentials) => {
    setIsLoading(true)
    setError(null)
    try {
      const { data } = await authApi.login(credentials)
      setToken(data.accessToken)
      if (data.refreshToken) setRefreshToken(data.refreshToken)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message ?? 'Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [navigate])

  // ─── Register ──────────────────────────────────────────────────────────────
  const register = useCallback(async (userData) => {
    setIsLoading(true)
    setError(null)
    try {
      const { data } = await authApi.register(userData)
      setToken(data.accessToken)
      if (data.refreshToken) setRefreshToken(data.refreshToken)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message ?? 'Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [navigate])

  // ─── Logout ────────────────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    try {
      await authApi.logout()
    } catch {
      // Ignore server errors — clear tokens regardless
    } finally {
      clearTokens()
      navigate('/login')
    }
  }, [navigate])

  return {
    login,
    register,
    logout,
    isLoading,
    error,
    isAuthenticated: isAuthenticated(),
  }
}
