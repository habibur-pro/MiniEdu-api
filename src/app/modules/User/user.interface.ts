import { UserRole } from '../../enum'

export interface IUser {
    id: string
    name: string
    email: string
    password_hash: string
    role: UserRole
    createdAt: Date
    updatedAt: Date
}
