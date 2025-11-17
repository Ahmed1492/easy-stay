import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");
  return (
    <div>
      {!isOwnerPath && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
