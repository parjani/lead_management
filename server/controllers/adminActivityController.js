import Activity from "../models/Activity.js";
import {
    successResponse,
    errorResponse
} from "../utils/response.js";


export const getAllActivities = async(req,res)=>{

    try {


        const activities = await Activity
            .find()
            .populate("user","name email")
            .populate("lead","name company")
            .sort({
                createdAt:-1
            });



        return successResponse(
            res,
            200,
            "Activities fetched successfully.",
            activities
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