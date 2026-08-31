import React, { useState } from 'react'
import { useAuth } from '../features/auth'
import LoginForm from '../features/auth/components/LoginForm'
import RegisterForm from '../features/auth/components/RegisterForm'
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';

/**
 * LoginPage
 *
 * Full-page authentication view.
 * Converted from Stitch design (project 15018499287505280849).
 * Implements the TechEcom Premium Tech aesthetic — macOS-style centered card,
 * tabbed toggle between Sign In / Create Account, and social auth buttons.
 */
const LoginPage = () => {
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const { login, register, isLoading, error } = useAuth()

  return (

    <div className="min-h-screen">
      <div className='grow flex items-center justify-center px-5 md:px-16 py-20 relative overflow-hidden'>
        <div className='w-full max-w-md bg-white rounded-2xl border border-[#e2e2e4] relative z-10 p-12'>

          {/* Brand */}
          <div className="text-center mb-12">
            <h1 className="text-[20px] font-bold text-primary tracking-tight ">ECom</h1>
            <p className="text-[15px] text-on-surface-variant mt-1">
              {mode === 'login' ? 'Sign in to your account' : 'Create a new account'}
            </p>
          </div>

          {/* ── Tab Toggle ── */}
          <div className="flex border-b border-[#e2e2e4] mb-8">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 pb-3 text-[13px] font-semibold tracking-[0.01em] transition-colors duration-200 ${mode === 'login'
                ? 'text-primary border-b-2 border-primary'
                : 'text-on-surface-variant hover:text-primary border-b-2 border-transparent'
                }`}
            >
              Login
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 pb-3 text-[13px] font-semibold tracking-[0.01em] transition-colors duration-200 ${mode === 'register'
                ? 'text-primary border-b-2 border-primary'
                : 'text-on-surface-variant hover:text-primary border-b-2 border-transparent'
                }`}
            >
              Create Account
            </button>
          </div>

          {/* ── Active Form ── */}
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

          {/* ── Divider ── */}
          <div className="my-8 flex items-center">
            <div className="grow border-t border-[#e2e2e4]" />
            <span className="shrink-0 mx-3 text-[13px] text-on-surface-variant">or</span>
            <div className="grow border-t border-[#e2e2e4]" />
          </div>

          {/* ── Social Auth ── */}
          <div className="space-y-3 ">
            {/* Google */}
            <button
              type="button"
              className="w-full bg-white border border-[#e2e2e4] hover:bg-surface-container-low text-[#1a1c1d] text-[13px] font-medium py-3 rounded-lg transition-colors duration-200 min-h-11 flex items-center justify-center gap-3"
            ><GoogleIcon />Continue with Google
            </button>

            {/* Apple */}
            <button
              type="button"
              className="w-full bg-white border border-[#e2e2e4] hover:bg-surface-container-low text-[#1a1c1d] text-[13px] font-medium py-3 rounded-lg transition-colors duration-200 min-h-11 flex items-center justify-center gap-3"
            ><AppleIcon />Continue with Apple
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
