"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = __importDefault(require("../../helpers/ApiError"));
const class_model_1 = __importDefault(require("../Class/class.model"));
const student_model_1 = __importDefault(require("./student.model"));
const http_status_1 = __importDefault(require("http-status"));
const createStudent = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const searchClass = yield class_model_1.default.findOne({ id: payload.class_id });
    if (!searchClass) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'class not found');
    }
    const studentData = Object.assign(Object.assign({}, payload), { class_id: searchClass._id });
    const newStudent = yield student_model_1.default.create(studentData);
    return newStudent;
});
const getAllStudents = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const skip = (page - 1) * page;
    const total = yield student_model_1.default.countDocuments();
    const students = yield student_model_1.default.find()
        .skip(skip)
        .limit(limit)
        .populate('class_id');
    return {
        meta: {
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
        },
        data: students,
    };
});
const getSingleStudent = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield student_model_1.default.findOne({ id: studentId }).populate('class_id');
    return student;
});
const StudentService = { createStudent, getAllStudents, getSingleStudent };
exports.default = StudentService;
