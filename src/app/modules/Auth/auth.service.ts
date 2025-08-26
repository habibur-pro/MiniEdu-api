import ApiError from '../../helpers/ApiErrot'
import httpStatus from 'http-status'
import { IUser } from '../User/user.interface'
import User from '../User/user.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../../config'
import ms from 'ms'
import { getErrorMessage } from '../../helpers/getErrorMessage'
import RefreshToken from '../RefreshToken/refreshToken.model'
import { Request, Response } from 'express'
import { UserRole } from '../../enum'

function generateAccessToken(user: any) {
    return jwt.sign(user, config.access_token_secret, {
        expiresIn: config.access_token_expires_in as any,
    })
}

const generateRefreshToken = async (user: IUser): Promise<string> => {
    const expiresInMs = ms(config.refresh_token_expires_in as any)
    // calculate expiresAt date
    const expiresAt = new Date(Date.now() + expiresInMs)
    if (!expiresInMs) throw new Error('Invalid refresh token expiry')

    const newToken = jwt.sign({ id: user.id }, config.refresh_token_secret, {
        expiresIn: config.refresh_token_expires_in as any,
    })
    // delete if token exist
    await RefreshToken.deleteMany({ userId: user.id })
    // create new refresh token
    await RefreshToken.create({
        userId: user.id,
        token: newToken,
        expiresAt,
    })

    return newToken
}

const signup = async (payload: Partial<IUser & { password: string }>) => {
    try {
        const isExist = await User.findOne({ email: payload.email })
        if (isExist)
            throw new ApiError(httpStatus.CONFLICT, 'email already exist')
        if (!payload.password) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Password is required')
        }

        if (payload.role == UserRole.STUDENT) {
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                'you have not permission to signup'
            )
        }
        // hash password
        const hashedPassword = await bcrypt.hash(payload.password, 10)
        payload.password_hash = hashedPassword

        await User.create(payload)

        return { message: 'signup success' }
    } catch (error) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            getErrorMessage(error) || 'something went wrong'
        )
    }
}

const signin = async (req: Request, res: Response) => {
    const payload: { email: string; password: string } = req.body
    if (!payload?.email || !payload?.password) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            'email, password is required'
        )
    }

    const user = await User.findOne({ email: payload.email })
    if (!user) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'user not found')
    }
    const isMatched = await bcrypt.compare(payload.password, user.password_hash)
    if (!isMatched) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'wrong email or password')
    }

    const accessToken = generateAccessToken({
        id: user.id,
        email: user.email,
        role: user.role,
    })
    const refreshToken = await generateRefreshToken(user)
    // calculate expiry timestamps
    const accessTokenExpiresInMs = ms(
        (config.access_token_expires_in as any) || '15m'
    )
    const responseData = {
        accessToken,
        userId: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
    }
    const refreshTokenExpiryMs = ms(config.refresh_token_expires_in as any)
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true, // prevents JS access
        secure: false, //it will true for production
        sameSite: 'strict',
        maxAge: Number(refreshTokenExpiryMs), // cookie expiration in ms
    })
    return responseData
}

export async function refreshToken(req: Request, res: Response) {
    const { refreshToken } = req.cookies
    // check refresh token into cookie
    if (!refreshToken) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access')
    }

    // check into db
    const savedToken = await RefreshToken.findOne({ token: refreshToken })
    if (!savedToken) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access')
    }

    // Check if refresh token has expired
    if (savedToken.expiresAt < new Date()) {
        //  delete expired token from DB
        await RefreshToken.deleteOne({ token: refreshToken })
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Refresh token expired')
    }

    try {
        // Verify refresh token and extract user payload
        const token = jwt.verify(refreshToken, config.refresh_token_secret) as {
            id: string
        }
        const user = await User.findOne({ id: token.id })
        if (!user) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'invalid token')
        }

        // Generate new access token
        const accessToken = generateAccessToken({
            id: user.id,
            email: user.email,
            role: user.role,
        })
        // Generate new refresh token
        const newRefreshToken = await generateRefreshToken(user)
        // calculate expiry timestamps
        const accessTokenExpiresInMs = ms(
            (config.access_token_expires_in as any) || '15m'
        )
        const refreshTokenExpiryMs = ms(
            (config.refresh_token_expires_in as any) || '15m'
        )
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true, // prevents JS access
            secure: false, //it will true for production
            sameSite: 'strict',
            maxAge: Number(refreshTokenExpiryMs), // cookie expiration in ms
        })
        return {
            accessToken,
            accessTokenExpiresAt: Date.now() + accessTokenExpiresInMs,
        }
    } catch (error) {
        console.log('error', error)
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid refresh token')
    }
}

const AuthServices = {
    signup,
    signin,
    refreshToken,
}
export default AuthServices
