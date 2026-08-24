/**
 * features/auth — Public API barrel export
 *
 * Other features/pages should import auth primitives from here.
 *
 * Usage:
 *   import { useAuth, LoginForm, RegisterForm } from '@/features/auth'
 */
export { useAuth }           from './hooks/useAuth'
export { default as LoginForm }    from './components/LoginForm'
export { default as RegisterForm } from './components/RegisterForm'
