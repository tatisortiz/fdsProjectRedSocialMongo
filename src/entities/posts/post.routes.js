import { Router } from 'express'
import { createPost, deletePostById, updatePost } from './post.controller.js'
import { auth } from '../middlewares/auth.js'

const router = Router()

router.post('/',auth,createPost)
router.delete('/:id', auth, deletePostById)
router.put('/:id', auth ,updatePost)
router.get('/own')
// router.get('/api/posts')
// router.get('/api/posts/:id')
// router.get('/api/posts/user/:id')


export { router}
