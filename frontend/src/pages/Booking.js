import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/booking.css";

const Booking = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [tickets, setTickets] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:5002/api/events/${eventId}`);
        if (!response.ok) {
          throw new Error("Event not found");
        }
        const data = await response.json();
        setEvent(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchEvent();
  }, [eventId]);

  const handleBooking = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user")); // Get user info from localStorage
      if (!user || !user.id || !user.email) {
        throw new Error("User not logged in. Please login first.");
      }
  
      console.log(eventId, tickets, user.id, user.email);
      
      const response = await fetch("http://localhost:3002/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          eventId, 
          tickets, 
          userId: user.id, 
          email: user.email 
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to book tickets");
      }
  
      alert(`Booking confirmed for ${tickets} tickets to ${event.name}!`);
      navigate("/confirmation");
    } catch (err) {
      setError(err.message);
    }
  };
  

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!event) {
    return <h2>Loading event details...</h2>;
  }

  return (
    <div className="booking-page">
      <h1>Book Tickets for {event.name}</h1>
      <p className="booking-date">Date: {event.date}</p>
      <p className="booking-tickets">Available Tickets: {event.availableTickets}</p>

      <label className="booking-label">Number of Tickets:</label>
      <input
        type="number"
        min="1"
        max={event.tickets}
        value={tickets}
        onChange={(e) => setTickets(parseInt(e.target.value))}
        className="booking-ticket-input"
      />

      <button className="booking-confirm-btn" onClick={handleBooking}>
        Confirm Booking
      </button>
    </div>
  );
};

export default Booking;
