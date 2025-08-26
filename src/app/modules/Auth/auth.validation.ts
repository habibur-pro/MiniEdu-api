import { z } from 'zod'
import { UserRole } from '../../enum'
// ✅ Signup Schema
const signupValidationSchema = z.object({
    name: z.string().min(1, 'Name is required').optional(),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.nativeEnum(UserRole, {
        errorMap: () => ({ message: 'Invalid role' }),
    }),
})
// ✅ Signup Schema
const signinValidationSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

const AuthValidation = { signinValidationSchema, signupValidationSchema }
export default AuthValidation
