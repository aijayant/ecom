import React, { useEffect } from 'react'
import { X } from 'lucide-react'

/**
 * EntityDrawer — A reusable slide-over drawer panel.
 *
 * This component provides a right-side drawer with:
 * - A backdrop overlay (click to close)
 * - Slide-in/out animation
 * - A title/subtitle header with a close button
 * - A scrollable body area (via `children`)
 * - A sticky footer slot (for Cancel/Save buttons)
 *
 * It is generic and feature-agnostic — the form content is injected via `children`.
 * Products, Orders, and Users all reuse this same shell.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls drawer visibility
 * @param {Function} props.onClose - Called when the drawer should close
 * @param {string} props.title - Header title text
 * @param {string} [props.subtitle] - Header subtitle text
 * @param {React.ReactNode} props.children - The form/body content
 * @param {React.ReactNode} [props.footer] - Sticky footer content (Cancel/Save buttons)
 * @param {string} [props.width='max-w-md'] - Tailwind max-width class
 */
const EntityDrawer = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  width = 'max-w-md',
}) => {
  // ─── Lock body scroll when the drawer is open ───────────────────
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    // Clean up on unmount
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // ─── Close on Escape key ────────────────────────────────────────
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  return (
    <>
      {/* ── Backdrop Overlay ─────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ── Drawer Panel ─────────────────────────────────────────── */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full ${width} bg-surface-container-lowest shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {/* ── Header ───────────────────────────────────────────── */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-outline-variant/30">
          <div>
            <h2 className="text-lg font-semibold text-on-surface">{title}</h2>
            {subtitle && (
              <p className="text-sm text-on-surface-variant mt-0.5">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors"
            aria-label="Close drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* ── Scrollable Body ──────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {children}
        </div>

        {/* ── Sticky Footer ────────────────────────────────────── */}
        {footer && (
          <div className="px-6 py-4 border-t border-outline-variant/30 bg-surface-container-lowest">
            {footer}
          </div>
        )}
      </div>
    </>
  )
}

export default EntityDrawer
