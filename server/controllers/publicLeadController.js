import Lead from "../models/Lead.js";
import {
  successResponse,
  errorResponse,
} from "../utils/response.js";

export const createPublicLead = async (req, res) => {

  try {

    const {
      name,
      email,
      phone,
      company,
      source,
      message,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !company ||
      !source
    ) {

      return errorResponse(
        res,
        400,
        "All required fields must be provided."
      );

    }

    const lead = await Lead.create({

      name,
      email,
      phone,
      company,
      source,
      message,
      status: "New",

    });

    return successResponse(
      res,
      201,
      "Lead submitted successfully.",
      lead
    );

  } catch (error) {

    console.error(error);

    return errorResponse(
      res,
      500,
      "Failed to submit lead."
    );

  }

};