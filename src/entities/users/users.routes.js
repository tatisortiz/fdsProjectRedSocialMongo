import { Router } from 'express'
import { getAllUsers, getUser, updateUser } from './users.controller.js'
import { auth } from '../middlewares/auth.js'
import { isSuperAdmin } from '../middlewares/isSuperAdmin.js'

const router = Router()


router.get('/users/',auth,isSuperAdmin ,getUser)
router.get('/users/profile', getAllUsers)
router.put('/users/profile', updateUser)

export { router}