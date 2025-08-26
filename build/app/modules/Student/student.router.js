"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_controller_1 = __importDefault(require("./student.controller"));
const authorize_1 = require("../../helpers/authorize");
const enum_1 = require("../../enum");
const validator_1 = require("../../helpers/validator");
const student_validation_1 = __importDefault(require("./student.validation"));
const router = (0, express_1.Router)();
router.get('/', (0, authorize_1.authorize)(enum_1.UserRole.ADMIN, enum_1.UserRole.TEACHER), student_controller_1.default.getAllStudents);
router.get('/:studentId', (0, authorize_1.authorize)(enum_1.UserRole.ADMIN, enum_1.UserRole.TEACHER), student_controller_1.default.getSingleStudent);
router.post('/', (0, validator_1.validator)(student_validation_1.default.studentCreateValidation), (0, authorize_1.authorize)(enum_1.UserRole.ADMIN), student_controller_1.default.createStudent);
const StudentRouter = router;
exports.default = StudentRouter;
