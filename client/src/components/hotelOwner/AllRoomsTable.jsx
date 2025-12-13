import React, { useState } from "react";

const AllRoomsTable = () => {
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
  const [myBooking, setMyBookings] = useState(bookings);
  return (
    <div className="mt-9 border border-gray-100 rounded-lg w-[58%] max-h-62 overflow-y-scroll">
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
            <tr key={index} className="border-b border-gray-200">
              <td className="py-4 px-3">{item.user}</td>
              <td className="px-3 text-left">{item.room}</td>
              <td className="px-3 text-center">${item.amount}</td>
              <td className="px-3 text-center duration-500 transition-all">
                <div
                  onClick={() =>
                    setMyBookings(
                      myBooking.map((b, i) =>
                        i === index ? { ...b, action: !b.action } : b
                      )
                    )
                  }
                  className={`w-13 h-7 rounded-full relative cursor-pointer transition-colors duration-500 ${
                    item.action ? "bg-blue-500" : "bg-gray-400"
                  }`}
                >
                  <span
                    className={`w-5 h-5 absolute top-1 left-1 rounded-full bg-white
      transition-transform duration-500
      ${item.action ? "translate-x-6" : "translate-x-0"}
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
