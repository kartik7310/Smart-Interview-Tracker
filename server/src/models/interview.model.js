import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    candidateName: {
      type: String,
      required: true,
      trim: true,
    },

    position: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "scheduled", "completed","cancelled"],
      default: "pending",
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    date: {
      type: Date,
      required: true,
    },

    notes: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Interview = mongoose.model("Interview", interviewSchema);

export default Interview;