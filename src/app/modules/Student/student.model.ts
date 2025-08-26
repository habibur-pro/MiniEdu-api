import { Document, Model, model, Schema } from 'mongoose'

import idGenerator from '../../helpers/idGenerator'
import { UserRole } from '../../enum'
import { IStudent } from './student.interface'

const StudentSchema = new Schema<IStudent>(
    {
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
            type: Schema.Types.ObjectId,
            required: [true, 'age is required'],
            ref: 'class',
        },
    },
    {
        timestamps: true,
    }
)
StudentSchema.pre<IStudent>('validate', async function (next) {
    if (!this.id) {
        this.id = await idGenerator(
            this.constructor as Model<Document & IStudent>
        )
    }
    next()
})
const Student = model<IStudent>('student', StudentSchema)
export default Student
