import React from 'react'
import { UserProfile, UserSettings } from '..'

/**
 * ProfilePage — aggregates UserProfile and UserSettings.
 * Protected by ProtectedRoute — user is guaranteed authenticated.
 * TODO: Fetch user via userApi.getProfile() and pass as props.
 */
const ProfilePage = () => {
  return (
    <div className="page-container">
      <UserProfile user={null} />
      <UserSettings user={null} isLoading={false} />
    </div>
  )
}

export default ProfilePage
