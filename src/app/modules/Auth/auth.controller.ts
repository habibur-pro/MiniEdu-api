import httpStatus from 'http-status'
import sendResponse from '../../helpers/sendResponse'

import catchAsync from '../../helpers/asyncHandler'
import AuthServices from './auth.service'

const signup = catchAsync(async (req, res) => {
    const data = await AuthServices.signup(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'signup success',
        data: data,
    })
})
const signIn = catchAsync(async (req, res) => {
    const data = await AuthServices.signin(req, res)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'signin success',
        data: data,
    })
})

const refreshToken = catchAsync(async (req, res) => {
    const data = await AuthServices.refreshToken(req, res)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'token refresh success',
        data: data,
    })
})
const AuthController = {
    signup,
    signIn,
    refreshToken,
}
export default AuthController
