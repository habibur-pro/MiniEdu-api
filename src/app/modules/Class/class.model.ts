import { Document, Model, model, Schema } from 'mongoose'

import idGenerator from '../../helpers/idGenerator'
import { UserRole } from '../../enum'
import { IClass } from './class.interface'

const ClassSchema = new Schema<IClass>(
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
        section: {
            type: String,
            required: [true, 'section is required'],
            trim: true,
        },
    },
    {
        timestamps: true,
    }
)
ClassSchema.pre<IClass>('validate', async function (next) {
    if (!this.id) {
        this.id = await idGenerator(
            this.constructor as Model<Document & IClass>
        )
    }
    next()
})
const Class = model<IClass>('class', ClassSchema)
export default Class
