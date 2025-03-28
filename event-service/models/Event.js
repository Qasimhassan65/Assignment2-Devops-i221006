const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    availableTickets: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);
