import axios from "axios";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const RoomCheckAvailabiltiy = ({ bookingData, setBookingData, isAvailable, setIsAvailabe, id, pricePerNight }) => {
  const { backEndUrl, getToken, navigate, user } = useAppContext();

  const nights =
    bookingData.checkInDate && bookingData.checkOutDate
      ? Math.max(
          1,
          Math.round(
            (new Date(bookingData.checkOutDate) - new Date(bookingData.checkInDate)) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 0;

  const total = nights > 0 && pricePerNight ? nights * pricePerNight : null;

  const handleCheckAvailability = async () => {
    if (!bookingData.checkInDate || !bookingData.checkOutDate || bookingData.guests < 1) {
      return toast.error("Please fill in all fields");
    }
    try {
      const res = await axios.post(
        `${backEndUrl}/api/booking/check-availability`,
        {
          checkInDate: new Date(bookingData.checkInDate).toISOString().split("T")[0],
          checkOutDate: bookingData.checkOutDate,
          room: id,
        },
        { headers: { "ngrok-skip-browser-warning": "true", Authorization: `Bearer ${await getToken()}` } }
      );
      if (res.data.success) {
        if (res.data.isAvailable) {
          toast.success("Room is available!");
          setIsAvailabe(true);
        } else {
          toast.error("Room is already booked for these dates");
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleBooking = async () => {
    try {
      const res = await axios.post(
        `${backEndUrl}/api/booking/create`,
        {
          checkInDate: bookingData.checkInDate,
          checkOutDate: bookingData.checkOutDate,
          room: id,
          guests: bookingData.guests,
          paymentMethod: "Pay At Hotel",
          isPaid: false,
        },
        { headers: { "ngrok-skip-browser-warning": "true", Authorization: `Bearer ${await getToken()}` } }
      );
      if (res.data.success) {
        toast.success("Room booked successfully!");
        navigate("/my-bookings");
        setIsAvailabe(false);
      } else {
        toast.error(res.data.message || "Booking failed");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Please log in first");
    if (!isAvailable) return handleCheckAvailability();
    return handleBooking();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">

      {/* Price header */}
      <div className="px-6 pt-6 pb-4 border-b border-gray-100">
        <div className="flex items-end gap-1.5">
          <span className="text-3xl font-bold text-gray-900">${pricePerNight}</span>
          <span className="text-gray-400 text-sm mb-1">/night</span>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-xs font-semibold text-gray-700">4.5</span>
          <span className="text-xs text-gray-400">· 200+ reviews</span>
        </div>
      </div>

      {/* Date + guests inputs */}
      <div className="px-6 py-4 space-y-3">
        {/* Dates row */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
              Check-in
            </label>
            <input
              type="date"
              value={bookingData.checkInDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => {
                setBookingData((p) => ({ ...p, checkInDate: e.target.value }));
                setIsAvailabe(false);
              }}
              className="w-full text-sm font-medium text-gray-900 border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-gray-900 transition-colors"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
              Check-out
            </label>
            <input
              type="date"
              value={bookingData.checkOutDate}
              min={bookingData.checkInDate || new Date().toISOString().split("T")[0]}
              disabled={!bookingData.checkInDate}
              onChange={(e) => {
                setBookingData((p) => ({ ...p, checkOutDate: e.target.value }));
                setIsAvailabe(false);
              }}
              className="w-full text-sm font-medium text-gray-900 border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-gray-900 transition-colors disabled:bg-gray-50 disabled:text-gray-300"
            />
          </div>
        </div>

        {/* Guests */}
        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
            Guests
          </label>
          <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => setBookingData((p) => ({ ...p, guests: Math.max(1, p.guests - 1) }))}
              className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors flex-shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <span className="flex-1 text-center text-sm font-semibold text-gray-900">
              {bookingData.guests} {bookingData.guests === 1 ? "Guest" : "Guests"}
            </span>
            <button
              type="button"
              onClick={() => setBookingData((p) => ({ ...p, guests: Math.min(6, p.guests + 1) }))}
              className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors flex-shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Availability banner */}
      {isAvailable && (
        <div className="mx-6 mb-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center gap-2">
          <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <p className="text-xs font-semibold text-green-800">Room is available — confirm your booking!</p>
        </div>
      )}

      {/* CTA button */}
      <div className="px-6 pb-5">
        <button
          type="submit"
          className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
            isAvailable
              ? "bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-200"
              : "bg-gray-900 hover:bg-gray-700 text-white"
          }`}
        >
          {isAvailable ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Confirm Booking
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Check Availability
            </>
          )}
        </button>
        <p className="text-center text-xs text-gray-400 mt-2">You won't be charged yet</p>
      </div>

      {/* Price breakdown */}
      {total && (
        <div className="px-6 pb-6 border-t border-gray-100 pt-4 space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>${pricePerNight} × {nights} night{nights > 1 ? "s" : ""}</span>
            <span>${pricePerNight * nights}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Service fee</span>
            <span>$0</span>
          </div>
          <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-100">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>
      )}

    </form>
  );
};

export default RoomCheckAvailabiltiy;
