import Activity from "../models/Activity.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { successResponse, errorResponse } from "../utils/response.js";

export const getMemberActivities = async (req, res) => {

    try {

        const activities = await Activity.find()
            .populate({
                path: "lead",
                match: {
                    assignedTo: req.user.id
                },
                select: "name company"
            })
            .populate("user", "name")
            .sort({
                createdAt: -1
            });


        const memberActivities = activities.filter(
            activity => activity.lead
        );


        return successResponse(
            res,
            200,
            "Activities fetched successfully.",
            memberActivities
        );


    } catch(error){

        console.error(error);

        return errorResponse(
            res,
            500,
            "Failed to fetch activities."
        );

    }

};

export const getMemberActivityStats = async(req,res)=>{

    try {

        const activities = await Activity.find()
        .populate({
            path:"lead",
            match:{
                assignedTo:req.user.id
            }
        });


        const memberActivities = activities.filter(
            activity=>activity.lead
        );


        return successResponse(
            res,
            200,
            "Activity statistics fetched successfully.",
            {
                totalActivities: memberActivities.length,

                statusChanges:
                    memberActivities.filter(
                        a=>a.type==="Status"
                    ).length,

                assignments:
                    memberActivities.filter(
                        a=>a.type==="Assignment"
                    ).length,

                notesAdded:
                    memberActivities.filter(
                        a=>a.type==="Note"
                    ).length
            }
        );


    } catch(error){

        console.error(error);

        return errorResponse(
            res,
            500,
            "Failed to fetch activity statistics."
        );

    }

};