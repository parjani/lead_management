import mongoose from "mongoose";


const activitySchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },


    action: {
        type: String,
        required: true,
        trim: true,
    },


    lead: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lead",
        default: null,
    },


    type: {
        type: String,
        enum: [
            "Lead",
            "Status",
            "Assignment",
            "Note"
        ],
        required: true,
    },


},
{
    timestamps:true
}
);


const Activity = mongoose.model(
    "Activity",
    activitySchema
);


export default Activity;