import React from "react";
import { assets, facilityIcons } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const HotelRoomCard = ({ room, onQuickView }) => {
  const navigate = useNavigate();

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300">
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="relative sm:w-72 h-56 sm:h-auto flex-shrink-0 overflow-hidden">
          <img
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            src={room.images[0]}
            alt={room?.hotel?.name}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            <span className="bg-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
              Popular
            </span>
          </div>

          {/* Favorite */}
          <button
            onClick={(e) => e.stopPropagation()}
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow hover:bg-white transition-all group/fav"
          >
            <svg className="w-4 h-4 text-gray-500 group-hover/fav:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          {/* Quick view overlay */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
              onClick={(e) => { e.stopPropagation(); onQuickView(room); }}
              className="bg-white text-gray-900 text-xs font-semibold px-4 py-2 rounded-full shadow-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Quick View
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          {/* Top row */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {room?.hotel?.city}
              </div>
              <h3 className="font-bold text-gray-900 text-lg leading-snug line-clamp-1 font-playfair">
                {room?.hotel?.name}
              </h3>
              <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{room?.hotel?.address}</p>
            </div>

            {/* Rating badge */}
            <div className="flex-shrink-0 flex items-center gap-1 bg-gray-900 text-white text-xs font-bold px-2.5 py-1.5 rounded-xl">
              <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              4.5
            </div>
          </div>

          {/* Stars + reviews */}
          <div className="flex items-center gap-1.5 mb-4">
            <div className="flex items-center gap-0.5">
              {[...Array(4)].map((_, i) => (
                <img key={i} src={assets.starIconFilled} alt="" className="w-3.5" />
              ))}
              <img src={assets.starIconOutlined} alt="" className="w-3.5" />
            </div>
            <span className="text-xs text-gray-400">200+ reviews</span>
          </div>

          {/* Amenity pills */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {room.amenities.slice(0, 5).map((item) => (
              <span key={item} className="inline-flex items-center gap-1 bg-gray-50 border border-gray-100 text-gray-600 text-[11px] font-medium px-2 py-1 rounded-lg">
                {facilityIcons[item] && <img className="w-3 h-3" src={facilityIcons[item]} alt="" />}
                {item}
              </span>
            ))}
            {room.amenities.length > 5 && (
              <span className="inline-flex items-center bg-gray-50 border border-gray-100 text-gray-400 text-[11px] font-medium px-2 py-1 rounded-lg">
                +{room.amenities.length - 5} more
              </span>
            )}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Price + CTA */}
          <div className="flex items-end justify-between pt-4 border-t border-gray-100">
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">From</p>
              <p className="text-2xl font-bold text-gray-900 leading-none">
                ${room.pricePerNight}
                <span className="text-sm text-gray-400 font-normal ml-1">/night</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); onQuickView(room); }}
                className="border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900 text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors duration-200"
              >
                Preview
              </button>
              <button
                onClick={() => { navigate(`/room/${room._id}`); window.scrollTo(0, 0); }}
                className="bg-gray-900 hover:bg-gray-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors duration-200 flex items-center gap-1.5"
              >
                Book Now
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelRoomCard;
