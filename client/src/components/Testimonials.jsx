import { useRef, useState } from "react";
import { BadgeCheck, ChevronLeft, ChevronRight, MapPin, Plane, Quote, Star } from "lucide-react";
import { testimonials } from "../assets/assets";

const AVATAR_COLORS = [
  "from-amber-400 to-orange-500",
  "from-sky-400 to-blue-600",
  "from-emerald-400 to-teal-600",
  "from-pink-400 to-rose-600",
  "from-violet-400 to-purple-600",
];

const initials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const Stars = ({ rating }) => (
  <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "fill-amber-400 text-amber-400" : "text-gray-200 fill-gray-200"}`}
      />
    ))}
  </div>
);

const Testimonials = () => {
  const trackRef = useRef(null);
  const drag = useRef({ active: false, moved: false, startX: 0, startScroll: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const onPointerDown = (e) => {
    // Touch already scrolls natively; only mouse/pen need manual dragging
    if (e.pointerType === "touch") return;
    drag.current = {
      active: true,
      moved: false,
      startX: e.clientX,
      startScroll: trackRef.current.scrollLeft,
    };
    setIsDragging(true);
  };

  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d.active) return;
    const delta = e.clientX - d.startX;
    if (Math.abs(delta) > 4) d.moved = true;
    trackRef.current.scrollLeft = d.startScroll - delta;
  };

  const endDrag = () => {
    drag.current.active = false;
    setIsDragging(false);
  };

  const scrollByCard = (direction) => {
    const track = trackRef.current;
    const card = track.firstElementChild;
    const step = card ? card.offsetWidth + 24 : track.clientWidth;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const average = testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

  return (
    <div className="pt-12 pb-10">
      {/* Summary bar */}
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mb-10 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <span className="text-5xl font-bold font-playfair text-gray-900">{average.toFixed(1)}</span>
          <div>
            <Stars rating={Math.round(average)} />
            <p className="text-sm text-gray-500 mt-1">Average guest rating</p>
          </div>
        </div>
        <div className="hidden sm:block w-px self-stretch bg-gray-100" />
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <BadgeCheck className="w-5 h-5 text-emerald-500" />
          <span>
            <strong className="text-gray-900">{testimonials.length}</strong> verified guest reviews
          </span>
        </div>
      </div>

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">Drag or swipe to read more</p>
          <div className="flex items-center gap-2">
            {[
              { dir: -1, icon: ChevronLeft, label: "Previous reviews" },
              { dir: 1, icon: ChevronRight, label: "Next reviews" },
            ].map(({ dir, icon: Icon, label }) => (
              <button
                key={dir}
                onClick={() => scrollByCard(dir)}
                aria-label={label}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-700 shadow-sm hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors cursor-pointer"
              >
                <Icon className="w-5 h-5" />
              </button>
            ))}
          </div>
        </div>

        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onPointerCancel={endDrag}
          onDragStart={(e) => e.preventDefault()}
          className={`flex gap-6 overflow-x-auto pb-6 -mx-1 px-1 select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
            isDragging ? "cursor-grabbing" : "cursor-grab snap-x snap-mandatory scroll-smooth"
          }`}
        >
        {testimonials.map((testimonial, index) => (
          <figure
            key={testimonial.id}
            className="group relative flex flex-col shrink-0 snap-start w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white p-7 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden animate-slide-up"
            style={{ animationDelay: `${index * 80}ms`, animationFillMode: "both" }}
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />

            <div className="flex items-start justify-between mb-5">
              <Stars rating={testimonial.rating} />
              <Quote className="w-9 h-9 text-amber-200 fill-amber-100 group-hover:text-amber-300 transition-colors" />
            </div>

            <blockquote className="flex-1 text-gray-600 leading-relaxed mb-6">
              “{testimonial.review}”
            </blockquote>

            {testimonial.stay && (
              <p className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-5">
                <Plane className="w-3.5 h-3.5" />
                {testimonial.stay}
              </p>
            )}

            <figcaption className="flex items-center gap-3 pt-5 border-t border-gray-100">
              {testimonial.image ? (
                <img
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
                  src={testimonial.image}
                  alt=""
                  loading="lazy"
                />
              ) : (
                <span
                  className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${
                    AVATAR_COLORS[index % AVATAR_COLORS.length]
                  } text-white text-sm font-bold`}
                >
                  {initials(testimonial.name)}
                </span>
              )}
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 font-bold text-gray-900 truncate">
                  {testimonial.name}
                  <BadgeCheck className="w-4 h-4 text-emerald-500 shrink-0" aria-label="Verified guest" />
                </p>
                <p className="flex items-center gap-1 text-gray-500 text-xs">
                  <MapPin className="w-3 h-3" />
                  {testimonial.address}
                </p>
              </div>
            </figcaption>
          </figure>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
