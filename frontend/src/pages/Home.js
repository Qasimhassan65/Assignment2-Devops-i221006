import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5002/api/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="home-container">
      <h1>Upcoming Events</h1>
      {loading && <p>Loading events...</p>}
      {error && <p className="error">{error}</p>}
      <div className="event-list">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <h2>{event.name}</h2>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Available Tickets:</strong> {event.tickets}</p>
            <p className="event-description">{event.description}</p>
            <button 
              className="book-btn"
              onClick={() => navigate(`/book/${event._id}`)}
            >
              Reserve Your Spot
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;