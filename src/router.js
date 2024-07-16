import { Router } from "express";
import { router as usersRoutes} from './entities/users/users.routes.js'
import {router as postRouter} from './entities/posts/post.routes.js'


const router = Router()

router.use('/users',usersRoutes)
router.use('posts/', postRouter)



export {router}