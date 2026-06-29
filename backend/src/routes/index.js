import express from "express";

import meetingRoutes from "./meeting.routes.js";
import userRoutes from "./user.routes.js";

const router = express.Router();

router.use("/meetings", meetingRoutes);

router.use("/users", userRoutes);

export default router;