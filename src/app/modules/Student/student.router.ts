import { Router } from 'express'
import StudentController from './student.controller'

const router = Router()
router.get('/', StudentController.getAllStudents)
router.get('/:studentId', StudentController.getSingleStudent)
router.post('/', StudentController.createStudent)
const StudentRouter = router
export default StudentRouter
