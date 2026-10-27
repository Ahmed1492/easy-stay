import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BedDouble,
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  Maximize2,
  MapPin,
  Phone,
  Star,
  Users,
  X,
} from "lucide-react";
import { facilityIcons } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { optimizeImage } from "../utils/image";

// Shared with the cards so hovering a card preloads exactly what the modal shows
export const quickViewImage = (url) => optimizeImage(url, 1200);
const thumbImage = (url) => optimizeImage(url, 200);

const ModalContent = ({ room, onClose }) => {
  const { currency } = useAppContext();
  const [imgIndex, setImgIndex] = useState(0);
  const [loaded, setLoaded] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const touchStartX = useRef(null);
  const images = room.images;
  const imageCount = images.length;

  const prev = () => setImgIndex((i) => (i === 0 ? imageCount - 1 : i - 1));
  const next = () => setImgIndex((i) => (i === imageCount - 1 ? 0 : i + 1));

  // Keyboard: Esc closes, arrows switch images; page scroll is locked while open
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setImgIndex((i) => (i === 0 ? imageCount - 1 : i - 1));
      if (e.key === "ArrowRight") setImgIndex((i) => (i === imageCount - 1 ? 0 : i + 1));
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, imageCount]);

  // Swipe between images on touch screens
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) (delta > 0 ? prev : next)();
    touchStartX.current = null;
  };

  const specs = [
    { icon: BedDouble, label: room.roomType },
    { icon: Users, label: "4 Guests" },
    { icon: Maximize2, label: "45 m²" },
  ];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-4 bg-black/60 backdrop-blur-sm animate-[fade-in_150ms_ease-out]"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={room?.hotel?.name}
        className="relative bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl w-full max-w-5xl max-h-[92vh] overflow-hidden flex flex-col animate-[quickview-in_200ms_cubic-bezier(0.16,1,0.3,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col lg:flex-row flex-1 overflow-y-auto lg:overflow-hidden">
          {/* LEFT — image gallery */}
          <div
            className="relative lg:w-[55%] shrink-0 bg-gray-200 h-72 sm:h-96 lg:h-auto lg:min-h-[34rem] select-none"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* All images are stacked and cross-faded, so switching is instant once loaded */}
            {images.map((src, i) => (
              <img
                key={src}
                src={quickViewImage(src)}
                alt={i === imgIndex ? room?.hotel?.name : ""}
                onLoad={() => setLoaded((prev) => ({ ...prev, [i]: true }))}
                fetchPriority={i === 0 ? "high" : "low"}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                  i === imgIndex && loaded[i] ? "opacity-100" : "opacity-0"
                }`}
                draggable={false}
              />
            ))}
            {!loaded[imgIndex] && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25 pointer-events-none" />

            {/* Top bar */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
              <span
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg ${
                  room.isAvailable === false
                    ? "bg-red-500 text-white"
                    : "bg-emerald-500 text-white"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                {room.isAvailable === false ? "Unavailable" : "Available"}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFavorite((prev) => !prev)}
                  aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                  aria-pressed={isFavorite}
                  className="w-9 h-9 bg-white/90 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                >
                  <Heart
                    className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"}`}
                  />
                </button>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="w-9 h-9 bg-white/90 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                >
                  <X className="w-4 h-4 text-gray-700" />
                </button>
              </div>
            </div>

            {imageCount > 1 && (
              <>
                <button
                  onClick={prev}
                  aria-label="Previous image"
                  className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next image"
                  className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>

                {/* Thumbnails (desktop) / dots (mobile) */}
                <div className="absolute bottom-4 inset-x-4 flex items-center justify-between gap-3">
                  <div className="hidden sm:flex gap-2 overflow-x-auto">
                    {images.map((img, i) => (
                      <button
                        key={img}
                        onClick={() => setImgIndex(i)}
                        aria-label={`Show image ${i + 1}`}
                        className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                          i === imgIndex
                            ? "border-white"
                            : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img src={thumbImage(img)} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                  <div className="flex sm:hidden gap-1.5">
                    {images.map((img, i) => (
                      <span
                        key={img}
                        className={`h-1.5 rounded-full transition-all ${
                          i === imgIndex ? "w-5 bg-white" : "w-1.5 bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="shrink-0 bg-black/40 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
                    {imgIndex + 1} / {imageCount}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* RIGHT — details */}
          <div className="flex-1 lg:overflow-y-auto">
            <div className="p-6 md:p-8 flex flex-col h-full">
              <div className="mb-6">
                <p className="flex items-center gap-1.5 text-gray-500 text-xs font-medium mb-2">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">
                    {room?.hotel?.city}
                    {room?.hotel?.address ? ` · ${room.hotel.address}` : ""}
                  </span>
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-playfair leading-tight mb-3">
                  {room?.hotel?.name}
                </h2>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-100 text-xs font-bold px-2 py-1 rounded-lg">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    4.5
                  </span>
                  <span className="text-xs text-gray-500">200+ reviews</span>
                  {room?.hotel?.contact && (
                    <a
                      href={`tel:${room.hotel.contact}`}
                      className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      {room.hotel.contact}
                    </a>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-6">
                {specs.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-2 py-3 px-2 rounded-2xl bg-gray-50 border border-gray-100 text-center"
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm">
                      <Icon className="w-4 h-4 text-gray-700" />
                    </span>
                    <span className="text-xs font-semibold text-gray-700 leading-tight">{label}</span>
                  </div>
                ))}
              </div>

              {room.amenities.length > 0 && (
                <div className="mb-6">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                    What this room offers
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {room.amenities.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2.5 bg-white rounded-xl px-3 py-2.5 border border-gray-100"
                      >
                        <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-gray-50 shrink-0">
                          {facilityIcons[item] ? (
                            <img className="w-4 h-4" src={facilityIcons[item]} alt="" />
                          ) : (
                            <Check className="w-4 h-4 text-gray-500" />
                          )}
                        </span>
                        <span className="text-xs text-gray-700 font-medium truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex-1" />

              {/* Price + CTA */}
              <div className="sticky bottom-0 -mx-6 md:-mx-8 -mb-6 md:-mb-8 px-6 md:px-8 py-5 bg-white border-t border-gray-100">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
                      Starting from
                    </p>
                    <p className="text-3xl font-bold text-gray-900 leading-none">
                      {currency}
                      {room.pricePerNight}
                      <span className="text-sm text-gray-400 font-normal ml-1">/night</span>
                    </p>
                  </div>
                  <Link
                    to={`/room/${room._id}`}
                    onClick={() => {
                      onClose();
                      window.scrollTo(0, 0);
                    }}
                    className="group flex-1 sm:flex-none justify-center px-6 py-3 bg-gray-900 hover:bg-black text-white rounded-xl text-sm font-semibold transition-colors flex items-center gap-2"
                  >
                    View & Book
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RoomQuickViewModal = ({ room, isOpen, onClose }) => {
  if (!isOpen || !room) return null;
  // Keyed by room so the gallery starts at the first image for each room
  return <ModalContent key={room._id} room={room} onClose={onClose} />;
};

export default RoomQuickViewModal;
