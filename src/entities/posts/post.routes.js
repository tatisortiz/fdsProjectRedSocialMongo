import { Router } from 'express'
import { createPost, deletePostById, getALLPost, getPostById, getPostOwn, updatePostById } from './post.controller.js'
import { auth } from '../middlewares/auth.js'

const router = Router()

router.post('/',auth,createPost)
router.delete('/:id', auth, deletePostById)
router.put('/:id', auth ,updatePostById)
router.get('/own', auth, getPostOwn)
router.get('/',auth, getALLPost)
router.get('/:id',auth , getPostById)
// router.get('/api/posts/user/:id')


export { router}
