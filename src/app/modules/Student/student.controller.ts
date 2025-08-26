import httpStatus from 'http-status'
import sendResponse from '../../helpers/sendResponse'
import catchAsync from '../../helpers/asyncHandler'
import StudentService from './student.service'

const createStudent = catchAsync(async (req, res) => {
    const data = await StudentService.createStudent(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'student created successfully',
        data: data,
    })
})
const getAllStudents = catchAsync(async (req, res) => {
    const data = await StudentService.getAllStudents(req)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'all student fetched successfully',
        meta: data.meta,
        data: data.data,
    })
})

const getSingleStudent = catchAsync(async (req, res) => {
    const classId = req.params.studentId
    const data = await StudentService.getSingleStudent(classId)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'student details fetched successful',
        data: data,
    })
})

const StudentController = {
    createStudent,
    getAllStudents,
    getSingleStudent,
}
export default StudentController
