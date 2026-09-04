import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../../../app/providers'
import { getUserRole } from '../utils/tokenUtils'

/**
 * ProtectedRoute
 *
 * Wraps any route that requires authentication.
 * If the user is not logged in, they are redirected to /login.
 */
const ProtectedRoute = ({ redirectTo = '/login', requiredRole }) => {
  const { isAuthenticated, isBootstrapping } = useAuthContext()

  if (isBootstrapping) {
    return <div className="flex h-screen items-center justify-center text-on-surface">Initializing session...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  if (requiredRole && getUserRole() !== requiredRole) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
