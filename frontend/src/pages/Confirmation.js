import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/confirmation.css";

const Confirmation = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id // Assuming userId is stored in localStorage

  useEffect(() => {
    if (!userId) {
      navigate("/login"); // Redirect if not logged in
      return;
    }

    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:3002/bookings/user/" + userId);
        // "http://localhost:3002/bookings/user/" + userId
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [userId, navigate]);

  return (
    <div className="confirmation-page">
      <h1>Booking Confirmations 🎉</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking.id} className="confirmation-booking-card">
            <p><strong>Booking ID:</strong> {booking.id}</p>
            <p><strong>Event:</strong> {booking.event_name}</p>
            <p><strong>Date:</strong> {booking.date}</p>
            <p><strong>Tickets:</strong> {booking.tickets}</p>
            <p className="confirmation-status">{booking.status}</p>
          </div>
        ))
      )}
      <button className="confirmation-back-btn" onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default Confirmation;
