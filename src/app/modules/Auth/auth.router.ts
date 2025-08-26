import { Router } from 'express'
import AuthController from './auth.controller'
import { validator } from '../../helpers/validator'
import AuthValidation from './auth.validation'

const router = Router()
router.post(
    '/signup',
    validator(AuthValidation.signupValidationSchema),
    AuthController.signup
)
router.post(
    '/signin',
    validator(AuthValidation.signinValidationSchema),
    AuthController.signIn
)
router.post('/refresh', AuthController.refreshToken)
const AuthRoutes = router
export default AuthRoutes
