import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
} from 'lucide-react'

/**
 * AdminSidebar — Dark sidebar navigation for the admin panel.
 *
 * Uses React Router's `NavLink` so the active page is automatically highlighted.
 * This component is shared across all admin pages (Users, Products, Orders, etc.).
 *
 * Each nav item is defined in the `navItems` array below.
 * To add a new admin page, just add a new entry to the array.
 */

const navItems = [
  { to: '/admin',           icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/products',  icon: Package,         label: 'Products' },
  { to: '/admin/orders',    icon: ShoppingCart,     label: 'Orders' },
  { to: '/admin/users',     icon: Users,           label: 'Users' },
  { to: '/admin/analytics', icon: BarChart3,        label: 'Analytics' },
  { to: '/admin/settings',  icon: Settings,        label: 'Settings' },
]

const AdminSidebar = () => {
  return (
    <aside className="w-56 min-h-screen bg-inverse-surface text-inverse-on-surface flex flex-col shrink-0">
      {/* ── Logo / Brand ─────────────────────────────────────────── */}
      <div className="px-5 py-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-on-primary font-bold text-sm">G</span>
          </div>
          <div>
            <h1 className="text-sm font-bold leading-tight">ECom Admin</h1>
            <p className="text-[11px] text-primary-fixed-dim leading-tight">Enterprise CMS</p>
          </div>
        </div>
      </div>

      {/* ── Navigation Links ─────────────────────────────────────── */}
      <nav className="flex-1 px-3 py-2 space-y-0.5">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/admin'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary text-on-primary'
                  : 'text-inverse-on-surface/70 hover:bg-white/10 hover:text-inverse-on-surface'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* ── Footer (version info) ────────────────────────────────── */}
      <div className="px-5 py-4 border-t border-white/10">
        <p className="text-[11px] text-inverse-on-surface/40">v2.4</p>
      </div>
    </aside>
  )
}

export default AdminSidebar
