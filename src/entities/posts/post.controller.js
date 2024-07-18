import { Types } from "mongoose";
import Post from "./post.model.js"


export const createPost = async (req, res) => {
    try {
        const title = req.body.title;
        const description = req.body.description;
        const userId = req.tokenData.id;

        const newPost = await Post.create({
            title: title,
            description: description,
            user_id: userId
        });

        const populatedPost = await Post.findById(newPost._id).populate({
            path: "user_id",
            select: "-password"
        });


        res.status(201).json({
            success: true,
            message: "New post created succesfully",
            data: populatedPost
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error creating new post",
            error: error.message,
        });

    }
}

export const deletePostById = async (req, res) => {
    try {
         const userId = req.tokenData.id;
        const postIdToDelete = req.params.id;
        const postIdToDeleteIsValid = Types.ObjectId.isValid(postIdToDelete);
        if (!postIdToDeleteIsValid) {
          return res.status(400).json({
            success: false,
            message: "Post id not valid",
          });
        }
        const post = await Post.findById(postIdToDelete);

       if (post.user_id.toString() !== req.tokenData.id) {
          return res.status(403).json({
            success: false,
            message: "You are not authorized to delete this post",
          });
        }
        const deletedPost = await Post.findByIdAndDelete(postIdToDelete);
        if (!deletedPost) {
          return res.status(404).json({
            succes: false,
            message: "Post not found",
          });
        }
        res.status(200).json({
          success: true,
          message: "Post deleted",
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Error trying to delete post",
          error: error.message,
        });
      }
    };


    export const updatePostById = async (req, res) => {
        try {
            const Id = req.params.id
            const { title, description } = req.body
    
            const post = await Post.findOne({ _id: Id })
    
            if (!post) {
                return res.status(404).json({  
                    success: false,
                    message: "Post does not exist"
                })
            }
    
            if (post.user_id.toString() !== req.tokenData.id) {
                return res.status(403).json({
                  success: false,
                  message: "You are not authorized to update this post",
                });
            }
    
            const updatedPost = await Post.updateOne(
                { _id: Id },
                { title: title, description: description }
            )
    
            res.status(201).json({
                success: true,
                message: "Post updated",
                data: updatedPost
            })
    
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error updating post"
            })
        }
    }

export const getPostOwn = async (req, res) => {
    
    try {

        const userId = req.tokenData.id;

        const posts = await Post.find({ user_id: userId }).populate({ path: "user_id" });

        if (posts.length === 0) {
            return res.status(404).json({
                success: false,
                message: "You haven't created any posts yet",
            });
        }

        res.status(200).json({
            success: true,
            message: "Your posts retrieved",
            data: posts
        });

        
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Can't retrieve your posts",
                error: error.message
            }
        )
        
    }
};

export const getALLPost = async (req, res) => {
        try {
            const posts = await Post.find().populate({ path: "user_id", select: "name" });
    
            if (posts.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No posts found",
                });
            }
    
            res.status(200).json({
                success: true,
                message: "Posts retrieved",
                data: posts,
            });
    
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Posts can't be retrieved",
                error: error.message,
            });
        }
    }
export const getPostById = async (req, res) => {
    try {
    
                const postId = req.params.id;
        
                const post = await Post.findById(postId).populate({ path: "user_id", select: "-password " });
        
                if (!post) {
                    return res.status(404).json({
                        success: false,
                        message: "Post not found"
                    });
                }
        
                res.status(200).json({
                    success: true,
                    message: "Post retrieved successfully",
                    data: post
                });
        
            } catch (error) {
                res.status(500).json({
                    success: false,
                    message: "Error retrieving post",
                    error: error.message
                });
            } 
        }