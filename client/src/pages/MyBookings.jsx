import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

// ── tiny SVG icon set ──────────────────────────────────────────────────────
const Icon = {
  calendar: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  guests: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  payment: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  ),
  location: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  arrow: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  ),
  download: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  ),
  check: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  ),
  empty: (
    <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  ),
};

// ── status config ──────────────────────────────────────────────────────────
const statusCfg = {
  confirmed: { dot: "bg-green-500",  text: "text-green-700",  bg: "bg-green-50",  border: "border-green-200",  label: "Confirmed"  },
  pending:   { dot: "bg-amber-500",  text: "text-amber-700",  bg: "bg-amber-50",  border: "border-amber-200",  label: "Pending"    },
  cancelled: { dot: "bg-red-400",    text: "text-red-600",    bg: "bg-red-50",    border: "border-red-200",    label: "Cancelled"  },
};

const fmt = (d) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const nights = (a, b) => Math.max(1, Math.round((new Date(b) - new Date(a)) / 86400000));

// ── component ──────────────────────────────────────────────────────────────
const MyBookings = () => {
  const { navigate, backEndUrl, getToken, user, currency } = useAppContext();
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const getUserBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${backEndUrl}/api/booking/user-bookings`, {
        headers: { "ngrok-skip-browser-warning": "true", Authorization: `Bearer ${await getToken()}` },
      });
      if (res.data.success) setBookingData(res.data.bookings);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (id) => {
    try {
      const res = await axios.post(
        `${backEndUrl}/api/booking/stripe-payment`,
        { bookingId: id },
        { headers: { Authorization: `Bearer ${await getToken()}`, "ngrok-skip-browser-warning": "true" } }
      );
      if (res.data.success) window.location.href = res.data.url;
      else toast.error(res.data.message);
    } catch (e) {
      toast.error(e.message);
    }
  };

  useEffect(() => { if (user) getUserBookings(); }, [user]);

  const tabs = [
    { id: "all",       label: "All" },
    { id: "upcoming",  label: "Upcoming" },
    { id: "completed", label: "Completed" },
    { id: "cancelled", label: "Cancelled" },
  ];

  const filtered = bookingData.filter((b) => {
    if (filter === "all")       return true;
    if (filter === "upcoming")  return b.status === "confirmed" && new Date(b.checkInDate) > new Date();
    if (filter === "completed") return b.status === "confirmed" && new Date(b.checkOutDate) < new Date();
    if (filter === "cancelled") return b.status === "cancelled";
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero ── */}
      <div className="bg-gray-900 pt-28 pb-14 px-6 md:px-16 lg:px-24 xl:px-32">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">My Account</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white font-playfair mb-2">My Bookings</h1>
          <p className="text-gray-400 text-sm">Manage and track all your hotel reservations</p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-10">
        <div className="max-w-5xl mx-auto">

          {/* Filter tabs */}
          <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-2xl p-1.5 mb-8 shadow-sm w-fit">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setFilter(t.id)}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  filter === t.id
                    ? "bg-gray-900 text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {t.label}
                {t.id !== "all" && (
                  <span className={`ml-1.5 text-xs ${filter === t.id ? "text-gray-300" : "text-gray-400"}`}>
                    ({bookingData.filter((b) => {
                      if (t.id === "upcoming")  return b.status === "confirmed" && new Date(b.checkInDate) > new Date();
                      if (t.id === "completed") return b.status === "confirmed" && new Date(b.checkOutDate) < new Date();
                      if (t.id === "cancelled") return b.status === "cancelled";
                      return false;
                    }).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Loading skeletons */}
          {loading && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse flex gap-4">
                  <div className="w-32 h-24 bg-gray-100 rounded-xl flex-shrink-0" />
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-gray-100 rounded w-1/3" />
                    <div className="h-5 bg-gray-100 rounded w-1/2" />
                    <div className="h-3 bg-gray-100 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Booking cards */}
          {!loading && filtered.length > 0 && (
            <div className="space-y-4">
              {filtered.map((booking) => {
                const cfg = statusCfg[booking.status] || statusCfg.pending;
                const n = nights(booking.checkInDate, booking.checkOutDate);
                return (
                  <div
                    key={booking._id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                  >
                    <div className="flex flex-col sm:flex-row">

                      {/* Image */}
                      <div className="relative sm:w-44 h-44 sm:h-auto flex-shrink-0 overflow-hidden">
                        <img
                          src={booking.room?.images?.[0] || assets.roomImg1}
                          alt={booking.room?.roomType}
                          className="w-full h-full object-cover"
                        />
                        {/* Status pill over image */}
                        <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                          {cfg.label}
                        </div>
                      </div>

                      {/* Body */}
                      <div className="flex-1 p-5 flex flex-col justify-between min-w-0">
                        <div>
                          {/* Hotel + ID */}
                          <div className="flex items-start justify-between gap-3 mb-1">
                            <div className="min-w-0">
                              <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                                {Icon.location}
                                <span className="truncate">{booking.hotel?.city}</span>
                              </div>
                              <h3 className="font-bold text-gray-900 text-lg font-playfair leading-snug truncate">
                                {booking.hotel?.name || "Hotel Booking"}
                              </h3>
                              <p className="text-xs text-gray-400 mt-0.5">
                                {booking.room?.roomType} · #{booking._id?.slice(-6).toUpperCase()}
                              </p>
                            </div>
                            {/* Price */}
                            <div className="text-right flex-shrink-0">
                              <p className="text-2xl font-bold text-gray-900 leading-none">
                                {currency}{booking.totalPrice}
                              </p>
                              <p className="text-xs text-gray-400 mt-0.5">{n} night{n > 1 ? "s" : ""}</p>
                            </div>
                          </div>

                          {/* Info row */}
                          <div className="flex flex-wrap gap-4 mt-4">
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <span className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 flex-shrink-0">
                                {Icon.calendar}
                              </span>
                              <div>
                                <p className="text-[10px] text-gray-400 uppercase tracking-wide">Check-in</p>
                                <p className="font-semibold text-gray-800">{fmt(booking.checkInDate)}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-1 text-gray-300 self-end pb-0.5">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <span className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 flex-shrink-0">
                                {Icon.calendar}
                              </span>
                              <div>
                                <p className="text-[10px] text-gray-400 uppercase tracking-wide">Check-out</p>
                                <p className="font-semibold text-gray-800">{fmt(booking.checkOutDate)}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-gray-600 ml-auto">
                              <span className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 flex-shrink-0">
                                {Icon.guests}
                              </span>
                              <div>
                                <p className="text-[10px] text-gray-400 uppercase tracking-wide">Guests</p>
                                <p className="font-semibold text-gray-800">{booking.guests}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <span className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 flex-shrink-0">
                                {Icon.payment}
                              </span>
                              <div>
                                <p className="text-[10px] text-gray-400 uppercase tracking-wide">Payment</p>
                                <p className="font-semibold text-gray-800">{booking.paymentMethod}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                          {booking.status === "pending" && !booking.isPaid && (
                            <button
                              onClick={() => handlePayment(booking._id)}
                              className="flex items-center gap-1.5 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-bold transition-colors"
                            >
                              {Icon.check}
                              Pay Now
                            </button>
                          )}
                          <button
                            onClick={() => navigate(`/room/${booking.room?._id}`)}
                            className="flex items-center gap-1.5 px-4 py-2 bg-gray-900 hover:bg-gray-700 text-white rounded-xl text-xs font-bold transition-colors"
                          >
                            View Room
                            {Icon.arrow}
                          </button>
                          {booking.status === "confirmed" && (
                            <button className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 hover:border-gray-400 text-gray-600 hover:text-gray-900 rounded-xl text-xs font-semibold transition-colors">
                              {Icon.download}
                              Receipt
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty state */}
          {!loading && filtered.length === 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                {Icon.empty}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-400 text-sm mb-6 max-w-xs mx-auto">
                {filter === "all"
                  ? "You haven't made any bookings yet."
                  : `No ${filter} bookings to show.`}
              </p>
              <button
                onClick={() => navigate("/search")}
                className="px-6 py-2.5 bg-gray-900 hover:bg-gray-700 text-white rounded-xl text-sm font-semibold transition-colors"
              >
                Explore Hotels
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default MyBookings;
