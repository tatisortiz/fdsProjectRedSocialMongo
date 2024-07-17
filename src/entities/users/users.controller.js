import bcrypt from "bcrypt"
import User from "./user.model.js";
import jwt from "jsonwebtoken"

export const getUser = async (req, res) => { 
    try {
        const users = await User.find().select('-password');
        res.status(200).json(
            {
                success: true,
                message: "Users retrieved",
                data: users
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Users can't be retrieved",
                error: error.message
            }
        )
    }
}

export const getAllUsers= async (req, res) => {
    
    try {
        const userId = req.tokenData.userId
        const user = await User.findOne({_id: userId}).select('-password') //it doesn't show the password

        if (!user) {
            return res.status(401).json(
                {
                    success: false,
                    message: "Your profile doesn't exist",
                }
            )
        }

        return res.status(201).json(
            {
                success: true,
                message: "Your profile is retrieved successfully",
                data: user
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                susscess: false,
                message: "Profile can't be retrieved",
                error: error.message
            }
        )
    }
}


export const updateUser = async (req , res ) => { 
    
try {
    const userId = req.tokendata.id;
    const { first_name, last_name } = req.body;

    const findUserById = await User.findOne({_id: userId })

        if (!findUserById) {
            return res.status(500).json(
                {
                    success: false,
                    message: "User not found",
                }
            )
        }

 
    const userUpdated = await User.findOneAndUpdate(
        { _id: userId },
        { first_name, last_name },
        { new: true }
    );

    if (!userUpdated) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    res.status(201).json({
        success: true,
        message: "User updated",
    });

} catch (error) {
    res.status(500).json({
        success: false,
        message: "Error updating user",
        error: error.message
    });
}

}
    
   

