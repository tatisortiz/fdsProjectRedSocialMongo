import { Router } from 'express'
import { createPost, deletePostById, getALLPost, getPostById, getPostOwn, getPostsByUserId, likeUserById, updatePostById } from './post.controller.js'
import { auth } from '../middlewares/auth.js'

const router = Router()

router.post('/',auth,createPost)
router.delete('/:id', auth, deletePostById)
router.put('/like/:id',auth, likeUserById)
router.put('/:id', auth ,updatePostById)
router.get('/own', auth, getPostOwn)
router.get('/',auth, getALLPost)
router.get("/user/:id", getPostsByUserId);
router.get('/:id',auth , getPostById)




export { router}
