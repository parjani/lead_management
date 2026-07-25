import Lead from "../models/Lead.js";
import Activity from "../models/Activity.js";
import { successResponse, errorResponse } from "../utils/response.js";

// 1. GET ALL ASSIGNED LEADS (With Pagination & Filtering)
export const getMemberLeads = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10, status, search } = req.query;

    // Build Query scoped strictly to the logged-in Member
    const query = { assignedTo: userId };

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const [leads, total] = await Promise.all([
      Lead.find(query)
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Lead.countDocuments(query),
    ]);

    return successResponse(res, 200, "Assigned leads fetched successfully.", {
      leads,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, "Failed to fetch assigned leads.");
  }
};

// 2. GET SINGLE LEAD BY ID (Enforcing Ownership Check)
export const getMemberLeadById = async (req, res) => {

  try {

    const { id } = req.params;

    const lead = await Lead.findOne({
      _id: id,
      assignedTo: req.user.id
    })
      .populate("assignedTo", "name");

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

// 3. UPDATE LEAD STATUS & ACTIVITY LOG
export const updateMemberLeadStatus = async (req, res) => {

  try {

    const { id } = req.params;

    const { status } = req.body;


    // Validation

    if (!status) {

      return errorResponse(
        res,
        400,
        "Status is required."
      );

    }


    // Find lead assigned to logged in member

    const lead = await Lead.findOne({
      _id: id,
      assignedTo: req.user.id
    });
    const oldStatus = lead.status;

    if (!lead) {

      return errorResponse(
        res,
        404,
        "Lead not found or not assigned to you."
      );

    }



    // Update status

    lead.status = status;

    await lead.save();

    if (oldStatus !== lead.status) {
      await Activity.create({
        lead: id,
        action: `Status changed from ${oldStatus} to ${lead.status}`,
        user: req.user.id,
        type: "Status",
      });
    }
    return successResponse(
      res,
      200,
      "Lead status updated successfully.",
      {
        id: lead._id,
        status: lead.status
      }
    );


  } catch (error) {


    console.error(error);


    return errorResponse(
      res,
      500,
      "Failed to update lead status."
    );


  }

};

// 4. ADD TIMESTAMPED NOTE
export const addLeadNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const userId = req.user.id;

    if (!text) {
      return errorResponse(res, 400, "Note text is required.");
    }

    const lead = await Lead.findById(id);

    if (!lead) {
      return errorResponse(res, 404, "Lead not found.");
    }

    if (lead.assignedTo?.toString() !== userId) {
      return errorResponse(res, 403, "Access denied. Lead is not assigned to you.");
    }

    // Push note with timestamp and user ID
    lead.notes = lead.notes || [];
    lead.notes.push({
      text,
      createdBy: userId,
      createdAt: new Date(),
    });

    // Append to activity log
    lead.activityTrail = lead.activityTrail || [];
    lead.activityTrail.push({
      action: "Added a new note",
      performedBy: userId,
      timestamp: new Date(),
    });

    await lead.save();

    return successResponse(res, 200, "Note added successfully.", lead);
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, "Failed to add note.");
  }
};