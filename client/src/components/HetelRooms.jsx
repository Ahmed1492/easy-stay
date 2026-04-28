import React, { useState } from "react";
import HotelRoomCard from "./HotelRoomCard";
import SearchRoomCard from "./SearchRoomCard";
import RoomQuickViewModal from "./RoomQuickViewModal";

const HetelRooms = ({ rooms }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState("list"); // list or grid

  const handleQuickView = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedRoom(null), 300);
  };

  return (
    <div className="order-2 lg:order-0">
      {/* Header */}
      <div className="mt-20 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="inline-block px-4 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
            {rooms.length} Properties Found
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded transition-all ${
                viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-gray-200"
              }`}
              title="Grid View"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded transition-all ${
                viewMode === "list" ? "bg-white shadow-sm" : "hover:bg-gray-200"
              }`}
              title="List View"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        
        <h2 className="font-playfair font-bold text-4xl md:text-5xl text-gray-800 mb-4">
          Hotel Rooms
        </h2>
        <p className="max-w-2xl text-gray-600 text-lg leading-relaxed">
          Discover luxurious accommodations tailored to your preferences. Each room offers comfort, style, and exceptional amenities.
        </p>
      </div>

      {/* Rooms List/Grid */}
      {rooms.length !== 0 ? (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              : "space-y-6"
          }
        >
          {rooms.map((room, index) => (
            <div
              key={room._id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {viewMode === "grid" ? (
                <SearchRoomCard room={room} onQuickView={handleQuickView} />
              ) : (
                <HotelRoomCard room={room} onQuickView={handleQuickView} />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-10 bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            No rooms match your search
          </h3>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            Try adjusting your filters or changing the date range to see more available rooms.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Quick View Modal */}
      <RoomQuickViewModal
        room={selectedRoom}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default HetelRooms;
