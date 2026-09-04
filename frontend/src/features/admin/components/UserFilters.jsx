import React from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'

/**
 * UserFilters — Search input + Role/Status dropdowns + Filters button.
 *
 * All filter values are controlled by the parent page via props.
 * This component is purely presentational — it doesn't manage its own state.
 *
 * @param {Object} props
 * @param {string} props.searchQuery - Current search text
 * @param {Function} props.onSearchChange - Called when search text changes
 * @param {string} props.roleFilter - Current role filter value
 * @param {Function} props.onRoleChange - Called when role filter changes
 * @param {string} props.statusFilter - Current status filter value
 * @param {Function} props.onStatusChange - Called when status filter changes
 */
const UserFilters = ({
  searchQuery = '',
  onSearchChange,
  roleFilter = '',
  onRoleChange,
  statusFilter = '',
  onStatusChange,
}) => {
  return (
    <div className="flex items-center gap-3 mb-4">
      {/* ── Search Input ───────────────────────────────────────────── */}
      <div className="relative flex-1">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder="Search users by name, email, or ID..."
          className="w-full pl-9 pr-4 py-2.5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-sm text-on-surface placeholder:text-on-surface-variant/60 outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/40 transition-all"
        />
      </div>

      {/* ── Role Dropdown ──────────────────────────────────────────── */}
      <select
        value={roleFilter}
        onChange={(e) => onRoleChange?.(e.target.value)}
        className="px-4 py-2.5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-sm text-on-surface outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/40 transition-all cursor-pointer appearance-none min-w-[130px]"
      >
        <option value="">All Roles</option>
        <option value="ADMIN">Admin</option>
        <option value="USER">User</option>
        <option value="MANAGER">Manager</option>
      </select>

      {/* ── Status Dropdown ────────────────────────────────────────── */}
      <select
        value={statusFilter}
        onChange={(e) => onStatusChange?.(e.target.value)}
        className="px-4 py-2.5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-sm text-on-surface outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/40 transition-all cursor-pointer appearance-none min-w-[130px]"
      >
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="disabled">Disabled</option>
      </select>

      {/* ── Filters Button ─────────────────────────────────────────── */}
      <button className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-sm text-on-surface-variant hover:bg-surface-container-low transition-colors">
        <SlidersHorizontal size={14} />
        Filters
      </button>
    </div>
  )
}

export default UserFilters
