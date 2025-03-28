import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Booking from "./pages/Booking";
import Confirmation from "./pages/Confirmation";
import CreateEvent from "./pages/CreateEvent";
import Login from "./pages/Login";
import Register from "./pages/Register"; 
import "./styles/global.css";

// ✅ Corrected authentication check
const isAuthenticated = "false"

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/register"; // Hide Navbar on Login & Register

  return (
    <div>
      {!hideNavbar && <Navbar />} 
      <Routes>
      
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/book/:eventId" element={<ProtectedRoute element={<Booking />} />} />
        <Route path="/confirmation" element={<ProtectedRoute element={<Confirmation />} />} />
        <Route path="/create-event" element={<ProtectedRoute element={<CreateEvent />} />} />
    
      </Routes>
    </div>
  );
}

export default App;
