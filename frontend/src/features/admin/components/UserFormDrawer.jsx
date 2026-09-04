import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { createUserSchema, updateUserSchema } from '../schemas'
import EntityDrawer from '../../../shared/components/EntityDrawer/EntityDrawer'
import { useCreateUser, useUpdateUser } from '../../user/hooks/useUserMutations'
import toast from 'react-hot-toast'

/**
 * UserFormDrawer — The Add/Edit user form, rendered inside the EntityDrawer shell.
 *
 * Key behavior:
 * - When `mode` is 'create', the password field is visible (maps to CreateUserRequest)
 * - When `mode` is 'edit', the password field is hidden (maps to UpdateUserRequest)
 * - Uses react-hook-form + zod for validation
 * - Pre-fills form fields when editing an existing user via `initialData`
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls drawer visibility
 * @param {Function} props.onClose - Called when drawer should close
 * @param {'create' | 'edit'} props.mode - Determines form schema and password visibility
 * @param {Object} [props.initialData] - Pre-filled values for edit mode
 * @param {Function} props.onSubmit - Called with validated form data
 * @param {boolean} [props.isLoading=false] - Disables submit button while saving
 */
const UserFormDrawer = ({
  isOpen,
  onClose,
  mode = 'create',
  initialData = null,
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState(null)

  const { mutateAsync: createUser, isPending: isCreating } = useCreateUser()
  const { mutateAsync: updateUser, isPending: isUpdating } = useUpdateUser()

  const isLoading = isCreating || isUpdating

  // ─── Pick the correct Zod schema based on mode ─────────────────
  const schema = mode === 'create' ? createUserSchema : updateUserSchema

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      username: '',
      email: '',
      phoneNumber: '',
      password: '',
      roleName: 'USER',
    },
  })

  // ─── Reset form when drawer opens or mode/data changes ─────────
  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && initialData) {
        reset({
          fullName: initialData.fullName || '',
          username: initialData.username || '',
          email: initialData.email || '',
          phoneNumber: initialData.phoneNumber || '',
          roleName: initialData.roleName || 'USER',
        })
      } else {
        reset({
          fullName: '',
          username: '',
          email: '',
          phoneNumber: '',
          password: '',
          roleName: 'USER',
        })
      }
    }
  }, [isOpen, mode, initialData, reset])

  // ─── Password strength indicator (visual only) ─────────────────
  const password = watch('password')
  const getPasswordStrength = () => {
    if (!password) return 0
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }
  const strengthLevel = getPasswordStrength()
  const strengthColors = ['bg-error', 'bg-error', 'bg-yellow-500', 'bg-primary', 'bg-green-500']

  const submitHandler = async (data) => {
    setServerError(null)
    try {
      if (mode === 'create') {
        await createUser(data)
        toast.success('User created successfully')
      } else {
        await updateUser({ id: initialData.id, payload: data })
        toast.success('User updated successfully')
      }
      onClose()
    } catch (error) {
      if (error?.fieldErrors && Object.keys(error.fieldErrors).length > 0) {
        Object.entries(error.fieldErrors).forEach(([field, msg]) => {
          setError(field, { type: 'server', message: msg })
        })
      } else {
        setServerError(error?.detail || error?.title || error?.message || 'Failed to save user')
      }
    }
  }

  return (
    <EntityDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'create' ? 'Add New User' : 'Edit User'}
      subtitle={
        mode === 'create'
          ? 'Create credentials and configure permissions.'
          : 'Update user details and permissions.'
      }
      footer={
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-sm font-medium text-on-surface-variant hover:bg-surface-container-high transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="user-form"
            disabled={isLoading}
            className="px-5 py-2.5 rounded-lg text-sm font-medium bg-primary text-on-primary hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Saving...' : mode === 'create' ? 'Save User' : 'Update User'}
          </button>
        </div>
      }
    >
      <form id="user-form" onSubmit={handleSubmit(submitHandler)} className="space-y-6">
        {/* ── Server Error Banner ────────────────────────────────── */}
        {serverError && (
          <div className="p-3 bg-error/10 border border-error/20 rounded-lg text-sm text-error flex items-start gap-2">
            <span>⚠️</span>
            <p>{serverError}</p>
          </div>
        )}

        {/* ── Section: Basic Information ─────────────────────────── */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-base">👤</span>
            <h3 className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
              Basic Information
            </h3>
          </div>

          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="drawer-fullName" className="block text-sm font-medium text-on-surface mb-1.5">
                Full Name
              </label>
              <input
                {...register('fullName')}
                id="drawer-fullName"
                type="text"
                placeholder="Sarah Jenkins"
                className={`w-full px-3 py-2.5 bg-surface-container-low border ${errors.fullName ? 'border-error' : 'border-outline-variant/30'} rounded-lg text-sm text-on-surface placeholder:text-on-surface-variant/50 outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/40 transition-all`}
              />
              {errors.fullName && <p className="text-xs text-error mt-1">{errors.fullName.message}</p>}
            </div>

            {/* Username */}
            <div>
              <label htmlFor="drawer-username" className="block text-sm font-medium text-on-surface mb-1.5">
                Username
              </label>
              <input
                {...register('username')}
                id="drawer-username"
                type="text"
                placeholder="@sjenkins"
                className={`w-full px-3 py-2.5 bg-surface-container-low border ${errors.username ? 'border-error' : 'border-outline-variant/30'} rounded-lg text-sm text-on-surface placeholder:text-on-surface-variant/50 outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/40 transition-all`}
              />
              {errors.username && <p className="text-xs text-error mt-1">{errors.username.message}</p>}
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="drawer-email" className="block text-sm font-medium text-on-surface mb-1.5">
                Email Address
              </label>
              <input
                {...register('email')}
                id="drawer-email"
                type="email"
                placeholder="sarah.j@ecom.tech"
                className={`w-full px-3 py-2.5 bg-surface-container-low border ${errors.email ? 'border-error' : 'border-outline-variant/30'} rounded-lg text-sm text-on-surface placeholder:text-on-surface-variant/50 outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/40 transition-all`}
              />
              {errors.email && <p className="text-xs text-error mt-1">{errors.email.message}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="drawer-phone" className="block text-sm font-medium text-on-surface mb-1.5">
                Phone Number
              </label>
              <input
                {...register('phoneNumber')}
                id="drawer-phone"
                type="tel"
                placeholder="+1 (555) 891-2345"
                className={`w-full px-3 py-2.5 bg-surface-container-low border ${errors.phoneNumber ? 'border-error' : 'border-outline-variant/30'} rounded-lg text-sm text-on-surface placeholder:text-on-surface-variant/50 outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/40 transition-all`}
              />
              {errors.phoneNumber && <p className="text-xs text-error mt-1">{errors.phoneNumber.message}</p>}
            </div>
          </div>
        </div>

        {/* ── Section: Access & Security ─────────────────────────── */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-base">🔐</span>
            <h3 className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
              Access & Security
            </h3>
          </div>

          <div className="space-y-4">
            {/* Assigned Role */}
            <div>
              <label htmlFor="drawer-role" className="block text-sm font-medium text-on-surface mb-1.5">
                Assigned Role
              </label>
              <select
                {...register('roleName')}
                id="drawer-role"
                className={`w-full px-3 py-2.5 bg-surface-container-low border ${errors.roleName ? 'border-error' : 'border-outline-variant/30'} rounded-lg text-sm text-on-surface outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/40 transition-all cursor-pointer`}
              >
                <option value="ADMIN">Admin</option>
                <option value="USER">User</option>
                <option value="MANAGER">Manager</option>
              </select>
              {errors.roleName && <p className="text-xs text-error mt-1">{errors.roleName.message}</p>}
            </div>

            {/* Password — only shown when CREATING a new user */}
            {mode === 'create' && (
              <div>
                <label htmlFor="drawer-password" className="block text-sm font-medium text-on-surface mb-1.5">
                  Security Password
                </label>
                <div className="relative">
                  <input
                    {...register('password')}
                    id="drawer-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className={`w-full px-3 py-2.5 pr-10 bg-surface-container-low border ${errors.password ? 'border-error' : 'border-outline-variant/30'} rounded-lg text-sm text-on-surface placeholder:text-on-surface-variant/50 outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/40 transition-all`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {/* Password Strength Bar */}
                {password && (
                  <div className="flex gap-1 mt-2">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          i < strengthLevel ? strengthColors[strengthLevel] : 'bg-surface-container-high'
                        }`}
                      />
                    ))}
                  </div>
                )}
                <p className="text-xs text-on-surface-variant mt-1.5">
                  Minimum 8 characters with at least one number and special character.
                </p>
                {errors.password && <p className="text-xs text-error mt-1">{errors.password.message}</p>}
              </div>
            )}
          </div>
        </div>

        {/* ── Section: Status ────────────────────────────────────── */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-base">⚙️</span>
            <h3 className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
              Status
            </h3>
          </div>

          <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg">
            <div>
              <p className="text-sm font-medium text-on-surface">Account Active</p>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Disabled accounts cannot log into storefront or admin tools.
              </p>
            </div>
            {/* Toggle switch — static UI for now */}
            <div className="w-11 h-6 bg-primary rounded-full relative cursor-pointer">
              <div className="absolute top-0.5 right-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform" />
            </div>
          </div>
        </div>
      </form>
    </EntityDrawer>
  )
}

export default UserFormDrawer
