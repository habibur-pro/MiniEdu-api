import { NextFunction, Request, Response } from 'express'
import { ZodSchema } from 'zod'
import httpStatus from 'http-status'
import ApiError from './ApiError'
import { getErrorMessage } from './getErrorMessage'

export function validator<T>(schema: ZodSchema<T>) {
    return (req: Request, _res: Response, next: NextFunction) => {
        try {
            const parsedData = schema.parse(req.body)
            req.body = parsedData
            next()
        } catch (error) {
            next(error) // <-- pass ZodError to global error handler
        }
    }
}
