import React, { useState } from 'react'
import { Link } from 'react-router-dom'


/**
 * LoginForm
 *
 * Converted from Stitch design (project 15018499287505280849).
 * Faithfully implements the TechEcom Premium Tech design system.
 *
 * Props:
 *  - onSubmit(formData)   — called on form submission
 *  - onSwitchToRegister   — callback to toggle to RegisterForm
 *  - isLoading            — disables submit while in-flight
 *  - error                — error string to display
 */
const LoginForm = ({ onSubmit, onSwitchToRegister, isLoading, error }) => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.(formData)
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>

      {/* Error Banner */}
      {error && (
        <div className="bg-error-container border border-error text-on-error-container text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {/* Email */}
      <div className="space-y-1">
        <label
          className="block text-[13px] font-medium tracking-[0.01em] text-[#1a1c1d]"
          htmlFor="signin-email"
        >
          Email Address
        </label>
        <input
          className="form-input w-full bg-white border border-[#e2e2e4] rounded-lg px-3 py-3 text-[15px] text-[#1a1c1d] placeholder-outline"
          id="signin-email"
          name="email"
          type="email"
          placeholder="name@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      {/* Password */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label
            className="block text-[13px] font-medium tracking-[0.01em] text-[#1a1c1d]"
            htmlFor="signin-password"
          >
            Password
          </label>
          {/* <a
            href="#"
            className="text-[13px] font-medium text-primary hover:underline"
          >
            Forgot Password?
          </a> */}

          <Link to="/forgot-password" className='text-[13px] font-medium text-primary hover:underline'>
            Forgot Password?
          </Link>

        </div>
        <div className="relative">
          <input
            className="form-input w-full bg-white border border-[#e2e2e4] rounded-lg px-3 py-3 pr-10 text-[15px] text-[#1a1c1d] placeholder-outline"
            id="signin-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="*******"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: '20px', fontVariationSettings: "'FILL' 0" }}
            >
              {showPassword ? 'visibility_off' : 'visibility'}
            </span>
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary hover:bg-on-primary-fixed-variant disabled:opacity-60 disabled:cursor-not-allowed text-white text-[13px] font-semibold tracking-[0.01em] py-3 rounded-lg transition-colors duration-200 min-h-11"
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>

      {/* Switch to Register */}
      <p className="text-center text-[13px] text-on-surface-variant">
        Don&apos;t have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-primary font-medium hover:underline"
        >
          Create Account
        </button>
      </p>
    </form>
  )
}

export default LoginForm
