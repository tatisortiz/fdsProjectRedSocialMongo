import { Router } from 'express'
import { getAllUsers, login, register, updateUser } from './users.controller.js'

const router = Router()

router.post('/api/auth/register', register)
router.post('/api/auth/login', login)
router.get('/api/users/profile', getAllUsers)
router.put('/api/users/profile', updateUser)

export { router}