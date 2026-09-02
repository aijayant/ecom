import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '../schemas'

const RegisterForm = ({ onSubmit, onSwitchToLogin, isLoading, error }) => {
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      username: '',
      number: '',
      email: '',
      password: ''
    }
  })

  const submitHandler = (data) => {
    onSubmit?.(data)
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(submitHandler)} noValidate>
      {/* Error Banner */}
      {error && (
        <div className="bg-error-container border border-error text-on-error-container text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {/* Full Name */}
      <div className="space-y-1">
        <label className="block text-[13px] font-medium tracking-[0.01em] text-[#1a1c1d]" htmlFor="register-name">
          Full Name
        </label>
        <input
          {...register('name')}
          className={`form-input w-full bg-white border ${errors.name ? 'border-red-500' : 'border-[#e2e2e4]'} rounded-lg px-3 py-3 text-[15px] text-[#1a1c1d] placeholder-outline`}
          id="register-name"
          type="text"
          placeholder="name"
        />
        {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
      </div>

      {/* UserName */}
      <div className="space-y-1">
        <label className="block text-[13px] font-medium tracking-[0.01em] text-[#1a1c1d]" htmlFor="register-username">
          Username
        </label>
        <input
          {...register('username')}
          className={`form-input w-full bg-white border ${errors.username ? 'border-red-500' : 'border-[#e2e2e4]'} rounded-lg px-3 py-3 text-[15px] text-[#1a1c1d] placeholder-outline`}
          id="register-username"
          type="text"
          placeholder="username"
        />
        {errors.username && <p className="text-xs text-red-500">{errors.username.message}</p>}
      </div>

      {/* Number */}
      <div className="space-y-1">
        <label className="block text-[13px] font-medium tracking-[0.01em] text-[#1a1c1d]" htmlFor="register-number">
          Number
        </label>
        <input
          {...register('number')}
          className={`form-input w-full bg-white border ${errors.number ? 'border-red-500' : 'border-[#e2e2e4]'} rounded-lg px-3 py-3 text-[15px] text-[#1a1c1d] placeholder-outline`}
          id="register-number"
          type="tel"
          inputMode="numeric"
          placeholder="Enter 10-digit mobile number"
        />
        {errors.number && <p className="text-xs text-red-500">{errors.number.message}</p>}
      </div>

      {/* Email */}
      <div className="space-y-1">
        <label className="block text-[13px] font-medium tracking-[0.01em] text-[#1a1c1d]" htmlFor="register-email">
          Email Address
        </label>
        <input
          {...register('email')}
          className={`form-input w-full bg-white border ${errors.email ? 'border-red-500' : 'border-[#e2e2e4]'} rounded-lg px-3 py-3 text-[15px] text-[#1a1c1d] placeholder-outline`}
          id="register-email"
          type="email"
          placeholder="name@example.com"
        />
        {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
      </div>

      {/* Password */}
      <div className="space-y-1">
        <label className="block text-[13px] font-medium tracking-[0.01em] text-[#1a1c1d]" htmlFor="register-password">
          Password
        </label>
        <div className="relative">
          <input
            {...register('password')}
            className={`form-input w-full bg-white border ${errors.password ? 'border-red-500' : 'border-[#e2e2e4]'} rounded-lg px-3 py-3 pr-10 text-[15px] text-[#1a1c1d] placeholder-outline`}
            id="register-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
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
