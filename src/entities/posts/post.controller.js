import Post from "./post.model.js" 


export const createPost = async (req, res) => {
    try {
        const title = req.body.title;
        const description = req.body.description;
        const userId = req.tokenData.userId;

        const newPost = await Post.create({
            title: title,
            description: description,
            userId: userId 
        });

        res.status(201).json({
            success: true,
            message: "New post created succesfully",
            data: newPost,
        });

        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error creating new post",
            error: error.message,
        });
        
    }
}