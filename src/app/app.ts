import express from 'express'
import cors from 'cors'
import globalErrorHandler from './helpers/globalErrorHandler'
import handleNotFound from './helpers/handleNotFound'
import morgan from 'morgan'
import router from './router'
import cookieParser from 'cookie-parser'
const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use('/api/v1', router)
app.get('/', (req, res) => {
    res.status(200).json({ message: 'application is running' })
})
app.use(handleNotFound)
app.use(globalErrorHandler)

export default app
