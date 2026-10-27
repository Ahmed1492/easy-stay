import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BedDouble, Eye, Heart, MapPin, Star } from "lucide-react";
import { assets, facilityIcons } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { optimizeImage, preloadImages } from "../utils/image";
import { quickViewImage } from "./RoomQuickViewModal";

const HotelRoomCard = ({ room, onQuickView }) => {
  const navigate = useNavigate();
  const { currency } = useAppContext();
  const [isFavorite, setIsFavorite] = useState(false);

  const openRoom = () => {
    navigate(`/room/${room._id}`);
    window.scrollTo(0, 0);
  };

  const stop = (handler) => (e) => {
    e.stopPropagation();
    handler();
  };

  return (
    <article
      onClick={openRoom}
      onMouseEnter={() => preloadImages(room.images.map(quickViewImage))}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="relative sm:w-72 md:w-80 h-56 sm:h-auto sm:min-h-60 shrink-0 overflow-hidden">
          <img
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            src={optimizeImage(room.images[0], 800)}
            alt={room?.hotel?.name}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Room type badge */}
          <span className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-gray-900 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow">
            <BedDouble className="w-3.5 h-3.5" />
            {room.roomType}
          </span>

          {/* Favorite */}
          <button
            onClick={stop(() => setIsFavorite((prev) => !prev))}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            aria-pressed={isFavorite}
            className="absolute top-3 right-3 w-9 h-9 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow hover:scale-110 transition-transform cursor-pointer"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </button>

          {/* Quick view */}
          <button
            onClick={stop(() => onQuickView(room))}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-white text-gray-900 text-xs font-semibold px-4 py-2 rounded-full shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5 md:p-6">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex-1 min-w-0">
              <p className="flex items-center gap-1 text-gray-500 text-xs font-medium mb-1">
                <MapPin className="w-3.5 h-3.5" />
                {room?.hotel?.city}
              </p>
              <h3 className="font-bold text-gray-900 text-xl leading-snug line-clamp-1 font-playfair group-hover:text-gray-700 transition-colors">
                {room?.hotel?.name}
              </h3>
              <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{room?.hotel?.address}</p>
            </div>

            {/* Rating badge */}
            <div className="shrink-0 flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-100 text-xs font-bold px-2.5 py-1.5 rounded-xl">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
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
          <div className="flex flex-wrap gap-1.5 mb-5">
            {room.amenities.slice(0, 4).map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-100 text-gray-600 text-[11px] font-medium px-2.5 py-1 rounded-lg"
              >
                {facilityIcons[item] && <img className="w-3.5 h-3.5" src={facilityIcons[item]} alt="" />}
                {item}
              </span>
            ))}
            {room.amenities.length > 4 && (
              <span className="inline-flex items-center bg-gray-50 border border-gray-100 text-gray-400 text-[11px] font-medium px-2.5 py-1 rounded-lg">
                +{room.amenities.length - 4} more
              </span>
            )}
          </div>

          <div className="flex-1" />

          {/* Price + CTA */}
          <div className="flex flex-wrap items-end justify-between gap-3 pt-4 border-t border-gray-100">
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">From</p>
              <p className="text-2xl font-bold text-gray-900 leading-none">
                {currency}
                {room.pricePerNight}
                <span className="text-sm text-gray-400 font-normal ml-1">/night</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={stop(() => onQuickView(room))}
                className="border border-gray-200 text-gray-700 hover:border-gray-900 hover:text-gray-900 text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Preview
              </button>
              <button
                onClick={stop(openRoom)}
                className="bg-gray-900 hover:bg-black text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                Book Now
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default HotelRoomCard;
