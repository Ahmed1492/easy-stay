import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RoomImages from "../components/RoomImages";
import RoomDescription from "../components/RoomDescription";
import { useAppContext } from "../context/AppContext";
import { RoomDetailSkeleton } from "../components/SkeletonLoader";

const Room = () => {
  const { id } = useParams();
  const [room, setRoom] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { rooms } = useAppContext();

  const getRoom = async () => {
    setIsLoading(true);
    let searchedRoom = await rooms.find((room) => room._id === id);
    if (searchedRoom) {
      setRoom(searchedRoom);
      setTimeout(() => setIsLoading(false), 500);
    } else {
      setIsLoading(false);
    }
  };

  const [isAvailable, setIsAvailabe] = useState(false);

  const [bookingData, setBookingData] = useState({
    checkInDate: "",
    checkOutDate: "",
    guests: 1,
  });

  useEffect(() => {
    getRoom();
    window.scrollTo(0, 0);
  }, [id, rooms]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="mt-24 px-4 md:px-16 lg:px-24 xl:px-32 pb-20">
        {isLoading ? (
          <RoomDetailSkeleton />
        ) : !room._id ? (
          <div className="min-h-[70vh] flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Room Not Found</h2>
              <p className="text-gray-600 mb-6">The room you're looking for doesn't exist or has been removed.</p>
              <button
                onClick={() => window.history.back()}
                className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold transition-all"
              >
                Go Back
              </button>
            </div>
          </div>
        ) : (
          <>
            <RoomImages room={room} />
            <RoomDescription
              room={room}
              isAvailable={isAvailable}
              setIsAvailabe={setIsAvailabe}
              bookingData={bookingData}
              setBookingData={setBookingData}
              id={id}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Room;
