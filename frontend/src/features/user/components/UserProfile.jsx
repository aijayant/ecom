import React from 'react'

/**
 * UserProfile — skeleton component.
 *
 * TODO: Wire up with userApi.getProfile() and display real data.
 *
 * Props:
 *  - user  — user object from API (name, email, roles, etc.)
 */
const UserProfile = ({ user }) => {
  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      {user ? (
        <div className="user-profile__info">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Roles:</strong> {user.roles?.join(', ') ?? 'N/A'}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  )
}

export default UserProfile
