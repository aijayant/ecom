import React from 'react'
import { createBrowserRouter, Outlet } from 'react-router-dom'

// ─── Core UI ─────────────────────────────────────────────────────────────────
import { Navbar } from '../core/ui'
import ProtectedRoute from '../core/security/components/ProtectedRoute'
import Footer from '../shared/components/Footer/Footer'

/**
 * Layout wrappers for different sections of the application
 */
const StorefrontLayout = () => (
  <>
    <Navbar />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
);

const AuthLayout = () => (
  <main className="min-h-screen bg-surface">
    <Outlet />
  </main>
);

const AdminLayout = () => (
  <main>
    <Outlet />
  </main>
);

/**
 * Global Router Configuration
 * Uses React Router v7 Data Router capabilities (`createBrowserRouter`)
 * Native route-level lazy loading prevents shipping the admin/user dashboards to storefront visitors.
 */
export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { 
        path: '/login', 
        lazy: () => import('../features/auth/pages/LoginPage').then(m => ({ Component: m.default })) 
      },
    ],
  },
  {
    element: <StorefrontLayout />,
    children: [
      { 
        path: '/', 
        lazy: () => import('../features/catalog/pages/HomePage').then(m => ({ Component: m.default })) 
      },
      {
        element: <ProtectedRoute />,
        children: [
          { 
            path: '/dashboard', 
            lazy: () => import('../features/user/pages/DashboardPage').then(m => ({ Component: m.default })) 
          },
          { 
            path: '/profile', 
            lazy: () => import('../features/user/pages/ProfilePage').then(m => ({ Component: m.default })) 
          },
          { 
            path: '/cart', 
            lazy: () => import('../features/cart/pages/CartPage').then(m => ({ Component: m.default })) 
          },
          { 
            path: '/order', 
            lazy: () => import('../features/orders/pages/PlaceOrderPage').then(m => ({ Component: m.default })) 
          },
          { 
            path: '/payment', 
            lazy: () => import('../features/checkout/pages/PaymentPage').then(m => ({ Component: m.default })) 
          },
        ],
      },
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { 
            path: '/admin', 
            lazy: () => import('../features/admin/pages/AdminPage').then(m => ({ Component: m.default })) 
          },
        ],
      },
    ],
  },
]);
