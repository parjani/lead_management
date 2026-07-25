import Lead from "../models/Lead.js";
import Activity from "../models/Activity.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const getAllLeads = async (req, res) => {
  try {

    const leads = await Lead.find()
      .populate("assignedTo", "name email")
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    return successResponse(
      res,
      200,
      "Leads fetched successfully.",
      leads
    );

  } catch (error) {

    console.error(error);

    return errorResponse(
      res,
      500,
      "Failed to fetch leads."
    );

  }
};
export const getLeadById = async (req, res) => {
  try {

    const { id } = req.params;

    const lead = await Lead.findById(id)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    if (!lead) {
      return errorResponse(
        res,
        404,
        "Lead not found."
      );
    }

    return successResponse(
      res,
      200,
      "Lead fetched successfully.",
      lead
    );

  } catch (error) {

    console.error(error);

    return errorResponse(
      res,
      500,
      "Failed to fetch lead."
    );

  }
};
export const createLead = async (req, res) => {
  try {

    const {
      name,
      email,
      phone,
      company,
      source,
      message,
      status,
      assignedTo,
    } = req.body;

    if (!name || !email || !phone) {
      return errorResponse(
        res,
        400,
        "Name, email and phone are required."
      );
    }

    const lead = await Lead.create({
      name,
      email,
      phone,
      company,
      source,
      message,
      status,
      assignedTo,
      createdBy: req.user.id,


    });

    await Activity.create({
      lead: req.params.id,
      action: "Lead Created",
      user: req.user.id,
      type: "Lead",
    });

    if (assignedTo) {
      await Activity.create({
        lead: lead._id,
        action: "Lead Assigned",
        user: req.user.id,
        type: "Assignment",
      });
    }
    return successResponse(
      res,
      201,
      "Lead created successfully.",
      lead
    );

  } catch (error) {

    console.error(error);

    return errorResponse(
      res,
      500,
      "Failed to create lead."
    );

  }
};
export const updateLead = async (req, res) => {
  try {
    const { id } = req.params;

    const lead = await Lead.findById(id);

    if (!lead) {
      return errorResponse(
        res,
        404,
        "Lead not found."
      );
    }

    // Save old status
    const oldStatus = lead.status;
    const oldAssignedTo = lead.assignedTo;

    Object.assign(lead, req.body);

    await lead.save();

    await Activity.create({
      lead: id,
      action: "Lead Updated",
      user: req.user.id,
      type: "Lead",
    });

    if (oldStatus !== lead.status) {
      await Activity.create({
        lead: id,
        action: `Status changed from ${oldStatus} to ${lead.status}`,
        user: req.user.id,
        type: "Status",
      });
    }

    if (!oldAssignedTo && lead.assignedTo) {
      await Activity.create({
        lead: id,
        action: "Lead Assigned",
        user: req.user.id,
        type: "Assignment",
      });
    }

    return successResponse(
      res,
      200,
      "Lead updated successfully.",
      lead
    );

  } catch (error) {
    console.error(error);

    return errorResponse(
      res,
      500,
      "Failed to update lead."
    );
  }
};
export const deleteLead = async (req, res) => {
  try {

    const { id } = req.params;

    const lead = await Lead.findById(id);

    if (!lead) {
      return errorResponse(
        res,
        404,
        "Lead not found."
      );
    }

    await Lead.findByIdAndDelete(id);

    return successResponse(
      res,
      200,
      "Lead deleted successfully."
    );

  } catch (error) {

    console.error(error);

    return errorResponse(
      res,
      500,
      "Failed to delete lead."
    );

  }
};
export const addNote = async (req, res) => {
  try {
    const { text } = req.body;

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return errorResponse(res, 404, "Lead not found.");
    }

    lead.notes.push({
      text,
      addedBy: req.user.id,
    });

    await lead.save();

    await Activity.create({
      lead: req.params.id,
      action: "Added a note",
      user: req.user.id,
      type: "Note",
    });

    return successResponse(
      res,
      200,
      "Note added successfully.",
      lead
    );

  } catch (error) {
    console.error(error);

    return errorResponse(
      res,
      500,
      "Failed to add note."
    );
  }
};