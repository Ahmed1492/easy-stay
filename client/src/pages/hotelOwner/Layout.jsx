import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Dashboard from "./Dashboard";
import SideNav from "../../components/hotelOwner/SideNav";
import { useAppContext } from "../../context/AppContext";

const Layout = () => {
  const { isOwner, navigate } = useAppContext();

  // useEffect(() => {
  //   if (!isOwner) return navigate("/");
  // }, [isOwner]);
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
