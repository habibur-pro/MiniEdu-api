import { Router } from 'express'
import SeedController from './seed.controller'
const router = Router()
router.post('/', SeedController.createSeedData)

const SeedRouter = router
export default SeedRouter
