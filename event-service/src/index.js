// filepath: /Users/mc/Desktop/Devops Assignment/event-service/src/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("../config/db");
const eventRoutes = require("../routes/eventRoutes");

const app = express();
const PORT = process.env.PORT || 5002;

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/events", eventRoutes);

// Start Server
app.listen(PORT, () => console.log(`Event Service running on port ${PORT}`));