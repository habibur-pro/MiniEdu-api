"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("./auth.controller"));
const validator_1 = require("../../helpers/validator");
const auth_validation_1 = __importDefault(require("./auth.validation"));
const router = (0, express_1.Router)();
router.post('/signup', (0, validator_1.validator)(auth_validation_1.default.signupValidationSchema), auth_controller_1.default.signup);
router.post('/signin', (0, validator_1.validator)(auth_validation_1.default.signinValidationSchema), auth_controller_1.default.signIn);
router.post('/refresh', auth_controller_1.default.refreshToken);
const AuthRoutes = router;
exports.default = AuthRoutes;
