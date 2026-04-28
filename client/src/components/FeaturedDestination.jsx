import React, { useState } from "react";
import HotelCard from "./HotelCard";
import RoomQuickViewModal from "./RoomQuickViewModal";
import { useAppContext } from "../context/AppContext";

const FeaturedDestination = () => {
  const { navigate, rooms } = useAppContext();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleQuickView = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedRoom(null), 300);
  };

  return (
    rooms.length > 0 && (
      <div className="animate-fade-in">
        {/* Hotels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-14">
          {rooms.slice(0, 4).map((room, index) => (
            <div
              key={room._id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <HotelCard room={room} index={index} onQuickView={handleQuickView} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex items-center justify-center mt-16">
          <button
            onClick={() => {
              navigate("/rooms");
              scroll(0, 0);
            }}
            className="group relative px-8 py-4   rounded-lg font-semibold text-sm bg-transparent cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-200  overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              View All Destinations
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>
        </div>

        {/* Quick View Modal */}
        <RoomQuickViewModal
          room={selectedRoom}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </div>
    )
  );
};

export default FeaturedDestination;
