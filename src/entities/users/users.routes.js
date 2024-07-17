import { Router } from 'express'
import { getAllUsers, getUserProfile, updateUser } from './users.controller.js'
import { auth } from '../middlewares/auth.js'
import { isSuperAdmin } from '../middlewares/isSuperAdmin.js'

const router = Router()


router.get('/',auth,isSuperAdmin ,getAllUsers)
router.get('/profile',auth, getUserProfile )
router.put('/profile',auth, updateUser)

export { router}