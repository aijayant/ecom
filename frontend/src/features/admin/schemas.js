import { z } from 'zod'

/**
 * Zod Schemas for Admin User Management
 *
 * These schemas mirror the Bean Validation constraints defined in the Spring Boot DTOs:
 * - CreateUserRequest.java → createUserSchema (includes password)
 * - UpdateUserRequest.java → updateUserSchema (no password)
 *
 * Keeping these in sync prevents the frontend from allowing values
 * that the backend would reject. If the backend DTO changes, update here too.
 */

// ─── Shared field definitions ────────────────────────────────────────────────
// These are reused in both create and update schemas to avoid duplication.

const usernameField = z
  .string()
  .min(3, 'Username must be at least 3 characters')
  .max(20, 'Username must be at most 20 characters')
  .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')

const emailField = z
  .string()
  .min(1, 'Email is required')
  .email('Please provide a valid email address')

const phoneNumberField = z
  .string()
  .min(1, 'Phone number is required')
  .regex(/^\+?[1-9]\d{1,14}$/, 'Phone number must be in valid E.164 format (e.g. +1234567890)')

const fullNameField = z
  .string()
  .min(2, 'Full name must be at least 2 characters')
  .max(50, 'Full name must be at most 50 characters')

const roleNameField = z.enum(['ADMIN', 'USER', 'MANAGER'], {
  errorMap: () => ({ message: 'Role must be ADMIN, USER, or MANAGER' }),
})

// ─── Create User Schema ──────────────────────────────────────────────────────
// Maps to: CreateUserRequest.java
// Note: password is ONLY required during creation.
export const createUserSchema = z.object({
  fullName: fullNameField,
  username: usernameField,
  email: emailField,
  phoneNumber: phoneNumberField,
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be at most 100 characters'),
  roleName: roleNameField,
})

// ─── Update User Schema ─────────────────────────────────────────────────────
// Maps to: UpdateUserRequest.java
// Note: NO password field — the backend DTO doesn't accept it during updates.
export const updateUserSchema = z.object({
  fullName: fullNameField,
  username: usernameField,
  email: emailField,
  phoneNumber: phoneNumberField,
  roleName: roleNameField,
})
