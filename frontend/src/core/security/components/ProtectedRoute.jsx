import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../../../app/providers'

/**
 * ProtectedRoute
 *
 * Wraps any route that requires authentication.
 * If the user is not logged in, they are redirected to /login.
 */
const ProtectedRoute = ({ redirectTo = '/login' }) => {
  // Use our reactive context instead of reading directly from memory!
  const { isAuthenticated } = useAuthContext()

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} replace />
}

export default ProtectedRoute
