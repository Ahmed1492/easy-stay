import React from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../../assets/assets";
import Navbar from "../Navbar";

const SideNav = () => {
  const navLinks = [
    {
      title: "Dashboard",
      slug: "/owner",
      icon: assets.dashboardIcon,
    },
    {
      title: "Add Room",
      slug: "/owner/add-room",
      icon: assets.addIcon,
    },
    {
      title: "List Rooms",
      slug: "/owner/list-room",
      icon: assets.listIcon,
    },
  ];

  const currentPath = useLocation().pathname;

  return (
    <div className="min-w-88 border-e-2 border-gray-200 min-h-[90vh] py-4 ">
      <Navbar />
      <ul className="flex flex-col gap-2 mt-20 ">
        {navLinks.map((link, index) => (
          <li
            key={index}
            className={`flex items-center gap-3 duration-300 ${
              currentPath == link.slug ? "bg-blue-100 border-e-6" : ""
            }  cursor-pointer  border-blue-500 px-9 `}
          >
            <img className="w-7" src={link.icon} alt={link.icon} />
            <Link
              to={link.slug}
              className={`${
                currentPath == link.slug ? "text-blue-500" : "text-gray-700"
              } w-full font-medium py-4`}
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideNav;
