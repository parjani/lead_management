import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    // Lead Information
    name: {
      type: String,
      required: [true, "Lead name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },

    company: {
      type: String,
      default: "",
      trim: true,
    },

    source: {
      type: String,
      default: "Website",
    },

    message: {
      type: String,
      default: "",
      trim: true,
    },

    // Lead Pipeline
    status: {
      type: String,
      default: "New",
    },

    // Assigned Member
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // Admin who created/imported the lead
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // Member Notes
    notes: [
      {
        text: {
          type: String,
          required: true,
          trim: true,
        },

        addedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  
  },
  {
    timestamps: true,
  }
);

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;