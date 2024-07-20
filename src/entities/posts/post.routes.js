import { Router } from 'express'
import { createPost, deletePostById, deletePostByIdAdmin, getAllPosts, getPostById, getPostOwn, getPostsByUserId, likePostById, updatePostById } from './post.controller.js'
import { auth } from '../middlewares/auth.js'
import { isSuperAdmin} from '../middlewares/isSuperAdmin.js'

const router = Router()

router.post('/',auth,createPost)
router.delete("/admin/:id", auth, isSuperAdmin, deletePostByIdAdmin);
router.delete('/:id', auth, deletePostById)
router.put('/like/:id',auth, likePostById)
router.put('/:id', auth ,updatePostById)
router.get('/own', auth, getPostOwn)
router.get('/',auth, getAllPosts)
router.get("/user/:id", getPostsByUserId);
router.get('/:id',auth , getPostById)




export { router}
