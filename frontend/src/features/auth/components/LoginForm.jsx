import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'

/**
 * LoginForm
 *
 * Renders the login form fields.
 * Wired up to useAuth hook in LoginPage.
 *
 * Props:
 *  - onSubmit(formData)  — called when form is submitted
 *  - onSwitchToRegister  — toggle to RegisterForm
 *  - onClose             — close the modal/page
 *  - isLoading           — disables submit button while request is in-flight
 *  - error               — error message string to display
 */
const LoginForm = ({ onSubmit, onSwitchToRegister, onClose, isLoading, error }) => {
  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.(formData)
  }

  return (
    <div className="auth-overlay">
      <form className="auth-popup" onSubmit={handleSubmit}>

        <div className="auth-popup__header">
          <h2>Login</h2>
          {onClose && <RxCross2 className="auth-popup__close" onClick={onClose} />}
        </div>

        {error && <p className="auth-popup__error">{error}</p>}

        <div className="auth-popup__fields">
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        <div className="auth-popup__condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use &amp; privacy policy.</p>
        </div>

        <p>
          Create a new account?{' '}
          <span onClick={onSwitchToRegister}>Click here</span>
        </p>

      </form>
    </div>
  )
}

export default LoginForm
