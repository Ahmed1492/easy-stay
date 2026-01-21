import React from "react";
import { assets, userBookingsDummyData } from "../assets/assets";

const MyBookingTable = ({ bookingData, handlePayment }) => {
  // console.log(userBookingsDummyData[0]);
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

    const monthName = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${monthName} ${day}, ${year}`;
  }

  // Example usage
  const formatted = formatDate("2025-04-30T00:00:00.000Z");
  // console.log(formatted);

  return (
    <div className="mt-12">
      <div className="overflow-x-auto">
        <div className="w-full flex flex-col gap-6">
          {bookingData?.map((booking, index) => (
            <div
              key={index}
              className="border border-gray-200/80 rounded-xl p-4 md:p-6 flex flex-col gap-6"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <img
                  className="w-full md:w-[13rem] h-[160px] rounded-lg object-cover"
                  src={booking.room.images[0]}
                  alt="room"
                />

                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl md:text-2xl font-playfair">
                        {booking.room.hotel.name}
                      </h3>
                      <span className="text-sm font-medium text-gray-600">
                        ({booking.room.roomType})
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                      <img
                        className="w-4"
                        src={assets.locationIcon}
                        alt="location"
                      />
                      <p>{booking.hotel?.address}</p>
                    </div>

                    <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                      <img
                        className="w-4"
                        src={assets.guestsIcon}
                        alt="guests"
                      />
                      <p>Guests: {booking.guests}</p>
                    </div>
                  </div>

                  <p className="text-gray-800 font-semibold mt-2">
                    Total: ${booking.totalPrice}
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between gap-4 bg-gray-50 rounded-lg p-4">
                <div>
                  <p className="font-semibold text-gray-700">Check-in</p>
                  <p className="text-gray-500 text-sm">
                    {formatDate(booking.checkInDate)}
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-gray-700">Check-out</p>
                  <p className="text-gray-500 text-sm">
                    {formatDate(booking.checkOutDate)}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      booking.isPaid ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></span>
                  <p
                    className={`font-semibold ${
                      booking.isPaid ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {booking.isPaid ? "Paid" : "Unpaid"}
                  </p>
                </div>

                {!booking.isPaid && (
                  <button
                    onClick={() => handlePayment(booking._id)}
                    className="border border-gray-800/80 px-5 py-1.5 rounded-full text-sm hover:bg-gray-100 transition cursor-pointer"
                  >
                    Pay now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBookingTable;
