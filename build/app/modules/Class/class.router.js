"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const class_controller_1 = __importDefault(require("./class.controller"));
const authorize_1 = require("../../helpers/authorize");
const enum_1 = require("../../enum");
const validator_1 = require("../../helpers/validator");
const class_validation_1 = __importDefault(require("./class.validation"));
const router = (0, express_1.Router)();
router.get('/:classId/students', (0, authorize_1.authorize)(enum_1.UserRole.ADMIN, enum_1.UserRole.TEACHER), class_controller_1.default.getStudentsOfClass);
router.get('/', (0, authorize_1.authorize)(enum_1.UserRole.ADMIN, enum_1.UserRole.TEACHER), class_controller_1.default.getAllClass);
router.post('/', (0, validator_1.validator)(class_validation_1.default.classCreateValidationSchema), (0, authorize_1.authorize)(enum_1.UserRole.ADMIN), class_controller_1.default.createClass);
router.post('/:classId/enroll', (0, validator_1.validator)(class_validation_1.default.enrollValidationSchema), (0, authorize_1.authorize)(enum_1.UserRole.ADMIN, enum_1.UserRole.TEACHER), class_controller_1.default.enrollClass);
const ClassRouter = router;
exports.default = ClassRouter;
