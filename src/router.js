import { Router } from "express";
import { router as usersRoutes} from './entities/users/users.routes.js'


const router = Router()

router.use('/users',usersRoutes)



export {router}