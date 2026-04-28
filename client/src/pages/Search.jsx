import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import SearchRoomCard from "../components/SearchRoomCard";
import HotelRoomCard from "../components/HotelRoomCard";
import RoomQuickViewModal from "../components/RoomQuickViewModal";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { rooms, currency } = useAppContext();

  const [destination, setDestination] = useState(searchParams.get("destination") || "");
  const [checkIn, setCheckIn] = useState(searchParams.get("checkIn") || "");
  const [checkOut, setCheckOut] = useState(searchParams.get("checkOut") || "");
  const [guests, setGuests] = useState(searchParams.get("guests") || "1");

  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [sortBy, setSortBy] = useState("recommended");
  const [viewMode, setViewMode] = useState("grid");

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showQuickView, setShowQuickView] = useState(false);

  const roomTypes = ["Single", "Double", "Suite", "Deluxe", "Presidential"];
  const amenities = ["Free WiFi", "Pool", "Spa", "Gym", "Restaurant", "Room Service", "Free Breakfast"];

  const filteredRooms = rooms
    .filter((room) => {
      if (destination) {
        const q = destination.toLowerCase();
        const city = room.hotel?.city?.toLowerCase() || "";
        const name = room.hotel?.name?.toLowerCase() || "";
        const addr = room.hotel?.address?.toLowerCase() || "";
        if (!city.includes(q) && !name.includes(q) && !addr.includes(q)) return false;
      }
      if (room.pricePerNight < priceRange[0] || room.pricePerNight > priceRange[1]) return false;
      if (selectedRoomTypes.length > 0 && !selectedRoomTypes.includes(room.roomType)) return false;
      if (selectedAmenities.length > 0) {
        const has = selectedAmenities.every(a =>
          (room.amenities || []).some(ra => ra.toLowerCase().includes(a.toLowerCase()))
        );
        if (!has) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.pricePerNight - b.pricePerNight;
      if (sortBy === "price-high") return b.pricePerNight - a.pricePerNight;
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  const handleSearch = () => {
    const params = {};
    if (destination) params.destination = destination;
    if (checkIn) params.checkIn = checkIn;
    if (checkOut) params.checkOut = checkOut;
    if (guests) params.guests = guests;
    setSearchParams(params);
  };

  const clearFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedRoomTypes([]);
    setSelectedAmenities([]);
    setSortBy("recommended");
  };

  const activeFilterCount =
    selectedRoomTypes.length + selectedAmenities.length + (priceRange[1] < 1000 ? 1 : 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Hero / Search Bar ── */}
      <div className="bg-gray-900 pt-28 pb-14 px-6 md:px-16 lg:px-24 xl:px-32">
        <div className="max-w-6xl mx-auto">
          <p className="text-gray-400 text-sm font-medium tracking-widest uppercase mb-3">
            Hotel Search
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 font-playfair leading-tight">
            Find Your Perfect Stay
          </h1>
          <p className="text-gray-400 mb-10">
            {rooms.length}+ premium hotels worldwide
          </p>

          {/* Search Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-100">
              {/* Destination */}
              <div className="px-6 py-5">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Destination
                </label>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    placeholder="City, hotel or area"
                    className="w-full text-gray-900 font-medium placeholder-gray-300 bg-transparent outline-none text-sm"
                  />
                </div>
              </div>

              {/* Check-in */}
              <div className="px-6 py-5">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Check-in
                </label>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full text-gray-900 font-medium bg-transparent outline-none text-sm"
                  />
                </div>
              </div>

              {/* Check-out */}
              <div className="px-6 py-5">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Check-out
                </label>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full text-gray-900 font-medium bg-transparent outline-none text-sm"
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="px-6 py-5">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Guests
                </label>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full text-gray-900 font-medium bg-transparent outline-none appearance-none text-sm"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="px-6 pb-5 pt-1">
              <button
                onClick={handleSearch}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3.5 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-sm tracking-wide"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search Hotels
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-10">
        <div className="max-w-7xl mx-auto flex gap-8">

          {/* ── Sidebar ── */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                  </svg>
                  <h3 className="font-bold text-gray-900">Filters</h3>
                  {activeFilterCount > 0 && (
                    <span className="w-5 h-5 bg-gray-900 text-white text-xs rounded-full flex items-center justify-center font-bold">
                      {activeFilterCount}
                    </span>
                  )}
                </div>
                {activeFilterCount > 0 && (
                  <button onClick={clearFilters} className="text-xs text-gray-500 hover:text-gray-900 font-medium transition-colors">
                    Clear all
                  </button>
                )}
              </div>

              {/* Price Range */}
              <div className="mb-6 pb-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold text-gray-800">Price per night</h4>
                  <span className="text-sm font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded-lg">
                    {currency}{priceRange[1]}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full accent-gray-900 h-1.5"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>{currency}0</span>
                  <span>{currency}1000+</span>
                </div>
              </div>

              {/* Room Type */}
              <div className="mb-6 pb-6 border-b border-gray-100">
                <h4 className="text-sm font-semibold text-gray-800 mb-4">Room Type</h4>
                <div className="space-y-2.5">
                  {roomTypes.map((type) => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                        selectedRoomTypes.includes(type)
                          ? "bg-gray-900 border-gray-900"
                          : "border-gray-300 group-hover:border-gray-500"
                      }`}>
                        {selectedRoomTypes.includes(type) && (
                          <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={selectedRoomTypes.includes(type)}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedRoomTypes([...selectedRoomTypes, type]);
                          else setSelectedRoomTypes(selectedRoomTypes.filter((t) => t !== type));
                        }}
                      />
                      <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-4">Amenities</h4>
                <div className="space-y-2.5">
                  {amenities.map((amenity) => (
                    <label key={amenity} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                        selectedAmenities.includes(amenity)
                          ? "bg-gray-900 border-gray-900"
                          : "border-gray-300 group-hover:border-gray-500"
                      }`}>
                        {selectedAmenities.includes(amenity) && (
                          <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={selectedAmenities.includes(amenity)}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedAmenities([...selectedAmenities, amenity]);
                          else setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
                        }}
                      />
                      <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* ── Results ── */}
          <div className="flex-1 min-w-0">
            {/* Results Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {filteredRooms.length} {filteredRooms.length === 1 ? "Property" : "Properties"} Found
                </h2>
                {destination && (
                  <p className="text-sm text-gray-500 mt-0.5">
                    Results for "<span className="font-medium text-gray-700">{destination}</span>"
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 outline-none focus:border-gray-400 transition-colors shadow-sm"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low → High</option>
                  <option value="price-high">Price: High → Low</option>
                  <option value="rating">Top Rated</option>
                </select>

                {/* View Toggle */}
                <div className="flex items-center bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
                  <button
                    onClick={() => setViewMode("grid")}
                    title="Grid view"
                    className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-gray-900 text-white shadow-sm" : "text-gray-400 hover:text-gray-700"}`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    title="List view"
                    className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-gray-900 text-white shadow-sm" : "text-gray-400 hover:text-gray-700"}`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Active filter chips */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {priceRange[1] < 1000 && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-full">
                    Up to {currency}{priceRange[1]}
                    <button onClick={() => setPriceRange([0, 1000])} className="hover:text-gray-300">×</button>
                  </span>
                )}
                {selectedRoomTypes.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-full">
                    {t}
                    <button onClick={() => setSelectedRoomTypes(selectedRoomTypes.filter(x => x !== t))} className="hover:text-gray-300">×</button>
                  </span>
                ))}
                {selectedAmenities.map((a) => (
                  <span key={a} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-full">
                    {a}
                    <button onClick={() => setSelectedAmenities(selectedAmenities.filter(x => x !== a))} className="hover:text-gray-300">×</button>
                  </span>
                ))}
              </div>
            )}

            {/* Cards */}
            {filteredRooms.length > 0 ? (
              <div className={viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                : "flex flex-col gap-5"
              }>
                {filteredRooms.map((room) =>
                  viewMode === "grid"
                    ? <SearchRoomCard key={room._id} room={room} onQuickView={(r) => { setSelectedRoom(r); setShowQuickView(true); }} />
                    : <HotelRoomCard key={room._id} room={room} onQuickView={(r) => { setSelectedRoom(r); setShowQuickView(true); }} />
                )}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl mx-auto mb-5 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">
                  Try adjusting your search or clearing some filters
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showQuickView && selectedRoom && (
        <RoomQuickViewModal
          room={selectedRoom}
          isOpen={showQuickView}
          onClose={() => { setShowQuickView(false); setSelectedRoom(null); }}
        />
      )}
    </div>
  );
};

export default Search;
