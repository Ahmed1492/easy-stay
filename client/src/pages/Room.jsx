import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Hotel } from "lucide-react";
import RoomImages from "../components/RoomImages";
import RoomDescription from "../components/RoomDescription";
import SearchRoomCard from "../components/SearchRoomCard";
import RoomQuickViewModal from "../components/RoomQuickViewModal";
import { useAppContext } from "../context/AppContext";
import { RoomDetailSkeleton } from "../components/SkeletonLoader";

const RoomContent = ({ room, id, similarRooms, currency }) => {
  const navigate = useNavigate();
  const [isAvailable, setIsAvailabe] = useState(false);
  const [bookingData, setBookingData] = useState({ checkInDate: "", checkOutDate: "", guests: 1 });
  const [quickViewRoom, setQuickViewRoom] = useState(null);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-24 md:pt-28 pb-32 lg:pb-24">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 -ml-2 mb-4 px-2 py-1.5 rounded-lg text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <RoomImages key={room._id} room={room} />
        <RoomDescription
          room={room}
          isAvailable={isAvailable}
          setIsAvailabe={setIsAvailabe}
          bookingData={bookingData}
          setBookingData={setBookingData}
          id={id}
        />

        {/* Similar rooms */}
        {similarRooms.length > 0 && (
          <section className="mt-12 pt-12 border-t border-gray-200">
            <div className="flex items-end justify-between gap-4 mb-6">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900">More places to stay</h2>
              <Link
                to="/rooms"
                className="text-sm font-semibold text-gray-900 underline underline-offset-4 hover:text-gray-600"
              >
                Show all
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarRooms.map((r) => (
                <SearchRoomCard key={r._id} room={r} onQuickView={setQuickViewRoom} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Mobile sticky reserve bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 flex items-center justify-between gap-4 px-6 py-4 bg-white border-t border-gray-200">
        <div>
          <p className="text-gray-900">
            <span className="font-semibold">
              {currency}
              {Number(room.pricePerNight).toLocaleString()}
            </span>{" "}
            <span className="text-sm">night</span>
          </p>
          <p className="text-xs text-gray-500 underline underline-offset-2">
            {bookingData.checkInDate && bookingData.checkOutDate ? "Dates selected" : "Add your dates"}
          </p>
        </div>
        <button
          onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
          className="px-8 py-3 rounded-lg text-white text-sm font-semibold bg-gradient-to-r from-rose-500 to-pink-600 cursor-pointer"
        >
          Reserve
        </button>
      </div>

      <RoomQuickViewModal
        room={quickViewRoom}
        isOpen={!!quickViewRoom}
        onClose={() => setQuickViewRoom(null)}
      />
    </div>
  );
};

const Room = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { rooms, roomsLoading, currency } = useAppContext();

  const room = useMemo(() => rooms.find((r) => r._id === id), [rooms, id]);

  // Other rooms to suggest: same city first, then anything else
  const similarRooms = useMemo(() => {
    if (!room) return [];
    const others = rooms.filter((r) => r._id !== room._id);
    const sameCity = others.filter((r) => r.hotel?.city === room.hotel?.city);
    const rest = others.filter((r) => r.hotel?.city !== room.hotel?.city);
    return [...sameCity, ...rest].slice(0, 3);
  }, [rooms, room]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (roomsLoading) {
    return (
      <div className="min-h-screen bg-white max-w-6xl mx-auto px-6 md:px-10 pt-28 pb-20">
        <RoomDetailSkeleton />
      </div>
    );
  }

  // Rooms loaded but this ID doesn't exist
  if (!room) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <Hotel className="w-12 h-12 mx-auto mb-4 text-gray-300" strokeWidth={1.5} />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">This room isn't available</h2>
          <p className="text-gray-500 mb-6">It may have been removed, or the link is incorrect.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="px-5 py-2.5 rounded-lg border border-gray-900 text-sm font-semibold text-gray-900 hover:bg-gray-50 cursor-pointer"
            >
              Go back
            </button>
            <Link
              to="/rooms"
              className="px-5 py-2.5 rounded-lg bg-gray-900 hover:bg-black text-white text-sm font-semibold"
            >
              Browse hotels
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <RoomContent key={room._id} room={room} id={id} similarRooms={similarRooms} currency={currency} />;
};

export default Room;
