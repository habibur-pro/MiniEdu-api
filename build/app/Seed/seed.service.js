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
const class_model_1 = __importDefault(require("../modules/Class/class.model"));
const student_model_1 = __importDefault(require("../modules/Student/student.model"));
const classesData = [
    { name: 'Mathematics', section: 'A' },
    { name: 'Science', section: 'B' },
    { name: 'History', section: 'C' },
    { name: 'English', section: 'A' },
    { name: 'Geography', section: 'B' },
    { name: 'Physics', section: 'C' },
    { name: 'Chemistry', section: 'A' },
    { name: 'Biology', section: 'B' },
    { name: 'Computer', section: 'C' },
    { name: 'Economics', section: 'A' },
    { name: 'Arts', section: 'B' },
    { name: 'Physical Education', section: 'C' },
    { name: 'Music', section: 'A' },
    { name: 'Drama', section: 'B' },
    { name: 'Civics', section: 'C' },
];
const studentsData = [
    'Alice',
    'Bob',
    'Charlie',
    'David',
    'Eva',
    'Frank',
    'Grace',
    'Hannah',
    'Ian',
    'Jack',
    'Kathy',
    'Leo',
    'Mia',
    'Nina',
    'Oscar',
];
const createSeedData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // delete existing classes
        yield class_model_1.default.deleteMany();
        // delete existing students
        yield student_model_1.default.deleteMany();
        // 1️⃣ Insert Classes
        const insertedClasses = yield class_model_1.default.insertMany(classesData);
        // 2️⃣ Insert Students with random class assignment
        const studentsToInsert = studentsData.map((name) => ({
            name,
            age: Math.floor(Math.random() * 5) + 11, // Random age between 11-15
            class_id: insertedClasses[Math.floor(Math.random() * insertedClasses.length)]._id,
        }));
        yield student_model_1.default.insertMany(studentsToInsert);
        const allStudents = yield student_model_1.default.find().populate('class_id');
        return allStudents;
    }
    catch (error) {
        console.error('Error inserting data:', error);
    }
});
const SeedService = { createSeedData };
exports.default = SeedService;
