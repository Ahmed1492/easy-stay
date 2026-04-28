import React, { useState } from "react";
import { assets, facilityIcons } from "../assets/assets";
import { Link } from "react-router-dom";

const RoomQuickViewModal = ({ room, isOpen, onClose }) => {
  const [imgIndex, setImgIndex] = useState(0);

  if (!isOpen || !room) return null;

  const prev = () => setImgIndex((i) => (i === 0 ? room.images.length - 1 : i - 1));
  const next = () => setImgIndex((i) => (i === room.images.length - 1 ? 0 : i + 1));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[92vh] overflow-hidden flex flex-col animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Close button ── */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-200"
        >
          <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* ── Two-column layout ── */}
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">

          {/* LEFT — image gallery */}
          <div className="relative lg:w-[52%] flex-shrink-0 bg-gray-900 overflow-hidden" style={{ minHeight: "320px" }}>
            <img
              key={imgIndex}
              src={room.images[imgIndex]}
              alt={room?.hotel?.name}
              className="w-full h-full object-cover"
              style={{ minHeight: "320px" }}
            />

            {/* Dark gradient at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Arrows */}
            {room.images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Thumbnail strip at bottom */}
            {room.images.length > 1 && (
              <div className="absolute bottom-4 left-4 right-4 flex gap-2 justify-center">
                {room.images.slice(0, 5).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIndex(i)}
                    className={`w-12 h-9 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                      i === imgIndex ? "border-white scale-105" : "border-white/30 opacity-60 hover:opacity-90"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Top-left badge */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-orange-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg">
                Popular
              </span>
            </div>

            {/* Image counter */}
            <div className="absolute top-4 right-14 bg-black/40 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
              {imgIndex + 1} / {room.images.length}
            </div>
          </div>

          {/* RIGHT — details */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 md:p-8 flex flex-col h-full">

              {/* Hotel name + location */}
              <div className="mb-5">
                <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-2">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="truncate">{room?.hotel?.city}{room?.hotel?.address ? ` · ${room.hotel.address}` : ""}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 font-playfair leading-tight mb-2">
                  {room?.hotel?.name}
                </h2>

                {/* Stars + rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(4)].map((_, i) => (
                      <img key={i} src={assets.starIconFilled} alt="" className="w-3.5" />
                    ))}
                    <img src={assets.starIconOutlined} alt="" className="w-3.5" />
                  </div>
                  <span className="text-sm font-bold text-gray-800">4.5</span>
                  <span className="text-xs text-gray-400">· 200+ reviews</span>
                </div>
              </div>

              {/* Room type + quick stats row */}
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                  {room.roomType}
                </span>
                <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  2 Beds
                </span>
                <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  4 Guests
                </span>
                <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  45 m²
                </span>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 mb-5" />

              {/* Amenities */}
              <div className="mb-5">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Amenities</p>
                <div className="grid grid-cols-2 gap-2">
                  {room.amenities.map((item) => (
                    <div key={item} className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100">
                      {facilityIcons[item]
                        ? <img className="w-4 h-4 flex-shrink-0" src={facilityIcons[item]} alt="" />
                        : <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      }
                      <span className="text-xs text-gray-700 font-medium truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Price + CTA */}
              <div className="border-t border-gray-100 pt-5 mt-2">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Starting from</p>
                    <p className="text-3xl font-bold text-gray-900 leading-none">
                      ${room.pricePerNight}
                      <span className="text-sm text-gray-400 font-normal ml-1">/night</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={onClose}
                      className="px-4 py-2.5 border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900 rounded-xl text-sm font-semibold transition-colors"
                    >
                      Close
                    </button>
                    <Link
                      to={`/room/${room._id}`}
                      onClick={() => { onClose(); window.scrollTo(0, 0); }}
                      className="px-5 py-2.5 bg-gray-900 hover:bg-gray-700 text-white rounded-xl text-sm font-semibold transition-colors flex items-center gap-2"
                    >
                      Book Now
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomQuickViewModal;
