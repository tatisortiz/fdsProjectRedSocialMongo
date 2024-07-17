import { Router } from "express";
import { router as usersRoutes} from './entities/users/users.routes.js';
import { router as postRoutes } from './entities/posts/post.routes.js';
import { router as authRoutes} from  './entities/auth/auth.routes.js'



const router = Router()

router.use('/users',usersRoutes)
router.use('/posts', postRoutes)
router.use('/auth', authRoutes)



export { router }