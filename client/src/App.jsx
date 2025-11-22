import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AllRooms from "./pages/AllRooms";
import Room from "./pages/Room";
import MyBookings from "./pages/MyBookings";

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");

  return (
    
    <div>
      {!isOwnerPath && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<AllRooms />} />
        <Route path="/room/:id" element={<Room />} />
        <Route path="/room/:id" element={<Room />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
