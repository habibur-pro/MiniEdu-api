import { z } from 'zod'

// ✅ student create validation Schema
const studentCreateValidation = z.object({
    name: z.string().min(1, 'Name is required'),
    age: z
        .number({ invalid_type_error: 'Age must be a number' })
        .positive({ message: 'Age must be positive' }),
    class_id: z.string().min(1, 'class_id is required'),
})

const StudentValidation = {
    studentCreateValidation,
}
export default StudentValidation
