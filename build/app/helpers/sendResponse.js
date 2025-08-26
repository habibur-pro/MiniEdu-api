"use strict";
// import { Response } from 'express'
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, { statusCode, success, message, data, meta }) => {
    res.status(statusCode).json({
        success,
        status: statusCode,
        message,
        meta,
        data,
    });
};
exports.default = sendResponse;
