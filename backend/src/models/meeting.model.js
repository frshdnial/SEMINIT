import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    organizer: {
      type: String,
      required: true,
    },

    participants: [
      {
        type: String,
      },
    ],

    meetingDate: {
      type: Date,
      required: true,
    },

    duration: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Scheduled", "Processing", "Completed"],
      default: "Scheduled",
    },

    audioFile: {
      type: String,
      default: "",
    },

    transcript: {
      type: String,
      default: "",
    },

    aiSummary: {
      type: String,
      default: "",
    },

    meetingMinutes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Meeting", meetingSchema);