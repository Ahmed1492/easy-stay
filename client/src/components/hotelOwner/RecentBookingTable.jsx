import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const ReventBookingTable = ({ dashboardData }) => {
  const bookings = [
    {
      user: "Great Stock",
      room: "Double Bed",
      amount: 299,
      status: "Completed",
    },
    {
      user: "Great Stock",
      room: "Double Bed",
      amount: 399,
      status: "Pending",
    },
    {
      user: "Great Stock",
      room: "Single Bed",
      amount: 199,
      status: "Pending",
    },
    {
      user: "Great Stock",
      room: "Single Bed",
      amount: 199,
      status: "Pending",
    },
    {
      user: "Great Stock",
      room: "Single Bed",
      amount: 199,
      status: "Pending",
    },
  ];
  console.log(dashboardData);

  return (
    <div className="mt-9 border border-gray-100 rounded-lg w-[97%] lg:w-[87%] xl:w-[60%] max-h-52 overflow-y-scroll">
      <table className="w-full border border-gray-200 text-sm border-collapse">
        <thead>
          <tr className="border-b border-gray-200 text-gray-600 bg-slate-100">
            <th className="text-left px-3 py-3">User Name</th>
            <th className="text-left px-3 py-3">Room Name</th>
            <th className="px-3 py-3 text-center">Total Amount</th>
            <th className="px-3 py-3">Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {dashboardData?.bookings?.map((item, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="py-4 px-3">{item?.user.username || ""}</td>
              <td>{item.room.roomType}</td>
              <td className="px-3 text-center">${item.totalPrice}</td>
              <td className="px-3 text-center">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReventBookingTable;
