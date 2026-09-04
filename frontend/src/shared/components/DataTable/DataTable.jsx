import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * DataTable — A reusable, presentational data table component.
 *
 * This component is generic and feature-agnostic. It renders a table with:
 * - Configurable columns (via the `columns` prop)
 * - Optional row selection with checkboxes and a bulk-action bar
 * - Pagination footer with page numbers
 *
 * It does NOT fetch data itself — the parent passes `data` and `pagination` as props.
 * This keeps DataTable reusable across Users, Products, Orders, etc.
 *
 * @param {Object} props
 * @param {Array<{key: string, label: string, render?: Function, width?: string}>} props.columns
 * @param {Array<Object>} props.data - The rows to display
 * @param {boolean} [props.selectable=false] - Enables row checkboxes
 * @param {Set<number|string>} [props.selectedIds] - Currently selected row IDs
 * @param {Function} [props.onSelectionChange] - Callback when selection changes
 * @param {Array<{label: string, icon?: React.ReactNode, variant?: string, onClick: Function, disabled?: boolean}>} [props.bulkActions]
 * @param {{page: number, pageSize: number, totalElements: number, totalPages: number}} [props.pagination]
 * @param {Function} [props.onPageChange] - Callback when page changes
 * @param {string} [props.emptyMessage='No data found.']
 */
const DataTable = ({
  columns = [],
  data = [],
  selectable = false,
  selectedIds = new Set(),
  onSelectionChange,
  bulkActions = [],
  pagination,
  onPageChange,
  emptyMessage = 'No data found.',
  isLoading = false,
}) => {
  // ─── Selection Logic ──────────────────────────────────────────────
  const allSelected = data.length > 0 && data.every((row) => selectedIds.has(row.id))
  const someSelected = data.some((row) => selectedIds.has(row.id))

  /** Toggle all rows on the current page */
  const handleSelectAll = () => {
    if (allSelected) {
      // Deselect all on this page
      const next = new Set(selectedIds)
      data.forEach((row) => next.delete(row.id))
      onSelectionChange?.(next)
    } else {
      // Select all on this page
      const next = new Set(selectedIds)
      data.forEach((row) => next.add(row.id))
      onSelectionChange?.(next)
    }
  }

  /** Toggle a single row */
  const handleSelectRow = (id) => {
    const next = new Set(selectedIds)
    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }
    onSelectionChange?.(next)
  }

  // ─── Pagination Logic ─────────────────────────────────────────────
  const { page = 0, pageSize = 10, totalElements = 0, totalPages = 1 } = pagination || {}
  const startItem = page * pageSize + 1
  const endItem = Math.min((page + 1) * pageSize, totalElements)

  /** Generate an array of page numbers to display (with ellipsis) */
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i)
    }
    const pages = []
    // Always show first page
    pages.push(0)
    if (page > 2) pages.push('...')
    // Show pages around current
    for (let i = Math.max(1, page - 1); i <= Math.min(totalPages - 2, page + 1); i++) {
      pages.push(i)
    }
    if (page < totalPages - 3) pages.push('...')
    // Always show last page
    pages.push(totalPages - 1)
    return pages
  }

  return (
    <div className="w-full">
      {/* ── Bulk Action Bar ─────────────────────────────────────────── */}
      {selectable && selectedIds.size > 0 && (
        <div className="flex items-center justify-between bg-primary/5 border border-primary/20 rounded-lg px-4 py-2.5 mb-3">
          <span className="text-sm font-medium text-primary flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">
              {selectedIds.size}
            </span>
            users selected
          </span>
          <div className="flex items-center gap-2">
            {bulkActions.map((action, i) => (
              <button
                key={i}
                onClick={action.onClick}
                disabled={action.disabled}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  action.variant === 'danger'
                    ? 'bg-error text-on-error hover:bg-error/90 disabled:opacity-50'
                    : 'bg-surface-container-lowest border border-outline-variant text-on-surface hover:bg-surface-container-low disabled:opacity-50'
                }`}
              >
                {action.icon}
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Table ───────────────────────────────────────────────────── */}
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-outline-variant/30">
              {selectable && (
                <th className="w-12 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = someSelected && !allSelected
                    }}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary/30 cursor-pointer"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-left text-xs font-semibold text-on-surface-variant uppercase tracking-wider"
                  style={col.width ? { width: col.width } : undefined}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={`skeleton-${i}`} className="border-b border-outline-variant/20 last:border-b-0">
                  {selectable && (
                    <td className="w-12 px-4 py-3">
                      <div className="w-4 h-4 bg-surface-container-high rounded animate-pulse" />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-4">
                      <div className="h-4 bg-surface-container-high rounded w-3/4 animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="px-4 py-12 text-center text-sm text-on-surface-variant"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={row.id}
                  className={`border-b border-outline-variant/20 last:border-b-0 transition-colors hover:bg-surface-container-low/50 ${
                    selectedIds.has(row.id) ? 'bg-primary/[0.03]' : ''
                  }`}
                >
                  {selectable && (
                    <td className="w-12 px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(row.id)}
                        onChange={() => handleSelectRow(row.id)}
                        className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary/30 cursor-pointer"
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-sm text-on-surface">
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* ── Pagination Footer ────────────────────────────────────── */}
        {pagination && totalElements > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-outline-variant/30">
            <span className="text-sm text-primary font-medium">
              Showing {startItem} to {endItem} of {totalElements.toLocaleString()} users
            </span>
            <div className="flex items-center gap-1">
              {/* Previous Button */}
              <button
                onClick={() => onPageChange?.(page - 1)}
                disabled={page === 0}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-on-surface-variant hover:text-on-surface disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              {/* Page Numbers */}
              {getPageNumbers().map((p, i) =>
                p === '...' ? (
                  <span key={`ellipsis-${i}`} className="px-2 py-1 text-sm text-on-surface-variant">
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => onPageChange?.(p)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                      p === page
                        ? 'bg-primary text-on-primary'
                        : 'text-on-surface-variant hover:bg-surface-container-high'
                    }`}
                  >
                    {p + 1}
                  </button>
                )
              )}

              {/* Next Button */}
              <button
                onClick={() => onPageChange?.(page + 1)}
                disabled={page >= totalPages - 1}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-on-surface-variant hover:text-on-surface disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DataTable
