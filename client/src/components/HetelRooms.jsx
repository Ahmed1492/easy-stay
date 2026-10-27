import { useState } from "react";
import { RotateCcw, SearchX } from "lucide-react";
import HotelRoomCard from "./HotelRoomCard";
import SearchRoomCard from "./SearchRoomCard";
import RoomQuickViewModal from "./RoomQuickViewModal";

const HetelRooms = ({ rooms, viewMode = "list", onClearFilters }) => {
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

  if (rooms.length === 0) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm px-6 py-16 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <SearchX className="w-9 h-9 text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 font-playfair mb-2">
          No rooms match your search
        </h3>
        <p className="text-gray-500 max-w-md mx-auto mb-6">
          Try removing a filter or searching for a different destination.
        </p>
        {onClearFilters && (
          <button
            onClick={onClearFilters}
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-xl font-semibold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6"
            : "space-y-5"
        }
      >
        {rooms.map((room, index) => (
          <div
            key={room._id}
            className="animate-slide-up"
            style={{ animationDelay: `${Math.min(index, 8) * 60}ms`, animationFillMode: "both" }}
          >
            {viewMode === "grid" ? (
              <SearchRoomCard room={room} onQuickView={handleQuickView} />
            ) : (
              <HotelRoomCard room={room} onQuickView={handleQuickView} />
            )}
          </div>
        ))}
      </div>

      <RoomQuickViewModal room={selectedRoom} isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default HetelRooms;
