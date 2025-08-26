import { Router } from 'express'
import StudentController from './student.controller'
import { authorize } from '../../helpers/authorize'
import { UserRole } from '../../enum'
import { validator } from '../../helpers/validator'
import AuthValidation from '../Auth/auth.validation'
import StudentValidation from './student.validation'

const router = Router()
router.get(
    '/',
    authorize(UserRole.ADMIN, UserRole.TEACHER),
    StudentController.getAllStudents
)
router.get(
    '/:studentId',
    authorize(UserRole.ADMIN, UserRole.TEACHER),
    StudentController.getSingleStudent
)
router.post(
    '/',
    validator(StudentValidation.studentCreateValidation),
    authorize(UserRole.ADMIN),
    StudentController.createStudent
)
const StudentRouter = router
export default StudentRouter
