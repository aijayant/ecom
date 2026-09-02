import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

// ─── Core UI ─────────────────────────────────────────────────────────────────
import Announcement from '../Components/Announcement/Announcement'
import { Navbar } from '../core/ui'
import ProtectedRoute from '../core/security/components/ProtectedRoute'
import FooterPage from '../pages/FooterPage'

// ─── Pages ───────────────────────────────────────────────────────────────────
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import ProfilePage from '../pages/ProfilePage'
import DashboardPage from '../pages/DashboardPage'
import CartPage from '../pages/CartPage'
import AdminPage from '../pages/AdminPage'
import PaymentPage from '../pages/PaymentPage'
import PlaceOrderPage from '../pages/PlaceOrderPage'

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
        {!hidefooter && <FooterPage />}
      </main>
    </>
  )
}

export default AppRoutes
