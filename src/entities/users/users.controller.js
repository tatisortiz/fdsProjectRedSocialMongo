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

export const login = async (req, res) => {
    try {

        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json(
                {
                    success: true,
                    message: 'email and password are required'
                }
            )
        }

        const user = await User.findOne(
            {
                email: email
            }
        )

        console.log(user)

        if (!user) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'email or password are invalid'
                }
            )
        }

        const passwordVerified = bcrypt.compareSync(password, user.password)

        if (!passwordVerified) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'email or password are invalid'
                }
            )
        }

        const token = jwt.sign(
            {
                _id: user._id,
                roles: user.roles,
            },

            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            }
        )

        res.status(200).json(
            {
                success: true,
                message: 'User logged',
                data: token
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'Error loggin user',
                error: error
            }
        )

    }
}

export const getAllUsers= async (req, res) => {
    try { 
        const users = await User.find(). select("-password")
        

    res.status(200).json(
    {
      success: true,
      message: "User retrieved successfully",
      data: users
    }

  )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message : "error retrieving users",
                error: error.message
            }
        )
        
    }
}

export const updateUser = async (req , res ) => { 
    
try {
    const userId = req.tokenData.id;
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
    
   

