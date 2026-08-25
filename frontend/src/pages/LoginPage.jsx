import React, { useState } from 'react'
import { useAuth } from '../features/auth'
import LoginForm from '../features/auth/components/LoginForm'
import RegisterForm from '../features/auth/components/RegisterForm'
import { Link } from 'react-router-dom'

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
    <div className="min-h-screen flex flex-col" style={{ background: '#f9f9fb', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* ── Main Content ── */}
      <main className="flex-grow flex items-center justify-center px-5 md:px-16 py-20 relative overflow-hidden">

        {/* Subtle decorative background icon */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center items-center opacity-[0.03]">
          <span className="material-symbols-outlined text-[#004e9f]" style={{ fontSize: '40rem' }}>
            devices
          </span>
        </div>

        {/* ── Auth Card ── */}
        <div
          className="w-full max-w-md bg-white rounded-2xl border border-[#e2e2e4] relative z-10 p-12"
          style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}
        >
          {/* Brand */}
          <div className="text-center mb-12">
            <h1 className="text-[20px] font-bold text-[#004e9f] tracking-tight">ShopSphere</h1>
            <p className="text-[15px] text-[#414753] mt-1">
              {mode === 'login' ? 'Sign in to your account' : 'Create a new account'}
            </p>
          </div>

          {/* ── Tab Toggle ── */}
          <div className="flex border-b border-[#e2e2e4] mb-8">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 pb-3 text-[13px] font-semibold tracking-[0.01em] transition-colors duration-200 ${
                mode === 'login'
                  ? 'text-[#004e9f] border-b-2 border-[#004e9f]'
                  : 'text-[#414753] hover:text-[#004e9f] border-b-2 border-transparent'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 pb-3 text-[13px] font-semibold tracking-[0.01em] transition-colors duration-200 ${
                mode === 'register'
                  ? 'text-[#004e9f] border-b-2 border-[#004e9f]'
                  : 'text-[#414753] hover:text-[#004e9f] border-b-2 border-transparent'
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
            <div className="flex-grow border-t border-[#e2e2e4]" />
            <span className="flex-shrink-0 mx-3 text-[13px] text-[#414753]">or</span>
            <div className="flex-grow border-t border-[#e2e2e4]" />
          </div>

          {/* ── Social Auth ── */}
          <div className="space-y-3">
            {/* Google */}
            <button
              type="button"
              className="w-full bg-white border border-[#e2e2e4] hover:bg-[#f3f3f5] text-[#1a1c1d] text-[13px] font-medium py-3 rounded-lg transition-colors duration-200 min-h-[44px] flex items-center justify-center gap-3"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M11.993 4.966c1.17 0 2.253.483 3.09 1.32l2.366-2.366C16.037 2.493 14.133 1.6 11.993 1.6 7.625 1.6 3.86 4.417 2.378 8.297l2.805 2.176c1.328-3.327 4.542-5.507 8.81-5.507Z" />
                <path fillRule="evenodd" clipRule="evenodd" d="M22.5 12.015c0-.853-.153-1.68-.42-2.457H11.993v4.64h5.923a5.534 5.534 0 0 1-2.404 3.633l2.766 2.146c1.616-1.49 2.545-3.684 2.545-6.305l-2.323-1.657Z" />
                <path fillRule="evenodd" clipRule="evenodd" d="M11.993 22.43c2.955 0 5.43-.976 7.237-2.645l-2.766-2.146c-.979.658-2.235 1.047-3.471 1.047-4.269 0-7.483-2.18-8.81-5.507L1.378 15.35C2.86 19.23 6.625 22.43 11.993 22.43Z" />
                <path fillRule="evenodd" clipRule="evenodd" d="M3.183 15.35 6.002 13.17c-.34-.954-.532-1.99-.532-3.055 0-1.066.192-2.102.532-3.055L3.183 4.885a10.824 10.824 0 0 0-1.183 4.83c0 1.706.398 3.336 1.183 4.835v.8Z" />
              </svg>
              Continue with Google
            </button>

            {/* Apple */}
            <button
              type="button"
              className="w-full bg-white border border-[#e2e2e4] hover:bg-[#f3f3f5] text-[#1a1c1d] text-[13px] font-medium py-3 rounded-lg transition-colors duration-200 min-h-[44px] flex items-center justify-center gap-3"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12.923 1.933a6.837 6.837 0 0 1 2.378-.456c0-.001.002-.001.002-.002a6.495 6.495 0 0 1 1.636 6.305c-1.579.52-3.328-.152-4.103-1.6a6.524 6.524 0 0 1-.955-3.326c.27-.406.603-.732 1.042-.921Zm.673 17.585c-.947.88-2.316.59-3.238.163-.772-.358-1.423-.66-2.152-.66-.757 0-1.442.318-2.228.683-1.008.47-2.457.734-3.313-.194-1.633-1.77-3.033-5.367-2.022-9.28.69-2.673 2.656-4.225 4.908-4.225 1.347 0 2.392.51 3.25.922.686.329 1.258.604 1.722.604.417 0 1.006-.282 1.716-.62 1.01-.482 2.348-1.121 4.02-1.026 1.764.099 3.236.702 4.148 1.954-2.836 1.488-2.261 5.378.719 6.586-.534 1.353-1.258 2.548-2.073 3.491-1.107 1.282-2.213 2.518-3.457 1.602Z" />
              </svg>
              Continue with Apple
            </button>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-[#f3f3f5] border-t border-[#e2e2e4] py-12 flex flex-col items-center gap-6 px-16">
        <div className="text-[20px] font-bold text-[#004e9f]">ShopSphere</div>
        <nav className="flex flex-wrap justify-center gap-6">
          {['About Us', 'Support', 'Privacy Policy', 'Terms of Service', 'Contact'].map((item) => (
            <a
              key={item}
              href="#"
              className="text-[13px] text-[#414753] hover:text-[#004e9f] transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>
        <p className="text-[13px] text-[#414753]">© 2024 ShopSphere Inc. All rights reserved.</p>
      </footer>

    </div>
  )
}

export default LoginPage
