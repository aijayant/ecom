import { z } from 'zod'

export const loginSchema = z.object({
  loginId: z.string().min(1, 'Login ID is required'),
  password: z.string().min(1, 'Password is required')
})

export const registerSchema = z.object({
  fullName: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/, 'Please enter a valid full name'),
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .regex(/^[A-Za-z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  phoneNumber: z.string()
    .regex(/^[6-9][0-9]{9}$/, 'Enter a valid 10-digit mobile number'),
  email: z.string()
    .email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/(?=.*[a-z])/, 'Must contain at least one lowercase letter')
    .regex(/(?=.*[A-Z])/, 'Must contain at least one uppercase letter')
    .regex(/(?=.*\d)/, 'Must contain at least one number')
    .regex(/(?=.*[@$!%*?&])/, 'Must contain at least one special character')
})
