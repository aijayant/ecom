import React from 'react'
import { Search, Bell, CircleUserRound } from 'lucide-react'

/**
 * AdminHeader — Top header bar for the admin panel.
 *
 * Renders:
 * - A global search input
 * - Notification bell icon
 * - Help/info icon
 * - Logged-in user's name and avatar
 *
 * This is shared across all admin pages. The search and notifications
 * are static/presentational for now — they'll be wired to real logic later.
 */
const AdminHeader = () => {
  return (
    <header className="h-14 bg-surface-container-lowest border-b border-outline-variant/30 flex items-center justify-between px-6 shrink-0">
      {/* ── Search Input ─────────────────────────────────────────── */}
      <div className="relative w-80">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
        />
        <input
          type="text"
          placeholder="Search everywhere..."
          className="w-full pl-9 pr-4 py-2 bg-surface-container-low rounded-lg text-sm text-on-surface placeholder:text-on-surface-variant/60 border-none outline-none focus:ring-1 focus:ring-primary/30 transition-shadow"
        />
      </div>

      {/* ── Right-side actions ────────────────────────────────────── */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button
          className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors relative"
          aria-label="Notifications"
        >
          <Bell size={18} />
        </button>

        {/* Help / Info */}
        <button
          className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors"
          aria-label="Help"
        >
          <CircleUserRound size={18} />
        </button>

        {/* User Avatar + Name */}
        <div className="flex items-center gap-2.5 ml-2">
          <div className="text-right">
            <p className="text-sm font-medium text-on-surface leading-tight">Alex Morgan</p>
            <p className="text-[11px] text-on-surface-variant leading-tight">Super Admin</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-on-primary text-xs font-bold">AM</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader
