import bcrypt from "bcrypt";
import User from "./user.model.js";


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({
      success: true,
      message: "Users retrieved",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Users can't be retrieved",
      error: error.message,
    });
  }
};
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.tokenData.id;
    const user = await User.findOne({ _id: userId }).select("-password");
    console.log(userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Can't find your profile",
      });
    }
    return res.status(201).json({
      success: true,
      message: "Your profile is retrieved successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      susscess: false,
      message: "Profile can't be retrieved",
      error: error.message,
    });
  }
};
export const updateUser = async (req, res) => {
  try {
    const userIdToUpdate = req.tokenData.id;
    const { first_name, last_name, email, password } = req.body;
     console.log(userIdToUpdate)
    let hashedPassword;

    if (password) {
      if (password.length < 8 || password.length > 12) {
        return res.status(400).json({
          success: false,
          message: "The password has to be between 8 and 12 characters",
        });
      } else {
        hashedPassword = bcrypt.hashSync(password, 10);
      }
    }
    const userUpdated = await User.updateOne(
      {
        _id: userIdToUpdate,
      },
      {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: hashedPassword,
      }
    );
    res.status(200).json({
      success: true,
      message: "User updated",
      data: userUpdated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error trying to update user",
      error: error.message || error,
    });
  }
};



















