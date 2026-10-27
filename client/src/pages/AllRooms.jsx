import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowUpDown,
  BedDouble,
  ChevronRight,
  LayoutGrid,
  List,
  MapPin,
  Search,
  SlidersHorizontal,
  Tag,
  X,
} from "lucide-react";
import HetelRooms from "../components/HetelRooms";
import FiltersHotelRooms, {
  DEFAULT_ROOM_TYPES,
  PRICE_RANGES,
} from "../components/FiltersHotelRooms";
import { useAppContext } from "../context/AppContext";
import { RoomCardSkeleton } from "../components/SkeletonLoader";

const SORT_OPTIONS = [
  { id: "", label: "Recommended" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "newest", label: "Newest First" },
];

const EMPTY_FILTERS = { roomType: [], priceRange: [], amenities: [] };

const matchesPrice = (room, rangeId) => {
  const range = PRICE_RANGES.find((r) => r.id === rangeId);
  return range && room.pricePerNight >= range.min && room.pricePerNight <= range.max;
};

const sortRooms = (sort) => (a, b) => {
  if (sort === "price-asc") return a.pricePerNight - b.pricePerNight;
  if (sort === "price-desc") return b.pricePerNight - a.pricePerNight;
  if (sort === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
  return 0;
};

const AllRooms = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { rooms, roomsLoading, currency } = useAppContext();

  const [selectedFilters, setSelectedFilters] = useState(EMPTY_FILTERS);
  const [selectedSort, setSelectedSort] = useState("");
  const [viewMode, setViewMode] = useState("list");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const destination = searchParams.get("destination") || "";
  const [destinationInput, setDestinationInput] = useState(destination);

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

  const clearAllFilters = () => {
    setSelectedFilters(EMPTY_FILTERS);
    setSelectedSort("");
    setDestinationInput("");
    setSearchParams({});
  };

  const handleDestinationSubmit = (e) => {
    e.preventDefault();
    const value = destinationInput.trim();
    setSearchParams(value ? { destination: value } : {});
  };

  const roomTypes = useMemo(
    () => [...new Set([...DEFAULT_ROOM_TYPES, ...rooms.map((r) => r.roomType)])],
    [rooms]
  );

  const amenities = useMemo(
    () => [...new Set(rooms.flatMap((r) => r.amenities || []))].sort(),
    [rooms]
  );

  // Rooms in the searched destination, before sidebar filters
  const destinationRooms = useMemo(() => {
    if (!destination) return rooms;
    const query = destination.toLowerCase();
    return rooms.filter((room) => room.hotel?.city?.toLowerCase().includes(query));
  }, [rooms, destination]);

  const filteredRooms = useMemo(() => {
    const { roomType, priceRange, amenities } = selectedFilters;
    return destinationRooms
      .filter(
        (room) =>
          (roomType.length === 0 || roomType.includes(room.roomType)) &&
          (priceRange.length === 0 || priceRange.some((id) => matchesPrice(room, id))) &&
          amenities.every((a) => room.amenities?.includes(a))
      )
      .sort(sortRooms(selectedSort));
  }, [destinationRooms, selectedFilters, selectedSort]);

  // How many rooms each option would match on its own
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

  const stats = useMemo(() => {
    const cities = new Set(rooms.map((r) => r.hotel?.city).filter(Boolean));
    const minPrice = rooms.length
      ? Math.min(...rooms.map((r) => r.pricePerNight))
      : 0;
    return { cities: cities.size, minPrice };
  }, [rooms]);

  const activeChips = [
    ...(destination
      ? [{ key: "destination", label: destination, icon: MapPin, onRemove: () => {
          setDestinationInput("");
          setSearchParams({});
        } }]
      : []),
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

  const activeFilterCount =
    selectedFilters.roomType.length +
    selectedFilters.priceRange.length +
    selectedFilters.amenities.length;

  const filtersProps = {
    selectedFilters,
    toggleFilter,
    clearAllFilters,
    roomTypes,
    amenities,
    counts,
    activeFilterCount,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-900 pt-28 md:pt-32 pb-24 px-4 md:px-16 lg:px-24 xl:px-32">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 right-0 w-[28rem] h-[28rem] bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-gray-400 mb-6">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Hotels</span>
          </nav>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-playfair mb-4 animate-fade-in">
            Find Your Perfect Stay
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mb-8">
            Browse our curated selection of hotels and exclusive rooms, then
            filter by type, price and amenities.
          </p>

          {/* Destination search */}
          <form
            onSubmit={handleDestinationSubmit}
            className="flex items-center gap-2 bg-white rounded-2xl p-2 shadow-2xl max-w-xl"
          >
            <MapPin className="w-5 h-5 text-gray-400 ml-2 shrink-0" />
            <input
              value={destinationInput}
              onChange={(e) => setDestinationInput(e.target.value)}
              placeholder="Where are you going?"
              className="flex-1 min-w-0 py-2 text-gray-800 placeholder:text-gray-400 outline-none bg-transparent"
            />
            <button
              type="submit"
              className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-4 md:px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </form>

          {/* Quick stats */}
          {!roomsLoading && rooms.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-6">
              {[
                { label: `${rooms.length} rooms`, icon: BedDouble },
                { label: `${stats.cities} ${stats.cities === 1 ? "city" : "cities"}`, icon: MapPin },
                { label: `From ${currency}${stats.minPrice}/night`, icon: Tag },
              ].map(({ label, icon: Icon }) => (
                <span
                  key={label}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-sm text-gray-200"
                >
                  <Icon className="w-4 h-4 text-amber-300" />
                  {label}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="relative px-4 md:px-16 lg:px-24 xl:px-32 -mt-12 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Filters Sidebar (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <FiltersHotelRooms {...filtersProps} />
            </div>
          </aside>

          <div className="min-w-0">
            {/* Toolbar */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    {roomsLoading
                      ? "Loading rooms…"
                      : `${filteredRooms.length} ${filteredRooms.length === 1 ? "stay" : "stays"} found`}
                  </h2>
                  {!roomsLoading && destination && (
                    <p className="text-sm text-gray-500">in “{destination}”</p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* Mobile filters button */}
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

                  {/* Sort */}
                  <label className="relative flex items-center">
                    <ArrowUpDown className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
                    <select
                      value={selectedSort}
                      onChange={(e) => setSelectedSort(e.target.value)}
                      aria-label="Sort rooms"
                      className="appearance-none pl-9 pr-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 outline-none focus:ring-2 focus:ring-gray-900/10 cursor-pointer"
                    >
                      {SORT_OPTIONS.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  {/* View toggle */}
                  <div className="hidden sm:flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                    {[
                      { id: "list", icon: List, label: "List view" },
                      { id: "grid", icon: LayoutGrid, label: "Grid view" },
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

              {/* Active filter chips */}
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
                    onClick={clearAllFilters}
                    className="text-xs font-semibold text-gray-500 hover:text-gray-900 underline underline-offset-2 cursor-pointer"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>

            {/* Results */}
            {roomsLoading ? (
              <div className="space-y-6">
                {Array.from({ length: 3 }, (_, index) => (
                  <RoomCardSkeleton key={index} />
                ))}
              </div>
            ) : (
              <HetelRooms
                rooms={filteredRooms}
                viewMode={viewMode}
                onClearFilters={clearAllFilters}
              />
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
        <div className="flex items-center justify-between px-5 pt-4 pb-3">
          <div className="w-10 h-1 rounded-full bg-gray-300 absolute left-1/2 -translate-x-1/2 top-2" />
          <h3 className="text-lg font-bold text-gray-900">Filters</h3>
          <button
            onClick={() => setShowMobileFilters(false)}
            aria-label="Close filters"
            className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4">
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
    </div>
  );
};

export default AllRooms;
