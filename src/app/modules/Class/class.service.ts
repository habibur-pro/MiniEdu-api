import ApiError from '../../helpers/ApiError'
import Student from '../Student/student.model'
import User from '../User/user.model'
import { IClass } from './class.interface'
import Class from './class.model'
import httpStatus from 'http-status'

const createClass = async (payload: Partial<IClass>) => {
    const newClass = await Class.create(payload)
    return newClass
}
const getAllClass = async () => {
    const classes = await Class.find()
    return classes
}
const enrollClass = async (classId: string, payload: { studentId: string }) => {
    const searchClass = await Class.findOne({ id: classId })
    if (!searchClass) {
        throw new ApiError(httpStatus.NOT_FOUND, 'class not found')
    }
    const student = await Student.findOne({ id: payload.studentId })
    if (!student) {
        throw new ApiError(httpStatus.NOT_FOUND, 'student not found')
    }
    await Student.findOneAndUpdate(
        { id: student.id },
        { class_id: searchClass._id },
        { new: true }
    )
    return { message: 'enrollment success' }
}

const getStudentsOfClass = async (classId: string) => {
    const searchClass = await Class.findOne({ id: classId })
    if (!searchClass) {
        throw new ApiError(httpStatus.NOT_FOUND, 'class not found')
    }
    const students = await Student.find({ class_id: searchClass._id })
    return students
}

const ClassServices = {
    createClass,
    getAllClass,
    enrollClass,
    getStudentsOfClass,
}
export default ClassServices
