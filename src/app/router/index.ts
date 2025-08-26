import { Router } from 'express'
import AuthRoutes from '../modules/Auth/auth.router'
import ClassRouter from '../modules/Class/class.router'

const router = Router()
const routes = [
    {
        path: '/auth',
        route: AuthRoutes,
    },
    {
        path: '/classes',
        route: ClassRouter,
    },
]

routes.map((route) => router.use(route.path, route.route))

export default router
