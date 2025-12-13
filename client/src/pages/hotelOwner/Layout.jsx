import React from "react";
import { Outlet } from "react-router-dom";
import Dashboard from "./Dashboard";
import SideNav from "../../components/hotelOwner/SideNav";

const Layout = () => {
  return (
    <div className="">
      <div className="flex gap-4.5">
        <SideNav />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
