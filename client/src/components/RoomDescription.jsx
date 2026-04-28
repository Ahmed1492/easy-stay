import React from "react";
import { assets, facilityIcons, roomCommonData } from "../assets/assets";
import RoomCheckAvailabiltiy from "./RoomCheckAvailabiltiy";
import StarRating from "./StarRating";

const RoomDescription = ({ room, isAvailable, setIsAvailabe, bookingData, setBookingData, id }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start mt-12">

      {/* ── LEFT: main content (2/3) ── */}
      <div className="lg:col-span-2 space-y-8">

        {/* Host row */}
        <div className="flex items-center justify-between pb-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-0.5">
              Hosted by {room?.hotel?.name}
            </h2>
            <p className="text-sm text-gray-500">
              {room?.hotel?.city} · {room?.hotel?.address}
            </p>
          </div>
          <img
            src={assets?.hotelLogo}
            alt="host"
            className="w-14 h-14 rounded-full object-cover border-2 border-gray-100 shadow-sm flex-shrink-0"
          />
        </div>

        {/* Quick highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
              title: "Self check-in",
              sub: "Check yourself in with the keypad",
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              ),
              title: "Top-rated host",
              sub: "4.9 stars across 200+ stays",
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              ),
              title: "Free cancellation",
              sub: "Cancel up to 48h before check-in",
            },
          ].map((h) => (
            <div key={h.title} className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 text-gray-700">
                {h.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{h.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{h.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* About */}
        <div className="pb-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-3">About this space</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Guests will be allocated on the ground floor according to availability. You get a comfortable two-bedroom apartment that has a true city feeling. The price quoted is for two guests — at the guest slot, please mark the number of guests to get the exact price for groups.
          </p>
        </div>

        {/* Amenities */}
        <div className="pb-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">What this place offers</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {room?.amenities?.map((item) => (
              <div key={item} className="flex items-center gap-2.5 p-3 bg-white rounded-xl border border-gray-100 shadow-sm hover:border-gray-300 transition-colors">
                <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <img className="w-4 h-4" src={facilityIcons?.[item]} alt={item} />
                </div>
                <span className="text-sm font-medium text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Room features from roomCommonData */}
        <div className="pb-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Room features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {roomCommonData.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-gray-200 hover:shadow-md transition-all duration-200">
                <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center flex-shrink-0">
                  <img src={item.icon} className="w-5 h-5 brightness-0 invert" alt="" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 mb-0.5">{item.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Host card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-4 mb-4">
            <img src={assets?.hotelLogo} alt="host" className="w-16 h-16 rounded-full object-cover border-2 border-gray-100" />
            <div>
              <p className="font-bold text-gray-900">{room?.hotel?.name}</p>
              <div className="flex items-center gap-1.5 mt-1">
                <StarRating />
                <span className="text-xs text-gray-500">4.5 · 200+ reviews</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed mb-4">
            We are a premium hospitality group dedicated to providing exceptional stays. Our team is available 24/7 to ensure your comfort and satisfaction throughout your visit.
          </p>
          <div className="flex gap-2">
            <button className="flex-1 bg-gray-900 hover:bg-gray-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Host
            </button>
            <button className="flex-1 border border-gray-200 hover:border-gray-400 text-gray-700 py-2.5 rounded-xl text-sm font-semibold transition-colors">
              More Info
            </button>
          </div>
        </div>

      </div>

      {/* ── RIGHT: sticky booking card (1/3) ── */}
      <div className="lg:col-span-1">
        <div className="sticky top-24">
          <RoomCheckAvailabiltiy
            isAvailable={isAvailable}
            bookingData={bookingData}
            setBookingData={setBookingData}
            setIsAvailabe={setIsAvailabe}
            id={id}
            pricePerNight={room?.pricePerNight}
          />
        </div>
      </div>

    </div>
  );
};

export default RoomDescription;
