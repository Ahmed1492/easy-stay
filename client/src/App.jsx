import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AllRooms from "./pages/AllRooms";
import Room from "./pages/Room";
import MyBookings from "./pages/MyBookings";
import HotelReg from "./components/HotelReg";

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");
  const [isHotelRegMode, setIsHotelRegMode] = useState(false);
  return (
    <div>
      {!isOwnerPath && <Navbar />}
      {isHotelRegMode && <HotelReg />}
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
