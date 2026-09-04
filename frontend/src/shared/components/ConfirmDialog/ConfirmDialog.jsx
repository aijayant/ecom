import React from 'react'

/**
 * A reusable confirmation dialog modal.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls visibility
 * @param {string} props.title - Modal title
 * @param {string} props.message - Main message to display
 * @param {string} [props.confirmText='Confirm'] - Text for confirm button
 * @param {string} [props.cancelText='Cancel'] - Text for cancel button
 * @param {Function} props.onConfirm - Callback when confirm is clicked
 * @param {Function} props.onCancel - Callback when cancel/backdrop is clicked
 * @param {boolean} [props.isLoading=false] - If true, disables buttons and shows loading state on confirm button
 * @param {string} [props.error=null] - Optional error message to display in the modal
 */
const ConfirmDialog = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  isLoading = false,
  error = null,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-surface-container-lowest rounded-xl shadow-lg w-full max-w-md overflow-hidden flex flex-col">
        <div className="p-6">
          <h2 className="text-lg font-bold text-on-surface">{title}</h2>
          <p className="text-sm text-on-surface-variant mt-2">{message}</p>

          {error && (
            <div className="mt-4 p-3 bg-error/10 border border-error/20 rounded-lg text-sm text-error flex items-start gap-2">
              <span>⚠️</span>
              <p>{error}</p>
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-surface-container flex justify-end gap-3 border-t border-outline-variant/30">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg text-sm font-medium text-on-surface-variant hover:bg-surface-container-high transition-colors disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-error text-on-error hover:bg-error/90 transition-colors disabled:opacity-50 min-w-[80px]"
          >
            {isLoading ? '...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
