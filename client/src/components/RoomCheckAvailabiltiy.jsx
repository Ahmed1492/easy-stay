import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const RoomCheckAvailabiltiy = ({
  bookingData,
  setBookingData,
  isAvailable,
  setIsAvailabe,
  id,
}) => {
  const { backEndUrl, getToken, navigate } = useAppContext();

  const handleCheckAvailability = async () => {
    try {
      let myResponse = await axios.post(
        `${backEndUrl}/api/booking/check-availability`,
        {
          checkInDate: new Date(bookingData.checkInDate),
          checkOutDate: new Date(bookingData.checkOutDate),
          room: id,
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );
      console.log(myResponse.data);

      if (myResponse.data.success) {
        if (myResponse.data.isAvailable) {
          toast.success("Room Is Availabe");
          setIsAvailabe(true);
          return;
        } else {
          toast.error("Room Is  Already Booked ");
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleBooking = async () => {
    try {
      let myResponse = await axios.post(
        `${backEndUrl}/api/booking/create`,
        {
          checkInDate: new Date(bookingData.checkInDate),
          checkOutDate: new Date(bookingData.checkOutDate),
          room: id,
          guests: bookingData.guests,
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );
      console.log(myResponse.data);
      if (myResponse.data.success) {
        toast.success(myResponse.data.message || "Room Booked Successfulye");
        navigate("/my-bookings");
        setIsAvailabe(false);
      } else {
        return toast.error(myResponse.data.message || "Room Not Availbale");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAvailable) return await handleCheckAvailability();

      return await handleBooking();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white cutom-shadow  justify-between  gap-9 text-gray-500 rounded-lg px-6 py-4  flex  w-full xl:w-[80%] flex-wrap max-md:items-start  max-md:mx-auto"
    >
      <div>
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
            />
          </svg>
          <label htmlFor="checkIn">Check in</label>
        </div>
        <input
          id="checkIn"
          type="date"
          value={bookingData.checkInDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) =>
            setBookingData((prev) => ({
              ...prev,
              checkInDate: e.target.value,
            }))
          }
          className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
        />
      </div>

      <div>
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
            />
          </svg>
          <label htmlFor="checkOut">Check out</label>
        </div>
        <input
          id="checkOut"
          type="date"
          className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
          value={bookingData.checkOutDate}
          min={bookingData.checkInDate}
          disabled={!bookingData.checkInDate}
          onChange={(e) =>
            setBookingData((prev) => ({
              ...prev,
              checkOutDate: e.target.value,
            }))
          }
        />
      </div>

      <div className="flex md:flex-col max-md:gap-2 max-md:items-center">
        <label htmlFor="guests">Guests</label>
        <input
          min={1}
          max={4}
          id="guests"
          type="number"
          className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16"
          placeholder="0"
          value={bookingData.guests}
          onChange={(e) =>
            setBookingData((prev) => ({
              ...prev,
              guests: e.target.value,
            }))
          }
        />
      </div>

      <button className="flex items-center justify-center gap-1 rounded-md bg-blue-600 py-3 px-20 text-white my-auto  max-md:w-full max-md:py-1 cursor-pointer">
        <span>{isAvailable ? "Book Now" : "Check Availabiltiy"}</span>
      </button>
    </form>
  );
};

export default RoomCheckAvailabiltiy;
