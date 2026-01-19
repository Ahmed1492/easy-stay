import React, { useState } from "react";
import { roomsDummyData } from "../../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";
import { useAppContext } from "../../context/AppContext";

const AllRoomsTable = ({ myBooking, setMyBookings, fetchHotelRooms }) => {
  const bookings = [
    {
      user: "Great Stock",
      room: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit.",
      amount: 299,
      action: true,
    },
    {
      user: "Great Stock",
      room: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit.",
      amount: 399,
      action: false,
    },
    {
      user: "Great Stock",
      room: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit.",
      amount: 199,
      action: true,
    },
    {
      user: "Great Stock",
      room: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit.",
      amount: 199,
      action: false,
    },
    {
      user: "Great Stock",
      room: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit.",
      amount: 199,
      action: true,
    },
  ];
  // console.log(roomsDummyData);
  const { navigate, backEndUrl, getToken, user } = useAppContext();

  const toggleAvailability = async (id) => {
    //  Update UI immediately
    setMyBookings((prev) =>
      prev.map((room) =>
        room._id === id ? { ...room, isAvailable: !room.isAvailable } : room,
      ),
    );

    try {
      const { data } = await axios.post(
        `${backEndUrl}/api/rooms/toggle-availability`,
        { roomId: id },
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      );

      if (!data.success) {
        throw new Error(data.message);
      }

      toast.success(data.message);
    } catch (error) {
      //  Rollback if API fails
      setMyBookings((prev) =>
        prev.map((room) =>
          room._id === id ? { ...room, isAvailable: !room.isAvailable } : room,
        ),
      );

      toast.error(error.message);
    }
  };

  return (
    <div className="mt-9 border border-gray-100 rounded-lg w-[97%] lg:w-[87%] xl:w-[60%] max-h-62 overflow-y-scroll">
      <table className="w-full border border-gray-200 text-sm border-collapse">
        <thead className="bg-slate-100 text-gray-600 sticky z-50 top-0">
          <tr className="border-b border-gray-200">
            <th className="text-left px-3 py-3">Name</th>
            <th className="px-3 py-3 text-left">Facility</th>
            <th className="px-3 py-3">Price/night</th>
            <th className="px-3 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {myBooking.map((item, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 text-sm lg:text-base"
            >
              <td className="py-4 px-3 text-sm lg:text-base ">
                {item.roomType}
              </td>
              <td className="px-3 text-left text-sm lg:text-base">
                {item.amenities.map((aminity, index) => (
                  <span className="me-2" key={index}>
                    {aminity}
                  </span>
                ))}
              </td>
              <td className="px-3 text-center text-sm lg:text-base">
                ${item.pricePerNight}
              </td>
              <td className="px-3 text-center duration-500 transition-all text-sm lg:text-base">
                <div
                  onClick={() => toggleAvailability(item._id)}
                  className={`w-13 h-7 rounded-full relative cursor-pointer transition-colors duration-500 ${
                    item.isAvailable ? "bg-blue-500" : "bg-gray-400"
                  }`}
                >
                  <span
                    className={`w-5 h-5 absolute top-1 left-1 rounded-full bg-white
      transition-transform duration-500
      ${item.isAvailable ? "translate-x-6" : "translate-x-0"}
    `}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllRoomsTable;
