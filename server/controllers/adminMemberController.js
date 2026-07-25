import User from "../models/User.js";
import Lead from "../models/Lead.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const getAllMembers = async (req, res) => {
  try {

    const members = await User.find({ role: "member" })
      .select("-password")
      .sort({ createdAt: -1 });

    const membersWithCount = await Promise.all(
      members.map(async (member) => {
        const leadCount = await Lead.countDocuments({
          assignedTo: member._id,
        });

        return {
          ...member.toObject(),
          leadCount,
        };
      })
    );

    return successResponse(
      res,
      200,
      "Members fetched successfully.",
      membersWithCount
    );

  } catch (error) {

    console.error(error);

    return errorResponse(
      res,
      500,
      "Failed to fetch members."
    );

  }
};
export const getMemberById = async (req, res) => {
  try {

    const { id } = req.params;

    const member = await User.findOne({
      _id: id,
      role: "member",
    }).select("-password");

    if (!member) {
      return errorResponse(
        res,
        404,
        "Member not found."
      );
    }

    const leads = await Lead.find({
      assignedTo: id,
    })
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    return successResponse(
      res,
      200,
      "Member fetched successfully.",
      {
        member,
        leads,
        leadCount: leads.length,
      }
    );

  } catch (error) {

    console.error(error);

    return errorResponse(
      res,
      500,
      "Failed to fetch member."
    );

  }
};
export const createMember = async (req, res) => {
  try {

    const {
      name,
      email,
      phone,
      password,
      status,
    } = req.body;

    // Validation

    if (!name || !email || !phone || !password) {

      return errorResponse(
        res,
        400,
        "All required fields must be provided."
      );

    }

    // Check existing email

    const existingMember = await User.findOne({ email });

    if (existingMember) {

      return errorResponse(
        res,
        409,
        "Email already exists."
      );

    }

    // Create member

    const member = await User.create({
      name,
      email,
      phone,
      password,
      role: "member",
      status: status || "active",
    });

    // Remove password before sending response

    const memberData = member.toObject();
    delete memberData.password;

    return successResponse(
      res,
      201,
      "Member created successfully.",
      memberData
    );

  } catch (error) {

    console.error(error);

    return errorResponse(
      res,
      500,
      "Failed to create member."
    );

  }
};
export const updateMember = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      name,
      email,
      phone,
      password,
      status,
    } = req.body;

    // Find member

    const member = await User.findOne({
      _id: id,
      role: "member",
    });

    if (!member) {

      return errorResponse(
        res,
        404,
        "Member not found."
      );

    }

    // Check duplicate email

 

    // Update fields

    member.name = name || member.name;
    member.email = email || member.email;
    member.phone = phone || member.phone;
    member.status = status || member.status;

    // Update password only if provided

    if (password && password.trim() !== "") {

      member.password = password;

    }

    await member.save();

    const memberData = member.toObject();

    delete memberData.password;

    return successResponse(
      res,
      200,
      "Member updated successfully.",
      memberData
    );

  } catch (error) {

    console.error(error);

    return errorResponse(
      res,
      500,
      "Failed to update member."
    );

  }
};
export const deleteMember = async (req, res) => {
  try {

    const { id } = req.params;

    // Find member

    const member = await User.findOne({
      _id: id,
      role: "member",
    });

    if (!member) {

      return errorResponse(
        res,
        404,
        "Member not found."
      );

    }

    await member.deleteOne();

    return successResponse(
      res,
      200,
      "Member deleted successfully.",
      null
    );

  } catch (error) {

    console.error(error);

    return errorResponse(
      res,
      500,
      "Failed to delete member."
    );

  }
};