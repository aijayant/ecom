import React from 'react'
import { createBrowserRouter, Outlet } from 'react-router-dom'

// ─── Core UI ─────────────────────────────────────────────────────────────────
import { Navbar } from '../core/ui'
import ProtectedRoute from '../core/security/components/ProtectedRoute'
import Footer from '../shared/components/Footer/Footer'
import AdminSidebar from '../shared/components/AdminSidebar/AdminSidebar'
import AdminHeader from '../shared/components/AdminHeader/AdminHeader'

/**
 * Layout wrappers for different sections of the application.
 *
 * Each layout defines the visual "shell" (navbar, sidebar, footer, etc.)
 * that wraps the pages rendered inside it via React Router's <Outlet />.
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

/**
 * AdminLayout — renders the dark sidebar on the left, header on top,
 * and the routed admin page content in the center.
 */
const AdminLayout = () => (
  <div className="flex min-h-screen bg-surface">
    <AdminSidebar />
    <div className="flex-1 flex flex-col min-w-0">
      <AdminHeader />
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
      {/* Admin Footer */}
      <footer className="px-6 py-3 border-t border-outline-variant/30 flex items-center justify-between text-[11px] text-on-surface-variant">
        <span>© 2024 ECom Admin. All rights reserved.</span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          System operational
        </span>
      </footer>
    </div>
  </div>
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
        element: <ProtectedRoute requiredRole="ADMIN" />,
        children: [
          { 
            path: '/admin', 
            lazy: () => import('../features/admin/pages/AdminPage').then(m => ({ Component: m.default })) 
          },
          { 
            path: '/admin/users', 
            lazy: () => import('../features/admin/pages/UsersPage').then(m => ({ Component: m.default })) 
          },
        ],
      },
    ],
  },
]);

