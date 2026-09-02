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
  const [formData, setFormData] = useState({ name: '', username: '', number: '', email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  console.log(formData)

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

      {/* Full Name */}
      <div className="space-y-1">
        <label
          className="block text-[13px] font-medium tracking-[0.01em] text-[#1a1c1d]"
          htmlFor="register-name"
        >Full Name</label>
        <input
          className="form-input w-full bg-white border border-[#e2e2e4] rounded-lg px-3 py-3 text-[15px] text-[#1a1c1d] placeholder-outline"
          id="register-name"
          name="name"
          type="text"
          placeholder="name"
          value={formData.name}
          onChange={handleChange}
          minLength={2}
          maxLength={50}
          pattern="[A-Za-z]+(?: [A-Za-z]+)*"
          title="Please enter a valid name"
          required
        />
        {formData.name && !/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(formData.name) && (
          <p className="text-xs text-red-500">
            Please enter a valid full name.
          </p>
        )}
      </div>

      {/* UserName */}
      <div className="space-y-1">
        <label
          className="block text-[13px] font-medium tracking-[0.01em] text-[#1a1c1d]"
          htmlFor="register-username"
        >Username</label>
        <input
          className="form-input w-full bg-white border border-[#e2e2e4] rounded-lg px-3 py-3 text-[15px] text-[#1a1c1d] placeholder-outline"
          id="register-name"
          name="username"
          type="text"
          placeholder="username"
          value={formData.username}
          onChange={handleChange}
          minLength={3}
          maxLength={20}
          pattern="[A-Za-z0-9_]+"
          required
        />
        {formData.username &&
          !/^[A-Za-z0-9_]{2,19}$/.test(formData.username) && (
            <p className="text-xs text-red-500">
              Username must contain 3-20 characters.
            </p>
          )}
      </div>

      {/* Number */}
      <div className="space-y-1">
        <label
          className="block text-[13px] font-medium tracking-[0.01em] text-[#1a1c1d]"
          htmlFor="register-email"
        >Number</label>
        <input
          className="form-input w-full bg-white border border-[#e2e2e4] rounded-lg px-3 py-3 text-[15px] text-[#1a1c1d] placeholder-outline"
          id="register-number"
          name="number"
          type="tel"
          inputMode="numeric"
          pattern="[6-9][0-9]{9}"
          maxLength={10}
          placeholder="Enter 10-digit mobile number"
          value={formData.number}
          onChange={handleChange}
          required
        />
        {formData.number && !/^[6-9][0-9]{9}$/.test(formData.number) && (
          <p className="text-xs text-red-500">
            Enter a valid 10-digit mobile number.
          </p>
  )}
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
          className="form-input w-full bg-white border border-[#e2e2e4] rounded-lg px-3 py-3 text-[15px] text-[#1a1c1d] placeholder-outline"
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
            className="form-input w-full bg-white border border-[#e2e2e4] rounded-lg px-3 py-3 pr-10 text-[15px] text-[#1a1c1d] placeholder-outline"
            id="register-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}"
            title="Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
            required
          />
          {formData.password && formData.password.length < 8 && (
            <p className="text-xs text-red-500">
              Password must be at least 8 characters.
            </p>
          )}
          
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
        {isLoading ? 'Creating account...' : 'Create Account'}
      </button>

      {/* Switch to Login */}
      <p className="text-center text-[13px] text-on-surface-variant">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-primary font-medium hover:underline"
        >
          Sign In
        </button>
      </p>
    </form>
  )
}

export default RegisterForm
