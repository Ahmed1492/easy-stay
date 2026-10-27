import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowUpDown,
  BedDouble,
  CalendarDays,
  ChevronRight,
  LayoutGrid,
  List,
  MapPin,
  Moon,
  Search as SearchIcon,
  SlidersHorizontal,
  Tag,
  Users,
  X,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";
import SearchRoomCard from "../components/SearchRoomCard";
import HotelRoomCard from "../components/HotelRoomCard";
import RoomQuickViewModal from "../components/RoomQuickViewModal";
import FiltersHotelRooms, {
  DEFAULT_ROOM_TYPES,
  PRICE_RANGES,
} from "../components/FiltersHotelRooms";
import { CardSkeleton } from "../components/SkeletonLoader";

const EMPTY_FILTERS = { roomType: [], priceRange: [], amenities: [] };

const SORT_OPTIONS = [
  { id: "recommended", label: "Recommended" },
  { id: "price-low", label: "Price: Low to High" },
  { id: "price-high", label: "Price: High to Low" },
  { id: "newest", label: "Newest First" },
];

const matchesPrice = (room, rangeId) => {
  const range = PRICE_RANGES.find((r) => r.id === rangeId);
  return range && room.pricePerNight >= range.min && room.pricePerNight <= range.max;
};

const formatDate = (value) =>
  new Date(`${value}T00:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric" });

const todayISO = () => new Date().toISOString().split("T")[0];

const Field = ({ icon: Icon, label, children }) => (
  <label className="group flex items-center gap-3 px-5 py-4 cursor-text hover:bg-gray-50 transition-colors">
    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 text-gray-600 group-focus-within:bg-gray-900 group-focus-within:text-white transition-colors shrink-0">
      <Icon className="w-5 h-5" />
    </span>
    <span className="flex-1 min-w-0">
      <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
        {label}
      </span>
      {children}
    </span>
  </label>
);

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { rooms, roomsLoading, currency } = useAppContext();

  const [destination, setDestination] = useState(searchParams.get("destination") || "");
  const [checkIn, setCheckIn] = useState(searchParams.get("checkIn") || "");
  const [checkOut, setCheckOut] = useState(searchParams.get("checkOut") || "");
  const [guests, setGuests] = useState(searchParams.get("guests") || "1");

  const [selectedFilters, setSelectedFilters] = useState(EMPTY_FILTERS);
  const [sortBy, setSortBy] = useState("recommended");
  const [viewMode, setViewMode] = useState("grid");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showQuickView, setShowQuickView] = useState(false);
  const openQuickView = (room) => {
    setSelectedRoom(room);
    setShowQuickView(true);
  };

  // Lock page scroll while the mobile filter drawer is open
  useEffect(() => {
    if (!showMobileFilters) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showMobileFilters]);

  const toggleFilter = (type, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }));
  };

  const handleSearch = (e) => {
    e?.preventDefault();
    const params = {};
    if (destination.trim()) params.destination = destination.trim();
    if (checkIn) params.checkIn = checkIn;
    if (checkOut) params.checkOut = checkOut;
    if (guests) params.guests = guests;
    setSearchParams(params);
  };

  const handleCheckIn = (value) => {
    setCheckIn(value);
    // Keep check-out after check-in
    if (checkOut && value && checkOut <= value) setCheckOut("");
  };

  const searchDestination = (city) => {
    setDestination(city);
    const params = { destination: city };
    if (checkIn) params.checkIn = checkIn;
    if (checkOut) params.checkOut = checkOut;
    if (guests) params.guests = guests;
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSelectedFilters(EMPTY_FILTERS);
    setSortBy("recommended");
  };

  const clearAll = () => {
    clearFilters();
    setDestination("");
    setCheckIn("");
    setCheckOut("");
    setGuests("1");
    setSearchParams({});
  };

  const query = destination.trim().toLowerCase();

  // Rooms matching the typed destination, before sidebar filters
  const destinationRooms = useMemo(() => {
    if (!query) return rooms;
    return rooms.filter((room) =>
      [room.hotel?.city, room.hotel?.name, room.hotel?.address].some((field) =>
        field?.toLowerCase().includes(query)
      )
    );
  }, [rooms, query]);

  const filteredRooms = useMemo(() => {
    const { roomType, priceRange, amenities } = selectedFilters;
    return destinationRooms
      .filter(
        (room) =>
          (roomType.length === 0 || roomType.includes(room.roomType)) &&
          (priceRange.length === 0 || priceRange.some((id) => matchesPrice(room, id))) &&
          amenities.every((a) => room.amenities?.includes(a))
      )
      .sort((a, b) => {
        if (sortBy === "price-low") return a.pricePerNight - b.pricePerNight;
        if (sortBy === "price-high") return b.pricePerNight - a.pricePerNight;
        if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
        return 0;
      });
  }, [destinationRooms, selectedFilters, sortBy]);

  const roomTypes = useMemo(
    () => [...new Set([...DEFAULT_ROOM_TYPES, ...rooms.map((r) => r.roomType)])],
    [rooms]
  );
  const amenities = useMemo(
    () => [...new Set(rooms.flatMap((r) => r.amenities || []))].sort(),
    [rooms]
  );
  const popularCities = useMemo(() => {
    const tally = {};
    rooms.forEach((r) => {
      const city = r.hotel?.city;
      if (city) tally[city] = (tally[city] || 0) + 1;
    });
    return Object.entries(tally)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([city]) => city);
  }, [rooms]);

  const counts = useMemo(() => {
    const result = { roomType: {}, priceRange: {}, amenities: {} };
    destinationRooms.forEach((room) => {
      result.roomType[room.roomType] = (result.roomType[room.roomType] || 0) + 1;
      PRICE_RANGES.forEach((range) => {
        if (matchesPrice(room, range.id)) {
          result.priceRange[range.id] = (result.priceRange[range.id] || 0) + 1;
        }
      });
      (room.amenities || []).forEach((a) => {
        result.amenities[a] = (result.amenities[a] || 0) + 1;
      });
    });
    return result;
  }, [destinationRooms]);

  const activeFilterCount =
    selectedFilters.roomType.length +
    selectedFilters.priceRange.length +
    selectedFilters.amenities.length;

  const nights =
    checkIn && checkOut
      ? Math.max(0, Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000))
      : 0;

  const activeChips = [
    ...selectedFilters.roomType.map((value) => ({
      key: `type-${value}`,
      label: value,
      icon: BedDouble,
      onRemove: () => toggleFilter("roomType", value),
    })),
    ...selectedFilters.priceRange.map((id) => ({
      key: `price-${id}`,
      label: PRICE_RANGES.find((r) => r.id === id)?.label(currency),
      icon: Tag,
      onRemove: () => toggleFilter("priceRange", id),
    })),
    ...selectedFilters.amenities.map((value) => ({
      key: `amenity-${value}`,
      label: value,
      onRemove: () => toggleFilter("amenities", value),
    })),
  ];

  const filtersProps = {
    selectedFilters,
    toggleFilter,
    clearAllFilters: clearFilters,
    roomTypes,
    amenities,
    counts,
    activeFilterCount,
  };

  const inputClass =
    "w-full text-gray-900 font-semibold placeholder:text-gray-300 placeholder:font-normal bg-transparent outline-none text-sm";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Hero / Search Bar ── */}
      <section className="relative overflow-hidden bg-gray-900 pt-28 pb-24 px-4 md:px-16 lg:px-24 xl:px-32">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 right-0 w-[28rem] h-[28rem] bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto">
          <nav className="flex items-center gap-1.5 text-sm text-gray-400 mb-6">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Search</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 font-playfair leading-tight">
            Find Your Perfect Stay
          </h1>
          <p className="text-gray-400 mb-8">
            Search {rooms.length > 0 ? `${rooms.length} rooms` : "rooms"} by destination, dates and guests
          </p>

          {/* Search Card */}
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_0.8fr_auto] divide-y md:divide-y-0 lg:divide-x divide-gray-100">
              <Field icon={MapPin} label="Destination">
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="City, hotel or area"
                  className={inputClass}
                />
              </Field>

              <Field icon={CalendarDays} label="Check-in">
                <input
                  type="date"
                  value={checkIn}
                  min={todayISO()}
                  onChange={(e) => handleCheckIn(e.target.value)}
                  className={inputClass}
                />
              </Field>

              <Field icon={CalendarDays} label="Check-out">
                <input
                  type="date"
                  value={checkOut}
                  min={checkIn || todayISO()}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className={inputClass}
                />
              </Field>

              <Field icon={Users} label="Guests">
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className={`${inputClass} appearance-none cursor-pointer`}
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </Field>

              <div className="p-3 md:col-span-2 lg:col-span-1 flex">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white px-8 py-3.5 rounded-xl font-semibold transition-colors text-sm cursor-pointer"
                >
                  <SearchIcon className="w-4 h-4" />
                  Search
                </button>
              </div>
            </div>
          </form>

          {/* Popular destinations */}
          {popularCities.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-5">
              <span className="text-sm text-gray-400 mr-1">Popular:</span>
              {popularCities.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => searchDestination(city)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-sm transition-colors cursor-pointer ${
                    query === city.toLowerCase()
                      ? "bg-white text-gray-900 border-white"
                      : "bg-white/10 text-gray-200 border-white/10 hover:bg-white/20"
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="relative px-4 md:px-16 lg:px-24 xl:px-32 -mt-8 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar (desktop) */}
          <aside className="hidden lg:block pt-16">
            <div className="sticky top-24">
              <FiltersHotelRooms {...filtersProps} />
            </div>
          </aside>

          {/* Results */}
          <div className="min-w-0 pt-8 lg:pt-16">
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    {roomsLoading
                      ? "Searching…"
                      : `${filteredRooms.length} ${filteredRooms.length === 1 ? "stay" : "stays"} found`}
                  </h2>
                  {/* Search summary */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-gray-500">
                    {destination.trim() && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {destination.trim()}
                      </span>
                    )}
                    {checkIn && checkOut && (
                      <span className="flex items-center gap-1">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {formatDate(checkIn)} – {formatDate(checkOut)}
                        {nights > 0 && (
                          <span className="flex items-center gap-1 text-gray-400">
                            · <Moon className="w-3 h-3" /> {nights} {nights === 1 ? "night" : "nights"}
                          </span>
                        )}
                      </span>
                    )}
                    {guests && (
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {guests} {guests === "1" ? "guest" : "guests"}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowMobileFilters(true)}
                    className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                    {activeFilterCount > 0 && (
                      <span className="flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-gray-900 text-white text-xs">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>

                  <label className="relative flex items-center">
                    <ArrowUpDown className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      aria-label="Sort results"
                      className="appearance-none pl-9 pr-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 outline-none focus:ring-2 focus:ring-gray-900/10 cursor-pointer"
                    >
                      {SORT_OPTIONS.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div className="hidden sm:flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                    {[
                      { id: "grid", icon: LayoutGrid, label: "Grid view" },
                      { id: "list", icon: List, label: "List view" },
                    ].map(({ id, icon: Icon, label }) => (
                      <button
                        key={id}
                        onClick={() => setViewMode(id)}
                        aria-label={label}
                        title={label}
                        className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                          viewMode === id
                            ? "bg-white text-gray-900 shadow-sm"
                            : "text-gray-500 hover:text-gray-900"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {activeChips.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                  {activeChips.map(({ key, label, icon: Icon, onRemove }) => (
                    <button
                      key={key}
                      onClick={onRemove}
                      className="group flex items-center gap-1.5 pl-3 pr-2 py-1 rounded-full bg-gray-100 hover:bg-gray-900 hover:text-white text-xs font-medium text-gray-700 transition-colors cursor-pointer"
                    >
                      {Icon && <Icon className="w-3.5 h-3.5" />}
                      {label}
                      <X className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                    </button>
                  ))}
                  <button
                    onClick={clearFilters}
                    className="text-xs font-semibold text-gray-500 hover:text-gray-900 underline underline-offset-2 cursor-pointer"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>

            {/* Cards */}
            {roomsLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array.from({ length: 6 }, (_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            ) : filteredRooms.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                    : "flex flex-col gap-5"
                }
              >
                {filteredRooms.map((room, index) => (
                  <div
                    key={room._id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${Math.min(index, 8) * 60}ms`, animationFillMode: "both" }}
                  >
                    {viewMode === "grid" ? (
                      <SearchRoomCard room={room} onQuickView={openQuickView} />
                    ) : (
                      <HotelRoomCard room={room} onQuickView={openQuickView} />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-16 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <SearchIcon className="w-9 h-9 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 font-playfair mb-2">
                  No results found
                </h3>
                <p className="text-gray-500 max-w-sm mx-auto mb-6">
                  {destination.trim()
                    ? `We couldn't find stays matching “${destination.trim()}”. Try another destination or remove some filters.`
                    : "Try adjusting your search or removing some filters."}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="px-6 py-2.5 border border-gray-200 text-gray-700 hover:border-gray-900 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                    >
                      Clear Filters
                    </button>
                  )}
                  <button
                    onClick={clearAll}
                    className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-black transition-colors cursor-pointer"
                  >
                    Reset Search
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile Filters Drawer */}
      <div
        onClick={() => setShowMobileFilters(false)}
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${
          showMobileFilters ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <div
        className={`fixed inset-x-0 bottom-0 z-50 max-h-[85vh] flex flex-col bg-gray-50 rounded-t-3xl shadow-2xl lg:hidden transition-transform duration-300 ease-out ${
          showMobileFilters ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h3 className="text-lg font-bold text-gray-900">Filters</h3>
          <button
            onClick={() => setShowMobileFilters(false)}
            aria-label="Close filters"
            className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <FiltersHotelRooms {...filtersProps} />
        </div>
        <div className="p-4 border-t border-gray-200 bg-white">
          <button
            onClick={() => setShowMobileFilters(false)}
            className="w-full py-3 rounded-xl bg-gray-900 text-white font-semibold cursor-pointer"
          >
            Show {filteredRooms.length} {filteredRooms.length === 1 ? "stay" : "stays"}
          </button>
        </div>
      </div>

      <RoomQuickViewModal
        room={selectedRoom}
        isOpen={showQuickView}
        onClose={() => {
          setShowQuickView(false);
          setSelectedRoom(null);
        }}
      />
    </div>
  );
};

export default Search;
