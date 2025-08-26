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
const student_model_1 = __importDefault(require("../Student/student.model"));
const class_model_1 = __importDefault(require("./class.model"));
const http_status_1 = __importDefault(require("http-status"));
const createClass = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newClass = yield class_model_1.default.create(payload);
    return newClass;
});
const getAllClass = () => __awaiter(void 0, void 0, void 0, function* () {
    const classes = yield class_model_1.default.find();
    return classes;
});
const enrollClass = (classId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const searchClass = yield class_model_1.default.findOne({ id: classId });
    if (!searchClass) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'class not found');
    }
    const student = yield student_model_1.default.findOne({ id: payload.studentId });
    if (!student) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'student not found');
    }
    yield student_model_1.default.findOneAndUpdate({ id: student.id }, { class_id: searchClass._id }, { new: true });
    return { message: 'enrollment success' };
});
const getStudentsOfClass = (classId) => __awaiter(void 0, void 0, void 0, function* () {
    const searchClass = yield class_model_1.default.findOne({ id: classId });
    if (!searchClass) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'class not found');
    }
    const students = yield student_model_1.default.find({ class_id: searchClass._id });
    return students;
});
const ClassServices = {
    createClass,
    getAllClass,
    enrollClass,
    getStudentsOfClass,
};
exports.default = ClassServices;
