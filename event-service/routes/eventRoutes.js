const express = require("express");
const { getEvents, getEventById, createEvent, checkEventAvailability, reduceTickets } = require("../controllers/eventController");

const router = express.Router();

// Get all events
router.get("/", getEvents);

// Get single event by ID
router.get("/:id", getEventById);

// Create a new event
router.post("/", createEvent);

// Check event availability
router.get("/:id/availability", checkEventAvailability);

// Reduce available tickets
router.post("/reduce-tickets", reduceTickets);

module.exports = router;