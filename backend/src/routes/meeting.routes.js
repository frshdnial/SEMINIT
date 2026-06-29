import express from "express";
import {
  getAllMeetings,
  getMeetingById,
  createMeeting
} from "../controllers/meeting.controller.js";

const router = express.Router();

router.get("/", getAllMeetings);

router.get("/:id", getMeetingById);

router.post("/", createMeeting);

export default router;