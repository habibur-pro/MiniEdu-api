import { Router } from 'express'
import ClassController from './class.controller'

const router = Router()
router.get('/:classId/students', ClassController.getStudentsOfClass)
router.get('/', ClassController.getAllClass)
router.post('/', ClassController.createClass)
router.post('/:classId/enroll', ClassController.enrollClass)
const ClassRouter = router
export default ClassRouter
