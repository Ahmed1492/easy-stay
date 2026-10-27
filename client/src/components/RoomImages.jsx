import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ChevronLeft, ChevronRight, Grid2x2, Heart, Share, Star, X } from "lucide-react";
import { optimizeImage, preloadImages } from "../utils/image";

const RoomImages = ({ room }) => {
  const images = room?.images || [];
  const [mainIndex, setMainIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const isOpen = lightboxIndex !== null;

  const close = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setLightboxIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  const showPrevMain = () => setMainIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const showNextMain = () => setMainIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  // Esc closes, arrows navigate; page scroll is locked while the lightbox is open
  useEffect(() => {
    if (!isOpen) return;
    const count = images.length;
    const onKey = (e) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i === 0 ? count - 1 : i - 1));
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i === count - 1 ? 0 : i + 1));
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, images.length]);

  // Warm the cache so swapping the main photo is instant
  useEffect(() => {
    preloadImages(images.map((img) => optimizeImage(img, 1400)));
  }, [images]);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: room?.hotel?.name, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied");
      }
    } catch {
      // user cancelled the share sheet
    }
  };

  // Up to 4 thumbnails next to the main photo; the last one shows "+N" when there are more
  const thumbs = images.slice(0, 4);
  const hiddenCount = images.length - thumbs.length;
  const thumbSpan = (i) => {
    if (thumbs.length === 2) return "md:col-span-2";
    if (thumbs.length === 3 && i === 2) return "md:col-span-2";
    return "";
  };

  return (
    <div>
      {/* Title row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6">
        <div className="min-w-0">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-tight">
            {room?.roomType} at {room?.hotel?.name}
          </h1>
          <p className="flex flex-wrap items-center gap-x-1.5 mt-1.5 text-sm text-gray-900">
            <Star className="w-3.5 h-3.5 fill-gray-900" />
            <span className="font-semibold">4.5</span>
            <span>·</span>
            <span className="underline underline-offset-2 font-medium">200+ reviews</span>
            <span>·</span>
            <span className="underline underline-offset-2 font-medium">
              {[room?.hotel?.city, room?.hotel?.address].filter(Boolean).join(", ")}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-1 -ml-3 md:ml-0 shrink-0">
          <button
            onClick={share}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <Share className="w-4 h-4" />
            <span className="underline underline-offset-2">Share</span>
          </button>
          <button
            onClick={() => setIsFavorite((prev) => !prev)}
            aria-pressed={isFavorite}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <Heart className={`w-4 h-4 transition-colors ${isFavorite ? "fill-rose-500 text-rose-500" : ""}`} />
            <span className="underline underline-offset-2">{isFavorite ? "Saved" : "Save"}</span>
          </button>
        </div>
      </div>

      {/* Gallery */}
      {images.length > 0 && (
        <div className="relative">
        <div
          className={`grid gap-2 ${thumbs.length > 1 ? "md:grid-cols-4 md:grid-rows-2" : ""} md:h-[28rem] rounded-2xl overflow-hidden`}
        >
          {/* Main photo */}
          <div
            className={`group relative overflow-hidden bg-gray-100 h-72 sm:h-96 md:h-auto rounded-2xl md:rounded-none ${
              thumbs.length > 1 ? "md:col-span-2 md:row-span-2" : ""
            }`}
          >
            <button
              onClick={() => setLightboxIndex(mainIndex)}
              aria-label="Open photo full screen"
              className="absolute inset-0 cursor-zoom-in"
            >
              <img
                key={mainIndex}
                src={optimizeImage(images[mainIndex], 1400)}
                alt={`${room?.hotel?.name} photo ${mainIndex + 1}`}
                fetchPriority="high"
                className="w-full h-full object-cover animate-[fade-in_250ms_ease-out] group-hover:brightness-95 transition"
              />
            </button>

            {images.length > 1 && (
              <>
                <button
                  onClick={showPrevMain}
                  aria-label="Previous photo"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 text-gray-900 shadow flex items-center justify-center md:opacity-0 group-hover:opacity-100 hover:scale-105 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={showNextMain}
                  aria-label="Next photo"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 text-gray-900 shadow flex items-center justify-center md:opacity-0 group-hover:opacity-100 hover:scale-105 transition-all cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <span className="absolute bottom-3 left-3 md:hidden bg-black/60 text-white text-xs font-medium px-2.5 py-1 rounded-md pointer-events-none">
                  {mainIndex + 1} / {images.length}
                </span>
              </>
            )}
          </div>

          {/* Thumbnails: click to show in the main photo */}
          {thumbs.length > 1 && (
            <div className="grid grid-cols-4 md:contents gap-2">
              {thumbs.map((img, index) => {
                const active = index === mainIndex;
                const isMore = index === thumbs.length - 1 && hiddenCount > 0;
                return (
                  <button
                    key={img}
                    onClick={() => (isMore ? setLightboxIndex(index) : setMainIndex(index))}
                    aria-label={isMore ? `Show all ${images.length} photos` : `Show photo ${index + 1}`}
                    aria-pressed={active}
                    className={`group relative overflow-hidden bg-gray-100 aspect-[4/3] md:aspect-auto rounded-lg md:rounded-none cursor-pointer ${thumbSpan(index)}`}
                  >
                    <img
                      src={optimizeImage(img, 700)}
                      alt=""
                      className="w-full h-full object-cover group-hover:brightness-90 transition"
                    />
                    {/* selected indicator */}
                    <span
                      className={`absolute inset-0 transition-all ${
                        active ? "ring-[3px] ring-inset ring-gray-900" : "bg-white/0"
                      }`}
                    />
                    {isMore && (
                      <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-lg font-semibold">
                        +{hiddenCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

        </div>

        <button
          onClick={() => setLightboxIndex(mainIndex)}
          className="hidden md:flex absolute right-4 bottom-4 items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-lg border border-gray-900 text-sm font-semibold shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <Grid2x2 className="w-4 h-4" />
          Show all photos
        </button>
        </div>
      )}

      {/* Lightbox */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo gallery"
          className="fixed inset-0 z-[70] bg-white flex flex-col animate-[fade-in_150ms_ease-out]"
        >
          <div className="flex items-center justify-between px-4 md:px-8 py-4">
            <button
              onClick={close}
              aria-label="Close gallery"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
              Close
            </button>
            <span className="text-sm font-medium text-gray-900">
              {lightboxIndex + 1} / {images.length}
            </span>
            <span className="w-20" />
          </div>

          <div className="relative flex-1 min-h-0 flex items-center justify-center px-4 md:px-24">
            <img
              key={lightboxIndex}
              src={optimizeImage(images[lightboxIndex], 1800)}
              alt={`${room?.hotel?.name} photo ${lightboxIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg animate-[fade-in_200ms_ease-out]"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  aria-label="Previous photo"
                  className="absolute left-3 md:left-8 w-11 h-11 rounded-full border border-gray-300 bg-white text-gray-900 flex items-center justify-center hover:border-gray-900 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next photo"
                  className="absolute right-3 md:right-8 w-11 h-11 rounded-full border border-gray-300 bg-white text-gray-900 flex items-center justify-center hover:border-gray-900 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          <div className="flex gap-2 justify-center overflow-x-auto px-4 py-4">
            {images.map((img, i) => (
              <button
                key={img}
                onClick={() => setLightboxIndex(i)}
                aria-label={`Show photo ${i + 1}`}
                className={`w-16 h-12 shrink-0 rounded-md overflow-hidden transition-all cursor-pointer ${
                  i === lightboxIndex ? "ring-2 ring-gray-900 ring-offset-2" : "opacity-50 hover:opacity-100"
                }`}
              >
                <img src={optimizeImage(img, 200)} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomImages;
