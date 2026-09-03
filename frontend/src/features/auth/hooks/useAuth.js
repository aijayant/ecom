import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import * as authApi from '../api/authApi'
import { useAuthContext } from '../../../app/providers'
import {
  setToken,
  clearTokens,
} from '../../../core/security/utils/tokenUtils'

/**
 * useAuth Hook
 * 
 * Central authentication hook managing login, registration, and logout.
 * Leverages TanStack Query for asynchronous state management (loading, error).
 */
export const useAuth = () => {
  const navigate = useNavigate()
  const { setAccessToken, isAuthenticated } = useAuthContext()

  // ─── Login Mutation ────────────────────────────────────────────────────────
  const loginMutation = useMutation({
    mutationFn: (credentials) => authApi.login(credentials),
    onSuccess: ({ data }) => {
      // Sync tokens to in-memory utility storage (for Axios interceptors)
      setToken(data.accessToken)

      // Sync token to React context (for UI reactivity)
      setAccessToken(data.accessToken)

      navigate('/')
    }
  })

  // ─── Register Mutation ─────────────────────────────────────────────────────
  const registerMutation = useMutation({
    mutationFn: (userData) => authApi.register(userData),
    onSuccess: ({ data }) => {
      setToken(data.accessToken)
      setAccessToken(data.accessToken)
      navigate('/')
    }
  })

  // ─── Logout ────────────────────────────────────────────────────────────────
  const logout = async () => {
    try {
      await authApi.logout()
    } catch {
      // Proceed to clear local state even if the server-side logout fails
    } finally {
      clearTokens()
      setAccessToken(null)
      navigate('/login')
    }
  }

  return {
    login: loginMutation.mutate,
    isLoginLoading: loginMutation.isPending,
    loginError: loginMutation.error?.detail || loginMutation.error?.title || loginMutation.error?.message,
    loginFieldErrors: loginMutation.error?.fieldErrors,

    register: registerMutation.mutate,
    isRegisterLoading: registerMutation.isPending,
    registerError: registerMutation.error?.detail || registerMutation.error?.title || registerMutation.error?.message,
    registerFieldErrors: registerMutation.error?.fieldErrors,

    logout,
    isAuthenticated,
  }
}
