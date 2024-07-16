import { Router } from 'express'

const router = Router()

router.post('/api/posts', createPost)
router.delete('/api/posts/:id')
router.put('/api/posts')
router.get('/api/posts/own')
router.get('/api/posts')
router.get('/api/posts/:id')
router.get('/api/posts/user/:id')
