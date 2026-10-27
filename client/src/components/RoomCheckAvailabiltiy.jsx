import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  Building2,
  CircleCheck,
  CreditCard,
  Loader2,
  Minus,
  Plus,
  ShieldCheck,
  Star,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";

const formatDate = (value) =>
  new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

// Native date inputs show "mm/dd/yyyy"; display a friendly date instead and
// keep the real input invisible on top so the picker still opens on click.
const DateField = ({ label, value, min, disabled, onChange }) => (
  <div className={`relative px-4 py-3 ${disabled ? "bg-gray-50" : "hover:bg-gray-50"} transition-colors`}>
    <span className="block text-[10px] font-bold text-gray-900 uppercase tracking-wide">{label}</span>
    <span className={`block text-sm truncate ${value ? "text-gray-900" : "text-gray-400"}`}>
      {value ? formatDate(value) : disabled ? "Add check-in first" : "Add date"}
    </span>
    <input
      type="date"
      value={value}
      min={min}
      disabled={disabled}
      aria-label={label}
      onChange={(e) => onChange(e.target.value)}
      onClick={(e) => {
        try {
          e.currentTarget.showPicker?.();
        } catch {
          // picker already open or not supported; native behaviour still works
        }
      }}
      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
    />
  </div>
);

const PAYMENT_OPTIONS = [
  { id: "stripe", label: "Pay now", sub: "Secure card payment via Stripe", icon: CreditCard },
  { id: "hotel", label: "Pay at the hotel", sub: "Reserve now, pay when you arrive", icon: Building2 },
];

const RoomCheckAvailabiltiy = ({ bookingData, setBookingData, isAvailable, setIsAvailabe, id, pricePerNight }) => {
  const { backEndUrl, getToken, navigate, user, currency } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [paymentChoice, setPaymentChoice] = useState("stripe");

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
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  // Pay At Hotel — booking confirmed immediately, no Stripe
  const handlePayAtHotel = async () => {
    try {
      setLoading(true);
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
        toast.success("Booking confirmed!");
        navigate("/my-bookings");
        setIsAvailabe(false);
      } else {
        toast.error(res.data.message || "Booking failed");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Pay with Stripe — create booking as pending, then redirect to Stripe checkout
  const handlePayWithStripe = async () => {
    try {
      setLoading(true);

      // Step 1: create the booking (pending and unpaid until Stripe confirms payment)
      const bookingRes = await axios.post(
        `${backEndUrl}/api/booking/create`,
        {
          checkInDate: bookingData.checkInDate,
          checkOutDate: bookingData.checkOutDate,
          room: id,
          guests: bookingData.guests,
          paymentMethod: "Stripe",
          isPaid: false,
        },
        { headers: { "ngrok-skip-browser-warning": "true", Authorization: `Bearer ${await getToken()}` } }
      );

      if (!bookingRes.data.success) {
        toast.error(bookingRes.data.message || "Booking failed");
        return;
      }

      const bookingId = bookingRes.data.booking._id;

      // Step 2: create Stripe checkout session
      const stripeRes = await axios.post(
        `${backEndUrl}/api/booking/stripe-payment`,
        { bookingId },
        { headers: { "ngrok-skip-browser-warning": "true", Authorization: `Bearer ${await getToken()}` } }
      );

      if (stripeRes.data.success) {
        // Redirect to Stripe — webhook will confirm the booking after payment
        window.location.href = stripeRes.data.url;
      } else {
        toast.error(stripeRes.data.message || "Could not initiate payment");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];
  const canCheck = Boolean(bookingData.checkInDate && bookingData.checkOutDate);

  const handleMainAction = () => {
    if (!user) return toast.error("Please log in first");
    if (!isAvailable) return handleCheckAvailability();
    return paymentChoice === "stripe" ? handlePayWithStripe() : handlePayAtHotel();
  };

  const mainLabel = loading
    ? isAvailable
      ? paymentChoice === "stripe"
        ? "Redirecting to Stripe…"
        : "Confirming booking…"
      : "Checking…"
    : !canCheck
    ? "Add dates to continue"
    : !isAvailable
    ? "Check availability"
    : paymentChoice === "stripe"
    ? "Reserve & pay"
    : "Reserve";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_6px_20px_rgba(0,0,0,0.12)]">
      {/* Price */}
      <div className="flex items-end justify-between gap-3 mb-6">
        <p className="text-gray-900">
          <span className="text-2xl font-semibold">
            {currency}
            {Number(pricePerNight).toLocaleString()}
          </span>{" "}
          <span className="text-gray-600">night</span>
        </p>
        <p className="flex items-center gap-1 text-sm text-gray-900">
          <Star className="w-3.5 h-3.5 fill-gray-900" />
          <span className="font-semibold">4.5</span>
          <span className="text-gray-400">·</span>
          <span className="text-gray-500 underline underline-offset-2">200+ reviews</span>
        </p>
      </div>

      {/* Dates + guests in one bordered box */}
      <div className="rounded-xl border border-gray-400 overflow-hidden">
        <div className="grid grid-cols-2 divide-x divide-gray-400">
          <DateField
            label="Check-in"
            value={bookingData.checkInDate}
            min={today}
            onChange={(value) => {
              setBookingData((p) => ({
                ...p,
                checkInDate: value,
                // keep check-out after check-in
                checkOutDate: p.checkOutDate && p.checkOutDate <= value ? "" : p.checkOutDate,
              }));
              setIsAvailabe(false);
            }}
          />
          <DateField
            label="Checkout"
            value={bookingData.checkOutDate}
            min={bookingData.checkInDate || today}
            disabled={!bookingData.checkInDate}
            onChange={(value) => {
              setBookingData((p) => ({ ...p, checkOutDate: value }));
              setIsAvailabe(false);
            }}
          />
        </div>
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-gray-400">
          <div>
            <span className="block text-[10px] font-bold text-gray-900 uppercase tracking-wide">Guests</span>
            <span className="text-sm text-gray-900">
              {bookingData.guests} guest{bookingData.guests > 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Fewer guests"
              disabled={bookingData.guests <= 1}
              onClick={() => setBookingData((p) => ({ ...p, guests: Math.max(1, p.guests - 1) }))}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-900 hover:text-gray-900 disabled:opacity-30 disabled:hover:border-gray-300 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-4 text-center text-sm font-medium">{bookingData.guests}</span>
            <button
              type="button"
              aria-label="More guests"
              disabled={bookingData.guests >= 6}
              onClick={() => setBookingData((p) => ({ ...p, guests: Math.min(6, p.guests + 1) }))}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-900 hover:text-gray-900 disabled:opacity-30 disabled:hover:border-gray-300 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Payment choice (after availability is confirmed) */}
      {isAvailable && (
        <div className="mt-5">
          <p className="flex items-center gap-2 text-sm font-medium text-emerald-700 mb-3">
            <CircleCheck className="w-4 h-4" />
            Your dates are available
          </p>
          <div className="space-y-2" role="radiogroup" aria-label="Payment method">
            {PAYMENT_OPTIONS.map(({ id: optionId, label, sub, icon: Icon }) => {
              const selected = paymentChoice === optionId;
              return (
                <button
                  key={optionId}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  disabled={loading}
                  onClick={() => setPaymentChoice(optionId)}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-xl border text-left transition-colors cursor-pointer ${
                    selected ? "border-gray-900 ring-1 ring-gray-900 bg-gray-50" : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <Icon className="w-5 h-5 text-gray-700 shrink-0" strokeWidth={1.75} />
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-semibold text-gray-900">{label}</span>
                    <span className="block text-xs text-gray-500">{sub}</span>
                  </span>
                  <span
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      selected ? "border-gray-900" : "border-gray-300"
                    }`}
                  >
                    {selected && <span className="w-2.5 h-2.5 rounded-full bg-gray-900" />}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main action */}
      <button
        type="button"
        disabled={loading || !canCheck}
        onClick={handleMainAction}
        className="mt-5 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-semibold bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 bg-[length:200%_100%] bg-left hover:bg-right transition-all duration-500 disabled:from-gray-300 disabled:via-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed cursor-pointer"
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {mainLabel}
      </button>

      <p className="flex items-center justify-center gap-1.5 mt-3 text-sm text-gray-500">
        {isAvailable && paymentChoice === "stripe" ? (
          <>
            <ShieldCheck className="w-4 h-4" />
            Payments are processed securely by Stripe
          </>
        ) : (
          "You won't be charged yet"
        )}
      </p>

      {/* Price breakdown */}
      {total && (
        <div className="mt-6 space-y-3 text-gray-700">
          <div className="flex justify-between">
            <span className="underline underline-offset-2">
              {currency}
              {Number(pricePerNight).toLocaleString()} × {nights} night{nights > 1 ? "s" : ""}
            </span>
            <span>
              {currency}
              {(pricePerNight * nights).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="underline underline-offset-2">Service fee</span>
            <span>{currency}0</span>
          </div>
          <div className="flex justify-between pt-4 border-t border-gray-200 font-semibold text-gray-900">
            <span>Total</span>
            <span>
              {currency}
              {total.toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomCheckAvailabiltiy;
