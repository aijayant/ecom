import React, { useState } from 'react'
import LoginForm from '../features/auth/components/LoginForm'
import RegisterForm from '../features/auth/components/RegisterForm'
import { useAuth } from '../features/auth'

/**
 * LoginPage — aggregates LoginForm / RegisterForm with toggle.
 * Wires useAuth for API calls and loading/error state.
 */
const LoginPage = () => {
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const { login, register, isLoading, error } = useAuth()

  return (
    <div className="page-container">
      {mode === 'login' ? (
        <LoginForm
          onSubmit={login}
          onSwitchToRegister={() => setMode('register')}
          isLoading={isLoading}
          error={error}
        />
      ) : (
        <RegisterForm
          onSubmit={register}
          onSwitchToLogin={() => setMode('login')}
          isLoading={isLoading}
          error={error}
        />
      )}
    </div>
  )
}

export default LoginPage
