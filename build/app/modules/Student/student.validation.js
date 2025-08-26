"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// ✅ student create validation Schema
const studentCreateValidation = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    age: zod_1.z
        .number({ invalid_type_error: 'Age must be a number' })
        .positive({ message: 'Age must be positive' }),
    class_id: zod_1.z.string().min(1, 'class_id is required'),
});
const StudentValidation = {
    studentCreateValidation,
};
exports.default = StudentValidation;
