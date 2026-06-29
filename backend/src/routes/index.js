import express from "express";
import meetingRoutes from "./meeting.routes.js";

const router = express.Router();

router.use("/meetings", meetingRoutes);

export default router;