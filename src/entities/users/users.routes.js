import { Router } from 'express'
import { getAllUsers, getUserProfile, updateUser } from './users.controller.js'
import { auth } from '../middlewares/auth.js'
import { isSuperAdmin } from '../middlewares/isSuperAdmin.js'

const router = Router()


router.get('/',auth,isSuperAdmin ,getAllUsers)
router.get('/users/profile', getUserProfile )
router.put('/users/profile', updateUser)

export { router}