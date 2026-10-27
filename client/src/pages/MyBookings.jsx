import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import {
  CalendarDays,
  ChevronRight,
  CreditCard,
  Loader2,
  MapPin,
  Printer,
  Receipt,
  Users,
  X,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";
import roomImg1 from "../assets/roomImg1.png";
import { optimizeImage } from "../utils/image";

const fmt = (d, opts = { month: "short", day: "numeric", year: "numeric" }) =>
  new Date(d).toLocaleDateString("en-US", opts);

const fmtRange = (a, b) =>
  `${fmt(a, { month: "short", day: "numeric" })} – ${fmt(b)}`;

const nights = (a, b) => Math.max(1, Math.round((new Date(b) - new Date(a)) / 86400000));

const daysUntil = (date) => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  return Math.round((new Date(date) - start) / 86400000);
};

const STATUS = {
  confirmed: { label: "Confirmed", dot: "bg-emerald-500" },
  pending: { label: "Pending", dot: "bg-amber-500" },
  cancelled: { label: "Cancelled", dot: "bg-gray-400" },
};

const Status = ({ booking }) => {
  const cfg = STATUS[booking.status] || STATUS.pending;
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-gray-700">
      <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
      {cfg.label}
      {booking.status !== "cancelled" && (
        <span className="text-gray-400">· {booking.isPaid ? "Paid" : "Not paid yet"}</span>
      )}
    </span>
  );
};

const roomImage = (booking, width) => optimizeImage(booking.room?.images?.[0], width) || roomImg1;

// ── Receipt Modal ──────────────────────────────────────────────────────────
const ReceiptModal = ({ booking, currency, onClose }) => {
  const printRef = useRef();

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const n = nights(booking.checkInDate, booking.checkOutDate);
  const pricePerNight = booking.totalPrice / n;

  const handlePrint = () => {
    const content = printRef.current.innerHTML;
    const win = window.open("", "_blank");
    win.document.write(`
      <html><head><title>Receipt – #${booking._id?.slice(-6).toUpperCase()}</title>
      <style>
        body { font-family: sans-serif; padding: 32px; color: #111; }
        h1 { font-size: 22px; margin-bottom: 4px; }
        p { margin: 2px 0; }
        .row { display: flex; justify-content: space-between; padding: 6px 0; }
      </style></head><body>${content}</body></html>
    `);
    win.document.close();
    win.print();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-4 bg-black/50 animate-[fade-in_150ms_ease-out]"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Booking receipt"
        className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-[quickview-in_200ms_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex items-center justify-center px-6 py-4 border-b border-gray-100">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute left-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          <h2 className="font-semibold text-gray-900">Receipt</h2>
        </div>

        <div ref={printRef} className="px-6 py-6 space-y-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{booking.hotel?.name || "Hotel Booking"}</h1>
            <p className="text-gray-500 text-sm">
              {[booking.hotel?.city, booking.room?.roomType].filter(Boolean).join(" · ")} · Receipt #
              {booking._id?.slice(-6).toUpperCase()}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
            {[
              ["Check-in", fmt(booking.checkInDate)],
              ["Checkout", fmt(booking.checkOutDate)],
              ["Guests", booking.guests],
              ["Payment", `${booking.paymentMethod} · ${booking.isPaid ? "Paid" : "Not paid"}`],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-gray-500">{label}</p>
                <p className="font-medium text-gray-900">{value}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-5 space-y-3 text-sm">
            <p className="font-semibold text-gray-900">Price details</p>
            <div className="row flex justify-between text-gray-700">
              <span>
                {currency}
                {pricePerNight.toFixed(2)} × {n} night{n > 1 ? "s" : ""}
              </span>
              <span>
                {currency}
                {booking.totalPrice}
              </span>
            </div>
            <div className="row flex justify-between text-gray-700">
              <span>Service fee</span>
              <span>{currency}0.00</span>
            </div>
            <div className="row flex justify-between font-semibold text-gray-900 pt-3 border-t border-gray-100">
              <span>Total ({currency === "$" ? "USD" : currency})</span>
              <span>
                {currency}
                {booking.totalPrice}
              </span>
            </div>
          </div>

          <p className="text-xs text-gray-400">Booked on {fmt(booking.createdAt, { month: "long", day: "numeric", year: "numeric" })}</p>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-semibold text-gray-900 underline underline-offset-4 cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-black text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            Print / Save PDF
          </button>
        </div>
      </div>
    </div>
  );
};

// ── component ──────────────────────────────────────────────────────────────
const MyBookings = () => {
  const { navigate, backEndUrl, getToken, user, currency } = useAppContext();
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("upcoming");
  const [receiptBooking, setReceiptBooking] = useState(null);
  const [payingId, setPayingId] = useState(null);

  useEffect(() => {
    if (!user) return;
    const getUserBookings = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${backEndUrl}/api/booking/user-bookings`, {
          headers: {
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${await getToken()}`,
          },
        });
        if (res.data.success) setBookingData(res.data.bookings);
      } catch (e) {
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    };
    getUserBookings();
  }, [user, backEndUrl, getToken]);

  const handlePayment = async (id) => {
    try {
      setPayingId(id);
      const res = await axios.post(
        `${backEndUrl}/api/booking/stripe-payment`,
        { bookingId: id },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      if (res.data.success) {
        window.location.href = res.data.url;
        return;
      }
      toast.error(res.data.message);
    } catch (e) {
      toast.error(e.response?.data?.message || e.message);
    }
    setPayingId(null);
  };

  const groups = useMemo(() => {
    const active = bookingData.filter((b) => b.status !== "cancelled");
    return {
      upcoming: active
        .filter((b) => daysUntil(b.checkOutDate) > 0)
        .sort((a, b) => new Date(a.checkInDate) - new Date(b.checkInDate)),
      past: active.filter((b) => daysUntil(b.checkOutDate) <= 0),
      cancelled: bookingData.filter((b) => b.status === "cancelled"),
    };
  }, [bookingData]);

  const tabs = [
    { id: "upcoming", label: "Upcoming" },
    { id: "past", label: "Past" },
    { id: "cancelled", label: "Cancelled" },
  ];

  const list = groups[tab];

  const empty = {
    upcoming: {
      title: "No trips booked… yet!",
      text: "Time to dust off your bags and start planning your next adventure.",
    },
    past: { title: "No past trips", text: "Stays you've completed will show up here." },
    cancelled: { title: "No cancelled bookings", text: "Bookings you cancel or don't complete will show up here." },
  }[tab];

  return (
    <div className="min-h-screen bg-white">
      {receiptBooking && (
        <ReceiptModal booking={receiptBooking} currency={currency} onClose={() => setReceiptBooking(null)} />
      )}

      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-28 md:pt-32 pb-24">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-8">Trips</h1>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-gray-200 mb-10" role="tablist">
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={`relative pb-3 text-sm font-semibold transition-colors cursor-pointer ${
                tab === id ? "text-gray-900" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {label}
              {!loading && groups[id].length > 0 && (
                <span className="ml-1.5 text-gray-400 font-normal">{groups[id].length}</span>
              )}
              <span
                className={`absolute left-0 right-0 -bottom-px h-0.5 rounded-full bg-gray-900 transition-transform origin-left ${
                  tab === id ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-[1fr_320px] rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
                <div className="p-6 space-y-4">
                  <div className="h-5 bg-gray-100 rounded w-1/3" />
                  <div className="h-7 bg-gray-100 rounded w-2/3" />
                  <div className="h-4 bg-gray-100 rounded w-1/2" />
                  <div className="h-10 bg-gray-100 rounded w-40 mt-6" />
                </div>
                <div className="h-48 md:h-auto bg-gray-100" />
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && list.length === 0 && (
          <div className="py-12 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{empty.title}</h2>
            <p className="text-gray-500 mb-6 max-w-md">{empty.text}</p>
            <button
              onClick={() => navigate("/rooms")}
              className="px-6 py-3 rounded-lg border border-gray-900 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Start searching
            </button>
          </div>
        )}

        {/* Upcoming: large cards */}
        {!loading && tab === "upcoming" && list.length > 0 && (
          <div className="space-y-6">
            {list.map((booking) => {
              const n = nights(booking.checkInDate, booking.checkOutDate);
              const startIn = daysUntil(booking.checkInDate);
              const canPay = booking.status === "pending" && !booking.isPaid;
              const isPaying = payingId === booking._id;
              return (
                <article
                  key={booking._id}
                  className="grid grid-cols-1 md:grid-cols-[1fr_340px] rounded-2xl border border-gray-200 overflow-hidden hover:shadow-[0_6px_24px_rgba(0,0,0,0.08)] transition-shadow"
                >
                  <div className="p-6 md:p-8 flex flex-col order-2 md:order-1">
                    <p className="text-sm font-medium text-gray-500 mb-2">
                      {startIn > 1 ? `In ${startIn} days` : startIn === 1 ? "Tomorrow" : startIn === 0 ? "Today" : "Happening now"}
                    </p>
                    <h2 className="text-2xl font-semibold text-gray-900 leading-tight mb-1">
                      {booking.hotel?.name || "Hotel Booking"}
                    </h2>
                    <p className="text-gray-500 mb-6">
                      {booking.room?.roomType || "Room"} hosted by {booking.hotel?.name || "the hotel"}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 pb-6 border-b border-gray-100 text-sm">
                      <div>
                        <p className="text-gray-500 flex items-center gap-1.5"><CalendarDays className="w-4 h-4" /> Dates</p>
                        <p className="font-medium text-gray-900 mt-0.5">{fmtRange(booking.checkInDate, booking.checkOutDate)}</p>
                        <p className="text-gray-500">{n} night{n > 1 ? "s" : ""}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Location</p>
                        <p className="font-medium text-gray-900 mt-0.5">{booking.hotel?.city || "—"}</p>
                        <p className="text-gray-500 truncate">{booking.hotel?.address}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 flex items-center gap-1.5"><Users className="w-4 h-4" /> Guests</p>
                        <p className="font-medium text-gray-900 mt-0.5">
                          {booking.guests} guest{booking.guests > 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-5">
                      <div>
                        <Status booking={booking} />
                        <p className="text-lg font-semibold text-gray-900 mt-0.5">
                          {currency}
                          {booking.totalPrice.toLocaleString()}{" "}
                          <span className="text-sm font-normal text-gray-500">total · {booking.paymentMethod}</span>
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        {booking.status === "confirmed" && (
                          <button
                            onClick={() => setReceiptBooking(booking)}
                            className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 underline underline-offset-4 hover:text-gray-600 cursor-pointer"
                          >
                            <Receipt className="w-4 h-4" />
                            Receipt
                          </button>
                        )}
                        {booking.room?._id && (
                          <button
                            onClick={() => navigate(`/room/${booking.room._id}`)}
                            className="px-5 py-2.5 rounded-lg border border-gray-900 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer"
                          >
                            View room
                          </button>
                        )}
                        {canPay && (
                          <button
                            onClick={() => handlePayment(booking._id)}
                            disabled={isPaying}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 hover:bg-black text-white text-sm font-semibold transition-colors disabled:opacity-60 cursor-pointer"
                          >
                            {isPaying ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
                            {isPaying ? "Redirecting…" : "Pay now"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="relative h-56 md:h-auto order-1 md:order-2 bg-gray-100">
                    <img src={roomImage(booking, 700)} alt={booking.room?.roomType || "Room"} className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Past & cancelled: compact grid */}
        {!loading && tab !== "upcoming" && list.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
            {list.map((booking) => (
              <article key={booking._id} className="group">
                <button
                  onClick={() => booking.room?._id && navigate(`/room/${booking.room._id}`)}
                  className="block w-full text-left cursor-pointer"
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 mb-3">
                    <img
                      src={roomImage(booking, 600)}
                      alt=""
                      className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                        booking.status === "cancelled" ? "grayscale opacity-80" : ""
                      }`}
                    />
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{booking.hotel?.name || "Hotel Booking"}</p>
                      <p className="text-sm text-gray-500 truncate">{booking.hotel?.city}</p>
                      <p className="text-sm text-gray-500">{fmtRange(booking.checkInDate, booking.checkOutDate)}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-900 shrink-0 mt-0.5 transition-colors" />
                  </div>
                </button>
                <div className="flex items-center justify-between gap-2 mt-2">
                  <Status booking={booking} />
                  {booking.status === "confirmed" && (
                    <button
                      onClick={() => setReceiptBooking(booking)}
                      className="text-sm font-semibold text-gray-900 underline underline-offset-4 hover:text-gray-600 cursor-pointer"
                    >
                      Receipt
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
