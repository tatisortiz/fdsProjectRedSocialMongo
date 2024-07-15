import bcrypt from "bcrypt"
import User from "./user.model.js";
import jwt from "jsonwebtoken"


export const register = async (req, res) => {
    try {
        



    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: " Error registering user",
                error : error.message
            }
        )
        
    }
}