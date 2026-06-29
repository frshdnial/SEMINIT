import express from "express";
import cors from "cors";
import morgan from "morgan";

import routes from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Seminit Backend API is running",
        version: "1.0.0"
    });
});

app.use("/api", routes);

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        status: "Healthy",
        timestamp: new Date()
    });
});

export default app;