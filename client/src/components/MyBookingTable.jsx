import React from "react";
import { assets, userBookingsDummyData } from "../assets/assets";

const MyBookingTable = () => {
  console.log(userBookingsDummyData[0]);
  function formatDate(dateString) {
    const date = new Date(dateString); // convert string to Date object

    // Array of month names
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const monthName = months[date.getMonth()]; // getMonth() returns 0-11
    const day = date.getDate(); // day of month
    const year = date.getFullYear(); // year

    return `${monthName} ${day}, ${year}`;
  }

  // Example usage
  const formatted = formatDate("2025-04-30T00:00:00.000Z");
  console.log(formatted); // Output: April 30, 2025

  return (
    <div className="mt-12">
      <div className="overflow-x-auto">
        <table className="w-full table-fixed border-collapse min-w-[600px] md:min-w-full">
          <thead>
            <tr>
              <th className="w-2/5 text-left border-b-2 py-3 border-gray-200/80 text-gray-700">
                Hotels
              </th>
              <th className="w-1/5 text-left border-b-2 py-3 text-gray-700 border-gray-200/80">
                Date & Timing
              </th>
              <th className="w-1/5 text-right border-b-2 py-3 text-gray-700 border-gray-200/80">
                Payment
              </th>
            </tr>
          </thead>
          <tbody>
            {userBookingsDummyData.map((booking, index) => (
              <tr key={index}>
                {/* Hotels Column */}
                <td className="border-b-2 border-gray-200/80 py-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <img
                      className="w-full md:w-[13rem] rounded-lg object-cover"
                      src={booking.room.images[0]}
                      alt="room"
                    />
                    <div className="flex flex-col justify-between">
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-1">
                        <h3 className="text-xl md:text-2xl font-playfair">
                          {booking.room.hotel.name}
                        </h3>
                        <span className="font-medium text-sm md:self-end">
                          ({booking.room.roomType})
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                        <img
                          className="w-4"
                          src={assets.locationIcon}
                          alt="location"
                        />
                        <p>{booking.hotel?.address}</p>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                        <img
                          className="w-4"
                          src={assets.guestsIcon}
                          alt="guests"
                        />
                        <p>Guests: {booking.guests}</p>
                      </div>
                      <div className="text-gray-800 font-semibold">
                        Total: ${booking.totalPrice}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Date & Timing Column */}
                <td className="border-b-2 border-gray-200/80 text-center py-4">
                  <div className="flex flex-col md:flex-row justify-between gap-2 items-center">
                    <div className="flex flex-col">
                      <p className="font-semibold text-gray-700">Check-in</p>
                      <p className="text-gray-500 text-sm">
                        {formatDate(booking.checkInDate)}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p className="font-semibold text-gray-700">Check-out</p>
                      <p className="text-gray-500 text-sm">
                        {formatDate(booking.checkOutDate)}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Payment Column */}
                <td className="border-b-2 border-gray-200/80 text-left py-4">
                  <div className={`flex items-center justify-end gap-2.5`}>
                    <div className="flex flex-col gap-2.5 items-center">
                      <div className="flex items-center gap-2.5 px-5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            booking.isPaid ? "bg-green-600 " : "bg-red-600"
                          }`}
                        ></span>
                        <p
                          className={`${
                            booking.isPaid ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {booking.isPaid ? "Paid" : "Unpaid"}
                        </p>
                      </div>
                      {!booking.isPaid && (
                        <button className="border border-gray-800/80 px-5 py-1.5 rounded-full text-sm cursor-pointer ">
                          Pay now
                        </button>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookingTable;
