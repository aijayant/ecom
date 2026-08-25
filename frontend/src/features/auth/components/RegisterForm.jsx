import React, { useState } from 'react'

/**
 * RegisterForm
 *
 * Converted from Stitch design (project 15018499287505280849).
 * Faithfully implements the TechEcom Premium Tech design system.
 *
 * Props:
 *  - onSubmit(formData)  — called on form submission
 *  - onSwitchToLogin     — callback to toggle to LoginForm
 *  - isLoading           — disables submit while in-flight
 *  - error               — error string to display
 */
const RegisterForm = ({ onSubmit, onSwitchToLogin, isLoading, error }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
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
        <div className="bg-[#ffdad6] border border-[#ba1a1a] text-[#93000a] text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {/* Full Name */}
      <div className="space-y-1">
        <label
          className="block text-[13px] font-medium tracking-[0.01em] text-[#1a1c1d]"
          htmlFor="register-name"
        >
          Full Name
        </label>
        <input
          className="form-input w-full bg-white border border-[#e2e2e4] rounded-lg px-3 py-3 text-[15px] text-[#1a1c1d] placeholder-[#727784]"
          id="register-name"
          name="name"
          type="text"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      {/* Email */}
      <div className="space-y-1">
        <label
          className="block text-[13px] font-medium tracking-[0.01em] text-[#1a1c1d]"
          htmlFor="register-email"
        >
          Email Address
        </label>
        <input
          className="form-input w-full bg-white border border-[#e2e2e4] rounded-lg px-3 py-3 text-[15px] text-[#1a1c1d] placeholder-[#727784]"
          id="register-email"
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
        <label
          className="block text-[13px] font-medium tracking-[0.01em] text-[#1a1c1d]"
          htmlFor="register-password"
        >
          Password
        </label>
        <div className="relative">
          <input
            className="form-input w-full bg-white border border-[#e2e2e4] rounded-lg px-3 py-3 pr-10 text-[15px] text-[#1a1c1d] placeholder-[#727784]"
            id="register-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#414753] hover:text-[#004e9f] transition-colors"
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
        className="w-full bg-[#004e9f] hover:bg-[#00458e] disabled:opacity-60 disabled:cursor-not-allowed text-white text-[13px] font-semibold tracking-[0.01em] py-3 rounded-lg transition-colors duration-200 min-h-[44px]"
      >
        {isLoading ? 'Creating account...' : 'Create Account'}
      </button>

      {/* Switch to Login */}
      <p className="text-center text-[13px] text-[#414753]">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-[#004e9f] font-medium hover:underline"
        >
          Sign In
        </button>
      </p>
    </form>
  )
}

export default RegisterForm
