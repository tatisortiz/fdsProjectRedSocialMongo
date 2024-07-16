import { Router } from 'express'
import { getAllUsers, getUser, login, register, updateUser } from './users.controller.js'
import { auth } from '../middlewares/auth.js'
import { isSuperAdmin } from '../middlewares/isSuperAdmin.js'

const router = Router()

router.post('/api/auth/register', register)
router.post('/api/auth/login', login)
router.get('/api/users/',auth,isSuperAdmin ,getUser)
router.get('/api/users/profile', getAllUsers)
router.put('/api/users/profile', updateUser)

export { router}