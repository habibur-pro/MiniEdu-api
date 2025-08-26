import ApiError from '../../helpers/ApiErrot'
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
const getAllStudents = async () => {
    const students = await Student.find().populate('class_id')
    return students
}
const getSingleStudent = async (studentId: string) => {
    const student = await Student.findOne({ id: studentId }).populate(
        'class_id'
    )
    return student
}

const StudentService = { createStudent, getAllStudents, getSingleStudent }
export default StudentService
