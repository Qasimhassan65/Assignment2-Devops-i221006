// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import "../styles/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  // Simulate logout action (replace with real logic when backend is added)
  const handleLogout = () => {
    // Placeholder for logout logic (e.g., clearing token or state)
    console.log("User logged out");
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">Event Booking</h1>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/create-event">Create Event</Link></li>
          <li><Link to="/confirmation">My Bookings</Link></li>
          <li>
            <button className="navbar-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;