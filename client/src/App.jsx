import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import AllRooms from "./pages/AllRooms";
import Room from "./pages/Room";
import MyBookings from "./pages/MyBookings";
import Experience from "./pages/Experience";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import HotelReg from "./components/HotelReg";
import Layout from "./pages/hotelOwner/Layout";
import AddRoom from "./pages/hotelOwner/AddRoom";
import ListRoom from "./pages/hotelOwner/ListRoom";
import Dashboard from "./pages/hotelOwner/Dashboard";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";
import Loader from "./components/Loader";
const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");
  const { showHotelReg } = useAppContext();

  return (
    <div>
      <ScrollToTop />
      <Toaster />
      {!isOwnerPath && <Navbar />}
      {showHotelReg && <HotelReg />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/rooms" element={<AllRooms />} />
        <Route path="/room/:id" element={<Room />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/loader/:nextUrl" element={<Loader />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-room" element={<AddRoom />} />
          <Route path="list-room" element={<ListRoom />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
