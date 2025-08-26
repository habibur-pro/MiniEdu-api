"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const seed_controller_1 = __importDefault(require("./seed.controller"));
const router = (0, express_1.Router)();
router.post('/', seed_controller_1.default.createSeedData);
const SeedRouter = router;
exports.default = SeedRouter;
