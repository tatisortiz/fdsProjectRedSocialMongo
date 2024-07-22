import { Types } from "mongoose";
import Post from "./post.model.js";

export const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.tokenData.id;

    const newPost = await Post.create({
      title: title,
      description: description,
      user_id: userId,
    });

    const populatedPost = await Post.findById(newPost._id).populate({
      path: "user_id",
      select: "-password -_id"
    });

    res.status(201).json({
      success: true,
      message: "New post created succesfully",
      data: populatedPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error trying to create new post",
      error: error.message,
    });
  }
};

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

    if (post.user_id.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own posts",
      });
    }

    await Post.findByIdAndDelete(postIdToDelete);

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

export const deletePostByIdAdmin = async (req, res) => {
  try {
    const postIdToDelete = req.params.id;

    const postIdToDeleteIsValid = Types.ObjectId.isValid(postIdToDelete);
    if (!postIdToDeleteIsValid) {
      return res.status(400).json({
        success: false,
        message: "Post id not valid",
      });
    }

    await Post.findByIdAndDelete(postIdToDelete);

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
    const postId = req.params.id;
    const userId = req.tokenData.id;
    const { title, description } = req.body;

    const post = await Post.findOne({ _id: postId });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.user_id.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own posts",
      });
    }

    const updatedPost = await Post.updateOne(
      { _id: postId },
      { title: title, description: description }
    );

    res.status(201).json({
      success: true,
      message: "Post updated",
      data: updatedPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error trying to update post",
    });
  }
};

export const getPostOwn = async (req, res) => {
  try {
    const userId = req.tokenData.id;

    const posts = await Post.find({ user_id: userId });

    if (posts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "You haven't created any posts yet",
      });
    }

    res.status(200).json({
      success: true,
      message: "Your posts retrieved",
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error trying to retrieve your posts",
      error: error.message,
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate({
      path: "user_id",
      select: "first_name last_name",
    });

    if (posts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No posts found",
      });
    }

    res.status(200).json({
      success: true,
      message: "All posts retrieved",
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error trying to retrieve all posts",
      error: error.message,
    });
  }
};

export const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId).populate({
      path: "user_id",
      select: "-password ",
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post retrieved successfully",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error trying to retrieve post",
      error: error.message,
    });
  }
};

export const getPostsByUserId = async (req, res) => {
  try {
    const userId = req.params.id;

    const posts = await Post.find({ user_id: userId });

    if (posts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No posts by this user",
      });
    }

    res.status(201).json({
      success: true,
      message: "Post(s) found",
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error trying to find post by id",
    });
  }
};

export const likePostById = async (req, res) => {
  try {
    const userId = req.tokenData.id;
    const postId = req.params.id;

    console.log(userId);

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const hasLike = post.likes.includes(userId);

    if (hasLike) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();

    const message = hasLike
      ? "Post unliked successfully"
      : "Post liked successfully";

    res.status(200).json({
      success: true,
      message: message,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error liking/unliking post",
      error: error.message,
    });
  }
};