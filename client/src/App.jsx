import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AllRooms from "./pages/AllRooms";
import Room from "./pages/Room";

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");

  return (
    <>
      <div className="min-h-screen">
        {!isOwnerPath && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/room/:id" element={<Room />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
