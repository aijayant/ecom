import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

// ─── Core UI ─────────────────────────────────────────────────────────────────
import Announcement from '../shared/components/Announcement/Announcement'
import { Navbar } from '../core/ui'
import ProtectedRoute from '../core/security/components/ProtectedRoute'
import Footer from '../shared/components/Footer/Footer'

// ─── Pages ───────────────────────────────────────────────────────────────────
import HomePage from '../features/catalog/pages/HomePage'
import LoginPage from '../features/auth/pages/LoginPage'
import ProfilePage from '../features/user/pages/ProfilePage'
import DashboardPage from '../features/user/pages/DashboardPage'
import CartPage from '../features/cart/pages/CartPage'
import AdminPage from '../features/admin/pages/AdminPage'
import PaymentPage from '../features/checkout/pages/PaymentPage'
import PlaceOrderPage from '../features/orders/pages/PlaceOrderPage'

/**
 * AppRoutes — single source of truth for all client-side routing.
 *
 * Layout structure:
 *   <Navbar>                       ← always visible
 *   <Routes>
 *     Public routes
 *     <ProtectedRoute>             ← requires authentication
 *       Private routes
 *
 * To add a new page:
 *   1. Create the page in src/pages/
 *   2. Import it here
 *   3. Add a <Route> in the correct section
 */
const AppRoutes = () => {

  const location = useLocation();

  const isAdminPage = location.pathname === "/admin";
  const isLogin = location.pathname === "/login";

  const hideNavbar = isAdminPage;
  const hidefooter = isAdminPage || isLogin;
  return (
    <>
      {/* <Announcement/> */}
      {!hideNavbar && <Navbar />}


      <main>
        <Routes>

          {/* ── Public routes ──────────────────────────────────────────────── */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* ── Protected routes (require valid JWT) ───────────────────────── */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/order" element={<PlaceOrderPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Route>

        </Routes>
        {!hidefooter && <Footer />}
      </main>
    </>
  )
}

export default AppRoutes
