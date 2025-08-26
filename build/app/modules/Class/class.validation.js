"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// ✅ class enroll validation Schema
const enrollValidationSchema = zod_1.z.object({
    studentId: zod_1.z.string().min(1, 'student id is required'),
});
// ✅ class create validation
const classCreateValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'class name is required'),
    section: zod_1.z.string().min(1, 'section is required'),
});
const ClassValidation = { enrollValidationSchema, classCreateValidationSchema };
exports.default = ClassValidation;
