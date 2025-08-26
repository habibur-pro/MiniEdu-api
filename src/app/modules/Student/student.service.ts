import { Request } from 'express'
import ApiError from '../../helpers/ApiError'
import Class from '../Class/class.model'
import { IStudent } from './student.interface'
import Student from './student.model'
import httpStatus from 'http-status'
const createStudent = async (payload: Partial<IStudent>) => {
    const searchClass = await Class.findOne({ id: payload.class_id })
    if (!searchClass) {
        throw new ApiError(httpStatus.NOT_FOUND, 'class not found')
    }
    const studentData = { ...payload, class_id: searchClass._id }
    const newStudent = await Student.create(studentData)
    return newStudent
}
const getAllStudents = async (req: Request) => {
    const page = parseInt(req.query.page as string)
    const limit = parseInt(req.query.limit as string)
    const skip = (page - 1) * page

    const total = await Student.countDocuments()
    const students = await Student.find()
        .skip(skip)
        .limit(limit)
        .populate('class_id')
    return {
        meta: {
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
        },
        data: students,
    }
}
const getSingleStudent = async (studentId: string) => {
    const student = await Student.findOne({ id: studentId }).populate(
        'class_id'
    )
    return student
}

const StudentService = { createStudent, getAllStudents, getSingleStudent }
export default StudentService
