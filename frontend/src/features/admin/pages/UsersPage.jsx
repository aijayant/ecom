import React, { useState } from 'react'
import { Download, UserPlus, Pencil, Trash2 } from 'lucide-react'
import DataTable from '../../../shared/components/DataTable/DataTable'
import UserStatCards from '../components/UserStatCards'
import UserFilters from '../components/UserFilters'
import UserFormDrawer from '../components/UserFormDrawer'
import ConfirmDialog from '../../../shared/components/ConfirmDialog'
import { useUsers } from '../../user/hooks/useUsers'
import { useDeleteUser } from '../../user/hooks/useUserMutations'
import { getUserRole } from '../../../core/security/utils/tokenUtils'
import toast from 'react-hot-toast'

/**
 * UsersPage — Admin user management screen.
 *
 * This is the main routable page for /admin/users.
 * It composes: stat cards, filters, data table, and the add/edit drawer.
 *
 * Currently uses mock data for the table rows.
 * Real API integration will replace the `mockUsers` array with data
 * from `useQuery` calling GET /api/v1/users.
 */

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Generate initials from a full name (e.g., "Marcus Vance" → "MV") */
const getInitials = (name) =>
  name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

/** Map role names to styled badge colors */
const roleBadgeStyles = {
  ADMIN: 'bg-primary/10 text-primary',
  MANAGER: 'bg-yellow-100 text-yellow-800',
  USER: 'bg-surface-container-high text-on-surface-variant',
}

const UsersPage = () => {
  // ─── Local State ────────────────────────────────────────────────
  const [selectedIds, setSelectedIds] = useState(new Set())
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(0)

  // Auth context
  const isAdmin = getUserRole() === 'ADMIN'

  // Fetch real data
  const { data: usersData, isLoading } = useUsers({
    page: currentPage,
    size: 10,
    sort: 'createdDate,desc'
  })

  const users = usersData?.content || []

  // Mutations
  const { mutateAsync: deleteUser, isPending: isDeleting } = useDeleteUser()

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerMode, setDrawerMode] = useState('create') // 'create' | 'edit'
  const [editingUser, setEditingUser] = useState(null)

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)
  const [deleteError, setDeleteError] = useState(null)

  // ─── Handlers ───────────────────────────────────────────────────
  const handleAddUser = () => {
    setDrawerMode('create')
    setEditingUser(null)
    setDrawerOpen(true)
  }

  const handleEditUser = (user) => {
    setDrawerMode('edit')
    setEditingUser(user)
    setDrawerOpen(true)
  }

  const handleDrawerSubmit = (data) => {
    // handled internally by drawer now
  }

  const handleDeleteUserClick = (user) => {
    setUserToDelete(user)
    setDeleteError(null)
    setDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    setDeleteError(null)
    try {
      await deleteUser(userToDelete.id)
      toast.success('User deleted successfully')
      setDeleteModalOpen(false)
      setUserToDelete(null)
    } catch (error) {
      setDeleteError(error?.detail || error?.title || error?.message || 'Failed to delete user')
    }
  }

  // ─── Table Column Definitions ──────────────────────────────────
  const columns = [
    {
      key: 'fullName',
      label: 'User',
      render: (_, row) => (
        <div className="flex items-center gap-3">
          {/* Avatar circle with initials */}
          <div className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center shrink-0">
            <span className="text-xs font-semibold text-on-surface-variant">
              {getInitials(row.fullName)}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-on-surface">{row.fullName}</p>
            <p className="text-xs text-on-surface-variant">{row.subtitle}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'username',
      label: 'Username',
      render: (val) => <span className="text-sm text-on-surface-variant">@{val}</span>,
    },
    {
      key: 'email',
      label: 'Email',
      render: (val) => <span className="text-sm text-on-surface-variant">{val}</span>,
    },
    {
      key: 'phoneNumber',
      label: 'Phone',
      render: (val) => <span className="text-sm text-on-surface-variant whitespace-nowrap">{val}</span>,
    },
    {
      key: 'roleName',
      label: 'Role',
      render: (val) => (
        <span
          className={`inline-block px-2.5 py-1 rounded-md text-xs font-medium ${roleBadgeStyles[val] || roleBadgeStyles.USER
            }`}
        >
          {val.charAt(0) + val.slice(1).toLowerCase()}
        </span>
      ),
    },
    {
      key: 'isActive',
      label: 'Status',
      render: (val) => (
        <span className="flex items-center gap-1.5 text-xs font-medium">
          <span
            className={`w-1.5 h-1.5 rounded-full ${val ? 'bg-green-500' : 'bg-error'}`}
          />
          {val ? 'Active' : 'Disabled'}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex items-center gap-1">
          {isAdmin && (
            <button
              onClick={() => handleEditUser(row)}
              className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-colors"
              aria-label={`Edit ${row.fullName}`}
            >
              <Pencil size={15} />
            </button>
          )}
          {isAdmin && (
            <button
              onClick={() => handleDeleteUserClick(row)}
              className="p-1.5 rounded-lg text-on-surface-variant hover:bg-error/10 hover:text-error transition-colors"
              aria-label={`Delete ${row.fullName}`}
            >
              <Trash2 size={15} />
            </button>
          )}
        </div>
      ),
    },
  ]

  // ─── Real Stats (Approximated from current page data for now) ───
  const totalUsers = usersData?.totalElements || 0
  const activeUsers = users.filter((u) => u.isActive).length
  const adminCount = users.filter((u) => u.roleName === 'ADMIN').length
  const newThisMonth = 0

  return (
    <div>
      {/* ── Page Header ──────────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">Users</h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Manage customer and administrator access credentials, roles, and status.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Export CSV — static/disabled per scope */}
          <button
            disabled
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium text-on-surface-variant border border-outline-variant/30 bg-surface-container-lowest opacity-50 cursor-not-allowed"
          >
            <Download size={15} />
            Export CSV
          </button>
          {/* Add User */}
          <button
            onClick={handleAddUser}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium bg-primary text-on-primary hover:bg-primary/90 transition-colors"
          >
            <UserPlus size={15} />
            + Add User
          </button>
        </div>
      </div>

      {/* ── Stat Cards ───────────────────────────────────────────── */}
      <UserStatCards
        totalUsers={totalUsers}
        activeUsers={activeUsers}
        adminCount={adminCount}
        newThisMonth={newThisMonth}
      />

      {/* ── Filters ──────────────────────────────────────────────── */}
      <UserFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        roleFilter={roleFilter}
        onRoleChange={setRoleFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      {/* ── Data Table ───────────────────────────────────────────── */}
      <DataTable
        columns={columns}
        data={users}
        isLoading={isLoading}
        selectable
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        bulkActions={[
          {
            label: 'Export Selected',
            onClick: () => { },
            disabled: true,
          },
          {
            label: 'Disable Selected',
            variant: 'danger',
            onClick: () => { },
            disabled: true,
          },
        ]}
        pagination={
          usersData
            ? {
              page: usersData.pageNumber,
              pageSize: usersData.pageSize,
              totalElements: usersData.totalElements,
              totalPages: usersData.totalPages,
            }
            : null
        }
        onPageChange={setCurrentPage}
        emptyMessage="No users found. Create one to get started."
      />

      {/* ── Add/Edit Drawer ──────────────────────────────────────── */}
      <UserFormDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        mode={drawerMode}
        initialData={editingUser}
        onSubmit={handleDrawerSubmit}
      />

      {/* ── Delete Confirmation Modal ─────────────────────────────── */}
      <ConfirmDialog
        isOpen={deleteModalOpen}
        title="Delete User"
        message={`Delete ${userToDelete?.fullName}? This cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={() => !isDeleting && setDeleteModalOpen(false)}
        isLoading={isDeleting}
        error={deleteError}
      />
    </div>
  )
}

export default UsersPage
