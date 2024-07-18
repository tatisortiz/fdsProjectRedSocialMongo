import { Router } from 'express'
import { createPost, deletePostById } from './post.controller.js'
import { auth } from '../middlewares/auth.js'

const router = Router()

router.post('/',auth,createPost)
router.delete('/:id', deletePostById)
// router.put('/api/posts')
// router.get('/api/posts/own')
// router.get('/api/posts')
// router.get('/api/posts/:id')
// router.get('/api/posts/user/:id')


export { router}
