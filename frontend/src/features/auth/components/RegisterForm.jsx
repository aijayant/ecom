import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'

/**
 * RegisterForm
 *
 * Renders the sign-up / registration form fields.
 * Wired up to useAuth hook in LoginPage.
 *
 * Props:
 *  - onSubmit(formData)  — called when form is submitted
 *  - onSwitchToLogin     — toggle back to LoginForm
 *  - onClose             — close the modal/page
 *  - isLoading           — disables submit button while request is in-flight
 *  - error               — error message string to display
 */
const RegisterForm = ({ onSubmit, onSwitchToLogin, onClose, isLoading, error }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })

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
          <h2>Sign Up</h2>
          {onClose && <RxCross2 className="auth-popup__close" onClick={onClose} />}
        </div>

        {error && <p className="auth-popup__error">{error}</p>}

        <div className="auth-popup__fields">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
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
          {isLoading ? 'Creating account...' : 'Create account'}
        </button>

        <div className="auth-popup__condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use &amp; privacy policy.</p>
        </div>

        <p>
          Already have an account?{' '}
          <span onClick={onSwitchToLogin}>Login here</span>
        </p>

      </form>
    </div>
  )
}

export default RegisterForm
