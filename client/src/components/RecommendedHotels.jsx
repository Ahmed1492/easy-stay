import React, { useEffect, useState } from "react";
import HotelCard from "./HotelCard";
import RoomQuickViewModal from "./RoomQuickViewModal";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";

const RecommendedHotels = () => {
  const [recommended, setrecommended] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { navigate, backEndUrl, rooms, searchCities, getToken } =
    useAppContext();

  const filterRooms = (rooms, arr) => {
    return rooms.filter((room) => arr.includes(room.hotel.city)).slice(0, 4);
  };

  const handleQuickView = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedRoom(null), 300);
  };

  const getRecentSearchCities = async () => {
    try {
      const myResponse = await axios.get(
        `${backEndUrl}/api/user/recent-search`,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            "ngrok-skip-browser-warning": "true",
          },
        },
      );
      setrecommended(myResponse?.data?.recentSearchedCities || []);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!rooms?.length || !recommended?.length) return;
    filterRooms(rooms, recommended);
  }, [rooms, recommended]);

  useEffect(() => {
    getRecentSearchCities();
  }, [searchCities]);

  if (filterRooms(rooms, recommended).length === 0) return null;

  return (
    <div className="mt-28 animate-fade-in">
      {/* Section Header */}
      <div className="flex flex-col items-center justify-center text-center gap-4 mb-12">
        <div className="inline-block px-4 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
          Based on Your Searches
        </div>
        <h2 className="text-4xl md:text-5xl font-bold font-playfair bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Recommended Hotels
        </h2>
        <p className="max-w-2xl text-gray-600 text-lg">
          Handpicked accommodations tailored to your preferences and recent searches
        </p>
      </div>

      {/* Hotels Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filterRooms(rooms, recommended).map((room, index) => (
          <div
            key={room._id}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <HotelCard room={room} index={index} onQuickView={handleQuickView} />
          </div>
        ))}
      </div>

      {/* Quick View Modal */}
      <RoomQuickViewModal
        room={selectedRoom}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default RecommendedHotels;
