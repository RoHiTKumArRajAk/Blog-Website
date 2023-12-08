import express from "express";

import { signupUser , loginUser} from "../controller/user-controller.js";
import { uploadImage , getImage} from "../controller/image-controller.js";
import { createPost , getAllPosts , getPost ,updatePost ,deletePost } from "../controller/post-controller.js";
import { authenticateToken } from "../controller/jwt-controller.js";
import { newComment , getComments , deleteComment } from "../controller/comment-controller.js";

import upload from '../utils/upload.js';

const router = express.Router();

// For Users
router.post('/login',loginUser);
router.post('/signup',signupUser);

// For Picture 
router.post('/file/upload',upload.single('file'),uploadImage);      //router.post takes three arguments url , middleware and then the function
router.get('/file/:filename',getImage); 


// For Post
router.post('/create',authenticateToken ,createPost);
router.get('/posts',authenticateToken ,getAllPosts);
router.get('/post',authenticateToken ,getPost);
router.put('/update',authenticateToken ,updatePost);
router.delete('/delete',authenticateToken ,deletePost);

// For Comments
router.post('/comment/new',authenticateToken ,newComment);
router.get('/comments',authenticateToken ,getComments);
router.delete('/comment/delete',authenticateToken ,deleteComment);

export default router;


//authenticateToken: This is presumably a middleware function. Middleware functions are used to perform tasks before or after handling the request. In this case, authenticateToken is likely used to authenticate the user making the request, ensuring that only authenticated users can create a post.