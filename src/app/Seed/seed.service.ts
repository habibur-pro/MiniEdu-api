import Class from '../modules/Class/class.model'
import Student from '../modules/Student/student.model'

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
]

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
]

const createSeedData = async () => {
    try {
        // delete existing classes
        await Class.deleteMany()
        // delete existing students
        await Student.deleteMany()
        // 1️⃣ Insert Classes
        const insertedClasses = await Class.insertMany(classesData)

        // 2️⃣ Insert Students with random class assignment
        const studentsToInsert = studentsData.map((name) => ({
            name,
            age: Math.floor(Math.random() * 5) + 11, // Random age between 11-15
            class_id:
                insertedClasses[
                    Math.floor(Math.random() * insertedClasses.length)
                ]._id,
        }))

        await Student.insertMany(studentsToInsert)
        const allStudents = await Student.find().populate('class_id')
        return allStudents
    } catch (error) {
        console.error('Error inserting data:', error)
    }
}

const SeedService = { createSeedData }
export default SeedService
