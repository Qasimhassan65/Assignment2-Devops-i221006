import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/createEvent.css";

const CreateEvent = () => {
  const navigate = useNavigate();

  // Form state
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    availableTickets: "",
  });

  const [error, setError] = useState("");

  // Handle form changes
  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (
      !eventData.name ||
      !eventData.description ||
      !eventData.date ||
      !eventData.location ||
      !eventData.availableTickets
    ) {
      setError("All fields are required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5002/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error("Failed to create event");
      }

      // Clear form & navigate back to Home
      setEventData({
        name: "",
        description: "",
        date: "",
        location: "",
        availableTickets: "",
      });

      setError("");
      alert("Event Created Successfully!");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="create-event-page">
      <h1>Create New Event</h1>
      {error && <p className="create-event-error">{error}</p>}
      <form onSubmit={handleSubmit} className="create-event-form">
        <input type="text" name="name" placeholder="Event Name" value={eventData.name} onChange={handleChange} />
        <textarea name="description" placeholder="Event Description" value={eventData.description} onChange={handleChange} />
        <input type="date" name="date" value={eventData.date} onChange={handleChange} />
        <input type="text" name="location" placeholder="Location" value={eventData.location} onChange={handleChange} />
        <input type="number" name="availableTickets" placeholder="Available Tickets" value={eventData.availableTickets} onChange={handleChange} />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;