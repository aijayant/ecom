import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isAuthenticated } from '../utils/tokenUtils'

/**
 * ProtectedRoute
 *
 * Wraps any route that requires authentication.
 * If the user is not logged in, they are redirected to /login.
 * The `redirectTo` prop allows overriding the fallback destination.
 *
 * Usage in AppRoutes:
 *   <Route element={<ProtectedRoute />}>
 *     <Route path="/profile" element={<ProfilePage />} />
 *     <Route path="/dashboard" element={<DashboardPage />} />
 *   </Route>
 */
const ProtectedRoute = ({ redirectTo = '/login' }) => {
  return isAuthenticated() ? <Outlet /> : <Navigate to={redirectTo} replace />
}

export default ProtectedRoute
