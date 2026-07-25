import Lead from "../models/Lead.js";
import Activity from "../models/Activity.js";
import { successResponse, errorResponse } from "../utils/response.js";


export const getMemberDashboard = async (req,res)=>{

    try {

        const memberId = req.user.id;


        // Assigned leads count

        const assignedLeads = await Lead.countDocuments({
            assignedTo: memberId
        });



        // In progress leads

        const inProgress = await Lead.countDocuments({
            assignedTo: memberId,
            status:{
                $in:[
                    "Contacted",
                    "Qualified",
                    "Proposal Sent"
                ]
            }
        });



        // Won leads

        const wonLeads = await Lead.countDocuments({

            assignedTo: memberId,
            status:"Won"

        });



        // Today's followups
        // Currently no followup schema

        const todayFollowups = 0;



        // Recent assigned leads

        const recentLeads = await Lead.find({
            assignedTo:memberId
        })
        .select(
            "name company status email phone"
        )
        .sort({
            createdAt:-1
        })
        .limit(5);



        // Recent activities

        const activities = await Activity.find({
            user:memberId
        })
        .populate(
            "lead",
            "name company"
        )
        .sort({
            createdAt:-1
        })
        .limit(5);



        return successResponse(
            res,
            200,
            "Member dashboard fetched successfully.",
            {

                stats:{
                    assignedLeads,
                    inProgress,
                    wonLeads,
                    todayFollowups
                },


                recentLeads,


                activities

            }
        );



    } catch(error){

        console.error(error);


        return errorResponse(
            res,
            500,
            "Failed to fetch dashboard."
        );

    }

};