import React, { useState } from 'react'

/**
 * UserSettings — skeleton component.
 *
 * TODO: Pre-populate form from userApi.getProfile() and submit via userApi.updateProfile().
 *
 * Props:
 *  - user         — current user object
 *  - onSave(data) — called with updated form data on submit
 *  - isLoading    — disables save button during API call
 */
const UserSettings = ({ user, onSave, isLoading }) => {
  const [formData, setFormData] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
  })

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave?.(formData)
  }

  return (
    <div className="user-settings">
      <h2>Account Settings</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save changes'}
        </button>
      </form>
    </div>
  )
}

export default UserSettings
