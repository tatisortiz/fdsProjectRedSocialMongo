import bcrypt from "bcrypt"
import User from "./user.model.js";
import jwt from "jsonwebtoken"


export const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password} = req.body
        
        const hashedPassword=  bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS))
        
        const newUser= await User.create (
            {   
                first_name : first_name,
                last_name: last_name,
                email: email,
                password: hashedPassword
            }
        )
      
    res.status(200).json(
        {
            success:true,
            message: "User registered",
            data: newUser
        }
    )
   

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

