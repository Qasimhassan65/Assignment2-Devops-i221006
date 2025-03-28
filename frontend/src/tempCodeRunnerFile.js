import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Booking from "./pages/Booking";
import "./styles/global.css"; // Import global styles

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:eventId" element={<Booking />} />
      </Routes>
    </div>
  );
}

export default App;
