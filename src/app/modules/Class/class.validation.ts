import { z } from 'zod'
import { UserRole } from '../../enum'
// ✅ class enroll validation Schema
const enrollValidationSchema = z.object({
    studentId: z.string().min(1, 'student id is required'),
})
// ✅ class create validation
const classCreateValidationSchema = z.object({
    name: z.string().min(1, 'class name is required'),
    section: z.string().min(1, 'section is required'),
})

const ClassValidation = { enrollValidationSchema, classCreateValidationSchema }
export default ClassValidation
