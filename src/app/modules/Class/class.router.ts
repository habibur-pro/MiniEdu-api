import { Router } from 'express'
import ClassController from './class.controller'
import { authorize } from '../../helpers/authorize'
import { UserRole } from '../../enum'
import { validator } from '../../helpers/validator'
import ClassValidation from './class.validation'

const router = Router()
router.get(
    '/:classId/students',
    authorize(UserRole.ADMIN, UserRole.TEACHER),
    ClassController.getStudentsOfClass
)
router.get(
    '/',
    authorize(UserRole.ADMIN, UserRole.TEACHER),
    ClassController.getAllClass
)
router.post(
    '/',
    validator(ClassValidation.classCreateValidationSchema),
    authorize(UserRole.ADMIN),
    ClassController.createClass
)
router.post(
    '/:classId/enroll',
    validator(ClassValidation.enrollValidationSchema),
    authorize(UserRole.ADMIN, UserRole.TEACHER),
    ClassController.enrollClass
)
const ClassRouter = router
export default ClassRouter
