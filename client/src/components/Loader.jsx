import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import axios from "axios";

const Loader = () => {
  const { navigate, backEndUrl, getToken } = useAppContext();
  const { nextUrl } = useParams();

  useEffect(() => {
    const run = async () => {
      // Read bookingId from query string e.g. /loader/my-bookings?bookingId=abc123
      const params = new URLSearchParams(window.location.search);
      const bookingId = params.get("bookingId");

      if (bookingId) {
        try {
          const token = await getToken();
          const res = await axios.post(
            `${backEndUrl}/api/booking/verify-payment`,
            { bookingId },
            { headers: { Authorization: `Bearer ${token}`, "ngrok-skip-browser-warning": "true" } }
          );
          if (res.data.success) {
            console.log("✅ Payment verified, booking confirmed");
          } else {
            console.warn("Payment verification failed:", res.data.message);
          }
        } catch (err) {
          console.error("verify-payment error:", err.message);
        }
      }

      // Navigate after verification (or after a short delay if no bookingId)
      setTimeout(() => {
        navigate(`/${nextUrl}`);
      }, bookingId ? 500 : 3000);
    };

    if (nextUrl) run();
  }, [nextUrl]);

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-gray-900" />
      <p className="text-gray-500 text-sm font-medium">Confirming your booking…</p>
    </div>
  );
};

export default Loader;
