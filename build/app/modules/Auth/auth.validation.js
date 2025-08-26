"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const enum_1 = require("../../enum");
// ✅ Signup Schema
const signupValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required').optional(),
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
    role: zod_1.z.nativeEnum(enum_1.UserRole, {
        errorMap: () => ({ message: 'Invalid role' }),
    }),
});
// ✅ Signup Schema
const signinValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
});
const AuthValidation = { signinValidationSchema, signupValidationSchema };
exports.default = AuthValidation;
