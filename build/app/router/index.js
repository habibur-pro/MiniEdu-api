"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_router_1 = __importDefault(require("../modules/Auth/auth.router"));
const class_router_1 = __importDefault(require("../modules/Class/class.router"));
const student_router_1 = __importDefault(require("../modules/Student/student.router"));
const seed_router_1 = __importDefault(require("../Seed/seed.router"));
const router = (0, express_1.Router)();
const routes = [
    {
        path: '/auth',
        route: auth_router_1.default,
    },
    {
        path: '/classes',
        route: class_router_1.default,
    },
    {
        path: '/students',
        route: student_router_1.default,
    },
    {
        path: '/seed-script',
        route: seed_router_1.default,
    },
];
routes.map((route) => router.use(route.path, route.route));
exports.default = router;
