import { create } from 'zustand'
import { z } from 'zod'

// Zod validation schemas
export const UserSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address')
})

export const LoginSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(100, 'Email is too long'),
  password: z.string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password is too long')
})

export const SignupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

// TypeScript types
export type User = z.infer<typeof UserSchema>
export type LoginData = z.infer<typeof LoginSchema>
export type SignupData = z.infer<typeof SignupSchema>

interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

interface AuthActions {
  login: (userData: User) => void
  logout: () => void
  signup: (userData: User) => void
  updateUser: (userData: Partial<User>) => void
}

type AuthStore = AuthState & AuthActions

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,

  login: (userData: User) => set({
    user: userData,
    isAuthenticated: true
  }),

  logout: () => set({
    user: null,
    isAuthenticated: false
  }),

  signup: (userData: User) => set({
    user: userData,
    isAuthenticated: true
  }),

  updateUser: (userData: Partial<User>) => set((state) => ({
    user: state.user ? { ...state.user, ...userData } : null
  }))
}))

export default useAuthStore 