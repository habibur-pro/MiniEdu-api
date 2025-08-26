import httpStatus from 'http-status'
import sendResponse from '../../helpers/sendResponse'
import catchAsync from '../../helpers/asyncHandler'
import ClassServices from './class.service'

const createClass = catchAsync(async (req, res) => {
    const data = await ClassServices.createClass(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'class created successfully',
        data: data,
    })
})
const getAllClass = catchAsync(async (req, res) => {
    const data = await ClassServices.getAllClass()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'all class fetched successfully',
        data: data,
    })
})
const enrollClass = catchAsync(async (req, res) => {
    const classId = req.params.classId
    const data = await ClassServices.enrollClass(classId, req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'enroll successful',
        data: data,
    })
})
const getStudentsOfClass = catchAsync(async (req, res) => {
    const classId = req.params.classId
    const data = await ClassServices.getStudentsOfClass(classId)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'all enrolled students fetched successful',
        data: data,
    })
})

const ClassController = {
    createClass,
    getAllClass,
    enrollClass,
    getStudentsOfClass,
}
export default ClassController
