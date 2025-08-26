import { Router } from 'express'
import AuthRoutes from '../modules/Auth/auth.router'
import ClassRouter from '../modules/Class/class.router'
import StudentRouter from '../modules/Student/student.router'
import SeedRouter from '../Seed/seed.router'

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
    {
        path: '/students',
        route: StudentRouter,
    },
    {
        path: '/seed-script',
        route: SeedRouter,
    },
]

routes.map((route) => router.use(route.path, route.route))

export default router
