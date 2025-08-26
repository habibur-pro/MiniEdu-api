// import { Response } from 'express'

// type TSendResponse<T> = {
//     statusCode: number
//     message: string
//     success: boolean
//     data?: T
// }

// const sendResponse = <T>(res: Response, resData: TSendResponse<T>) => {
//     return res.status(resData.statusCode).json({
//         status: resData.statusCode,
//         success: resData.success,
//         message: resData.message,
//         data: resData.data || { message: 'done' },
//     })
// }
// export default sendResponse

// utils/sendResponse.ts
import { Response } from 'express'

interface IApiResponse<T> {
    statusCode: number
    success: boolean
    message: string
    data?: T
    meta?: {
        page: number
        limit: number
        totalPages: number
        totalItems: number
    }
}

const sendResponse = <T>(
    res: Response,
    { statusCode, success, message, data, meta }: IApiResponse<T>
): void => {
    res.status(statusCode).json({
        success,
        status: statusCode,
        message,
        meta,
        data,
    })
}

export default sendResponse
