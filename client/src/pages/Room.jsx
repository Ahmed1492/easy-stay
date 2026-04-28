import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RoomImages from "../components/RoomImages";
import RoomDescription from "../components/RoomDescription";
import { useAppContext } from "../context/AppContext";
import { RoomDetailSkeleton } from "../components/SkeletonLoader";

const Room = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { rooms } = useAppContext();

  const [room, setRoom] = useState(null);
  const [isAvailable, setIsAvailabe] = useState(false);
  const [bookingData, setBookingData] = useState({ checkInDate: "", checkOutDate: "", guests: 1 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    // rooms not loaded yet — keep showing skeleton
    if (rooms.length === 0) return;
    const found = rooms.find((r) => r._id === id);
    setRoom(found || false); // false = not found, null = still loading
  }, [id, rooms]);

  // rooms still loading (empty array) OR room not resolved yet
  if (rooms.length === 0 || room === null) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 px-6 md:px-16 lg:px-24 xl:px-32 pb-20">
        <RoomDetailSkeleton />
      </div>
    );
  }

  // rooms loaded but this ID doesn't exist
  if (room === false) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Room Not Found</h2>
          <p className="text-gray-500 text-sm mb-6">This room doesn't exist or has been removed.</p>
          <button onClick={() => navigate(-1)} className="bg-gray-900 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-700 transition-colors">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-24 pb-20 px-6 md:px-16 lg:px-24 xl:px-32">
        <RoomImages room={room} />
        <RoomDescription
          room={room}
          isAvailable={isAvailable}
          setIsAvailabe={setIsAvailabe}
          bookingData={bookingData}
          setBookingData={setBookingData}
          id={id}
        />
      </div>
    </div>
  );
};

export default Room;
