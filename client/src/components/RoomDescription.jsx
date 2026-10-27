import {
  BadgeCheck,
  CalendarCheck,
  Check,
  Clock,
  DoorOpen,
  KeyRound,
  Mail,
  MapPin,
  Phone,
  SprayCan,
  Star,
} from "lucide-react";
import { assets, facilityIcons } from "../assets/assets";
import RoomCheckAvailabiltiy from "./RoomCheckAvailabiltiy";

const highlights = [
  { icon: KeyRound, title: "Easy check-in", sub: "Smooth arrival with help from the front desk any time." },
  { icon: BadgeCheck, title: "Verified hotel", sub: "Listed and reviewed by the QuickStay team." },
  { icon: CalendarCheck, title: "Flexible payment", sub: "Pay online now, or pay when you arrive at the hotel." },
];

const goodToKnow = [
  {
    title: "Hotel rules",
    items: [
      { icon: Clock, text: "Check-in after 2:00 PM" },
      { icon: DoorOpen, text: "Checkout before 12:00 PM" },
    ],
  },
  {
    title: "Safety & cleaning",
    items: [
      { icon: SprayCan, text: "Cleaned between every stay" },
      { icon: BadgeCheck, text: "Front desk on site" },
    ],
  },
  {
    title: "Location",
    items: [{ icon: MapPin, text: "Easy access to the city" }],
  },
];

const Divider = () => <hr className="border-gray-200" />;

const RoomDescription = ({ room, isAvailable, setIsAvailabe, bookingData, setBookingData, id }) => {
  const hotel = room?.hotel;
  const amenityCount = room?.amenities?.length || 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 xl:gap-24 items-start mt-10">
      {/* ── LEFT: main content ── */}
      <div className="min-w-0">
        {/* Summary */}
        <div className="pb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
            {room?.roomType} in {hotel?.city || "the city"}
          </h2>
          <p className="text-gray-600 mt-1">
            Private room · {amenityCount} amenit{amenityCount === 1 ? "y" : "ies"} ·{" "}
            {room?.isAvailable === false ? "Currently unavailable" : "Available to book"}
          </p>
        </div>

        <Divider />

        {/* Host row */}
        <div className="flex items-center gap-4 py-6">
          <img src={assets?.hotelLogo} alt="" className="w-12 h-12 rounded-full object-cover" />
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 truncate">Hosted by {hotel?.name}</p>
            <p className="text-sm text-gray-500">Verified hotel on QuickStay</p>
          </div>
        </div>

        <Divider />

        {/* Highlights */}
        <ul className="py-8 space-y-6">
          {highlights.map(({ icon: Icon, title, sub }) => (
            <li key={title} className="flex items-start gap-5">
              <Icon className="w-6 h-6 text-gray-900 shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <p className="font-semibold text-gray-900">{title}</p>
                <p className="text-sm text-gray-500">{sub}</p>
              </div>
            </li>
          ))}
        </ul>

        <Divider />

        {/* About */}
        <section className="py-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">About this room</h2>
          <p className="text-gray-700 leading-relaxed">
            Enjoy a comfortable {room?.roomType?.toLowerCase()} at {hotel?.name}
            {hotel?.city ? `, in ${hotel.city}` : ""}. Settle in, relax, and make the most of the
            amenities included with your stay. Choose your dates to see the total price and
            reserve in a few clicks.
          </p>
        </section>

        <Divider />

        {/* Amenities */}
        {amenityCount > 0 && (
          <>
            <section className="py-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">What this place offers</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {room.amenities.map((item) => (
                  <li key={item} className="flex items-center gap-4 text-gray-700">
                    {facilityIcons?.[item] ? (
                      <img className="w-6 h-6 opacity-80" src={facilityIcons[item]} alt="" />
                    ) : (
                      <Check className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
                    )}
                    {item}
                  </li>
                ))}
              </ul>
            </section>
            <Divider />
          </>
        )}

        {/* Good to know */}
        <section className="py-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Things to know</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {goodToKnow.map(({ title, items }) => (
              <div key={title}>
                <p className="font-semibold text-gray-900 mb-3">{title}</p>
                <ul className="space-y-3">
                  {items.map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-center gap-3 text-sm text-gray-700">
                      <Icon className="w-4 h-4 text-gray-500" strokeWidth={1.75} />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* Host card */}
        <section className="py-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Meet your host</h2>
          <div className="grid grid-cols-1 sm:grid-cols-[260px_1fr] gap-8 items-center">
            <div className="rounded-3xl p-6 shadow-[0_6px_24px_rgba(0,0,0,0.12)] text-center">
              <img src={assets?.hotelLogo} alt="" className="w-20 h-20 rounded-full object-cover mx-auto mb-3" />
              <p className="text-xl font-semibold text-gray-900 truncate">{hotel?.name}</p>
              <p className="text-sm text-gray-500 mb-4">Hotel</p>
              <div className="flex justify-center gap-6 pt-4 border-t border-gray-100 text-left">
                <div>
                  <p className="font-semibold text-gray-900 flex items-center gap-1">
                    4.5 <Star className="w-3.5 h-3.5 fill-gray-900" />
                  </p>
                  <p className="text-[11px] text-gray-500">Rating</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">200+</p>
                  <p className="text-[11px] text-gray-500">Reviews</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-gray-700 leading-relaxed mb-6">
                A hospitality team dedicated to providing exceptional stays. They're on hand to make
                sure you're comfortable and well looked after throughout your visit.
              </p>
              <div className="flex flex-wrap gap-3">
                {hotel?.contact && (
                  <a
                    href={`tel:${hotel.contact}`}
                    className="flex items-center gap-2 px-5 py-3 rounded-lg bg-gray-900 hover:bg-black text-white text-sm font-semibold transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Call the hotel
                  </a>
                )}
                <a
                  href={`mailto:?subject=${encodeURIComponent(`Question about ${hotel?.name || "your hotel"}`)}`}
                  className="flex items-center gap-2 px-5 py-3 rounded-lg border border-gray-900 text-gray-900 text-sm font-semibold hover:bg-gray-50 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Message host
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── RIGHT: sticky booking card ── */}
      <aside id="booking" className="scroll-mt-28">
        <div className="lg:sticky lg:top-28">
          <RoomCheckAvailabiltiy
            isAvailable={isAvailable}
            bookingData={bookingData}
            setBookingData={setBookingData}
            setIsAvailabe={setIsAvailabe}
            id={id}
            pricePerNight={room?.pricePerNight}
          />
        </div>
      </aside>
    </div>
  );
};

export default RoomDescription;
