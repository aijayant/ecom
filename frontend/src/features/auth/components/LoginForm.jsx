import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '../schemas'

const LoginForm = ({ onSubmit, onSwitchToRegister, isLoading, error }) => {
  const [showPassword, setShowPassword] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      loginId: '',
      password: ''
    }
  })

  // Hook form's handleSubmit passes the validated data to our onSubmit prop
  const submitHandler = (data) => {
    onSubmit?.(data)
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(submitHandler)} noValidate>
      
      {/* API Error Banner */}
      {error && (
        <div className="bg-error-container border border-error text-on-error-container text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {/* Login ID */}
      <div className="space-y-1">
        <label className="block text-[13px] font-medium tracking-[0.01em] text-[#1a1c1d]" htmlFor="signin-loginId">
          Enter login Id
        </label>
        <input
          {...register('loginId')}
          className={`form-input w-full bg-white border ${errors.loginId ? 'border-red-500' : 'border-[#e2e2e4]'} rounded-lg px-3 py-3 text-[15px] text-[#1a1c1d] placeholder-outline`}
          id="signin-loginId"
          type="text"
          placeholder="Username / Email / Phone No."
        />
        {errors.loginId && <p className="text-xs text-red-500">{errors.loginId.message}</p>}
      </div>

      {/* Password */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label className="block text-[13px] font-medium tracking-[0.01em] text-[#1a1c1d]" htmlFor="signin-password">
            Password
          </label>
          <Link to="/forgot-password" className='text-[13px] font-medium text-primary hover:underline'>
            Forgot Password?
          </Link>
        </div>
        <div className="relative">
          <input
            {...register('password')}
            className={`form-input w-full bg-white border ${errors.password ? 'border-red-500' : 'border-[#e2e2e4]'} rounded-lg px-3 py-3 pr-10 text-[15px] text-[#1a1c1d] placeholder-outline`}
            id="signin-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="*******"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px', fontVariationSettings: "'FILL' 0" }}>
              {showPassword ? 'visibility_off' : 'visibility'}
            </span>
          </button>
        </div>
        {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary hover:bg-on-primary-fixed-variant disabled:opacity-60 disabled:cursor-not-allowed text-white text-[13px] font-semibold tracking-[0.01em] py-3 rounded-lg transition-colors duration-200 min-h-11"
      >
        {isLoading ? 'Signing in...' : 'Login'}
      </button>

      {/* Switch to Register */}
      <p className="text-center text-[13px] text-on-surface-variant">
        Don&apos;t have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-primary font-medium hover:underline"
        >
          Create Account
        </button>
      </p>
    </form>
  )
}

export default LoginForm
