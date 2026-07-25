import User from "../models/User.js";
import Lead from "../models/Lead.js";
import Activity from "../models/Activity.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { successResponse, errorResponse } from "../utils/response.js";

export const loginUser = async (req, res) => {
  try {

    if (!req.body) {
      return errorResponse(res, 400, "Request body is required.");
    }

    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return errorResponse(
        res,
        400,
        "Email and password are required."
      );
    }

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return errorResponse(
        res,
        401,
        "Invalid email or password."
      );
    }

    // Compare password
    const isPasswordMatch = await user.comparePassword(password);

    console.log("Entered password:", password);
    console.log("Stored hash:", user.password);
    console.log("Password match:", isPasswordMatch);

    if (!isPasswordMatch) {
      return errorResponse(
        res,
        401,
        "Invalid email or password."
      );
    }

    // Generate token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return successResponse(
      res,
      200,
      "Login successful.",
      {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      }
    );

  } catch (error) {

    console.error(error);

    return errorResponse(
      res,
      500,
      "Internal Server Error."
    );

  }
};

export const logoutUser = async (req, res) => {
  try {

    return successResponse(
      res,
      200,
      "Logout successful."
    );

  } catch (error) {

    console.error(error);

    return errorResponse(
      res,
      500,
      "Internal Server Error."
    );


  }
};

export const getCurrentUser = async (req, res) => {
  try {

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // const assignedLeads = await Lead.countDocuments({
    //   assignedTo: user._id,
    // });

    const assignedLeads = await Activity.countDocuments({
      user: user._id,
      type: "Assignment"
    });

    const createdLeads = await Lead.countDocuments({
      createdBy: user._id,
    });

    const totalActivities = await Activity.countDocuments({
      user: user._id,
    });

    return res.status(200).json({
      success: true,
      user: {
        ...user.toObject(),
        assignedLeads,
        createdLeads,
        totalActivities,
      },
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });

  }
};

export const changePassword = async (req, res) => {
  try {

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const isPasswordMatch = await user.comparePassword(
      currentPassword
    );

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect.",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully.",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });

  }
};

export const refreshToken = async (req, res) => {

  return res.status(501).json({
    success: false,
    message: "Refresh token is not implemented.",
  });

};

export const forgotPassword = async (req, res) => {

  return res.status(501).json({
    success: false,
    message: "Forgot password is not implemented.",
  });

};

export const resetPassword = async (req, res) => {

  return res.status(501).json({
    success: false,
    message: "Reset password is not implemented.",
  });

};
export const updateProfile = async (req, res) => {

  try {

    const {
      name,
      email,
      phone
    } = req.body;


    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        email,
        phone
      },
      {
        new: true
      }
    ).select("-password");


    return successResponse(
      res,
      200,
      "Profile updated successfully.",
      user
    );


  } catch (error) {

    console.log(error);

    return errorResponse(
      res,
      500,
      "Failed to update profile."
    );

  }

};