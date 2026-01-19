import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import RecentBookingTable from "../../components/hotelOwner/RecentBookingTable";
import AllRoomsTable from "../../components/hotelOwner/AllRoomsTable";
import { useAppContext } from "../../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const ListRoom = () => {
  const { backEndUrl, getToken, user } = useAppContext();
  const [myBooking, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHotelRooms = async () => {
    try {
      const myResponse = await axios.get(
        `${backEndUrl}/api/rooms/owner-rooms`,
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      );
      setMyBookings(myResponse.data.rooms);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchHotelRooms();
  }, [user]);

  return (
    <div className="p-4 mt-20 w-full">
      <div className="mt-9">
        <h3 className="text-3xl font-medium">Room Listings</h3>
        <p className="text-gray-500/80 max-w-2xl mt-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>

      <h3 className="text-2xl mt-9 text-gray-700">All Rooms</h3>
      <div className="w-full">
        {loading ? (
          <div>Loading....</div>
        ) : (
          <AllRoomsTable
            myBooking={myBooking}
            setMyBookings={setMyBookings}
            fetchHotelRooms={fetchHotelRooms}
          />
        )}
      </div>
    </div>
  );
};

export default ListRoom;
