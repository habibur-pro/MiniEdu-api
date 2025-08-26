import { Types } from 'mongoose'

export interface IStudent {
    id: string
    name: string
    age: number
    class_id: Types.ObjectId
    createdAt: Date
    updatedAt: Date
}
