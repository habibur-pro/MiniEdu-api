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
const mongoose_1 = require("mongoose");
const idGenerator_1 = __importDefault(require("../../helpers/idGenerator"));
const StudentSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: [true, 'User ID is required'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'name is required'],
        trim: true,
    },
    age: {
        type: Number,
        required: [true, 'age is required'],
    },
    class_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'age is required'],
        ref: 'class',
    },
}, {
    timestamps: true,
});
StudentSchema.pre('validate', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.id) {
            this.id = yield (0, idGenerator_1.default)(this.constructor);
        }
        next();
    });
});
const Student = (0, mongoose_1.model)('student', StudentSchema);
exports.default = Student;
