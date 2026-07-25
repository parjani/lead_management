import Lead from "../models/Lead.js";
import { successResponse, errorResponse } from "../utils/response.js";


export const getDashboardStats = async (req, res) => {

    try {

        const totalLeads = await Lead.countDocuments();


        const newLeads = await Lead.countDocuments({
            status: "New",
        });


        const qualifiedLeads = await Lead.countDocuments({
            status: "Qualified",
        });


        const wonDeals = await Lead.countDocuments({
            status: "Won",
        });



        return successResponse(
            res,
            200,
            "Dashboard stats fetched successfully.",
            {
                totalLeads,
                newLeads,
                qualifiedLeads,
                wonDeals,
            }
        );


    } catch(error){

        console.error(error);

        return errorResponse(
            res,
            500,
            "Failed to fetch dashboard stats."
        );

    }

};