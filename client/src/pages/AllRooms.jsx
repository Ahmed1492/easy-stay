import React, { useEffect, useMemo, useState } from "react";
import HetelRooms from "../components/HetelRooms";
import FiltersHotelRooms from "../components/FiltersHotelRooms";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { RoomCardSkeleton } from "../components/SkeletonLoader";

const AllRooms = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { rooms } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  const [selectedFilters, setSelectedFilters] = useState({
    roomType: [],
    priceRange: [],
  });

  const [selectedSort, setSelectedSort] = useState("");

  useEffect(() => {
    // Simulate loading
    if (rooms && rooms.length > 0) {
      setTimeout(() => setIsLoading(false), 500);
    }
  }, [rooms]);

  // Store value of selected filters: Room Type, Price Range
  const handleFilterChange = (isChecked, value, type) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: isChecked
        ? [...prev[type], value.label]
        : prev[type].filter((item) => item !== value.label),
    }));
  };

  // Store value of selected filters: Sort By
  const handleSelectedSort = (sort, value) => {
    setSelectedSort(sort.label);
  };

  // Check room matches room type
  const matchesRoomType = (room) => {
    return (
      selectedFilters.roomType.length === 0 ||
      selectedFilters.roomType.includes(room.roomType)
    );
  };

  // Check room matches price range
  const matchesPriceRange = (room) => {
    return (
      selectedFilters.priceRange.length === 0 ||
      selectedFilters.priceRange.some((range) => {
        const [min, max] = range.split(" to ").map(Number);
        return room.pricePerNight >= min && room.pricePerNight <= max;
      })
    );
  };

  // Sort rooms based on selected option
  const sortRooms = (a, b) => {
    if (selectedSort === "Price Low to High") {
      return a.pricePerNight - b.pricePerNight;
    }
    if (selectedSort === "Price High to Low") {
      return b.pricePerNight - a.pricePerNight;
    }
    if (selectedSort === "Newest First") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  };

  // Filter destination
  const filterDestination = (room) => {
    const destination = searchParams.get("destination");
    if (!destination) return true;
    return room.hotel.city.toLowerCase().includes(destination.toLowerCase());
  };

  // Filter rooms based on selected options
  const filteredRooms = useMemo(() => {
    return rooms
      .filter(
        (room) =>
          matchesRoomType(room) &&
          matchesPriceRange(room) &&
          filterDestination(room)
      )
      .sort(sortRooms);
  }, [rooms, selectedFilters, searchParams, selectedSort]);

  const clearAllFilters = () => {
    setSelectedFilters({
      roomType: [],
      priceRange: [],
    });
    setSelectedSort("");
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-32 pb-16 px-6 md:px-16 lg:px-24 xl:px-32">
        <div className="max-w-7xl mx-auto">
          <div className="inline-block px-4 py-1 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-semibold mb-4">
            ✨ Explore Our Collection
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-playfair mb-4">
            Find Your Perfect Stay
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl">
            Browse through our curated selection of luxury hotels and exclusive accommodations
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
          {/* Rooms List - Takes 2 columns */}
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="space-y-6 mt-20">
                <div className="skeleton skeleton-title w-1/3"></div>
                <div className="skeleton skeleton-text w-2/3"></div>
                {Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <RoomCardSkeleton key={index} />
                  ))}
              </div>
            ) : (
              <HetelRooms rooms={filteredRooms} />
            )}
          </div>

          {/* Filters Sidebar - Takes 1 column */}
          <div className="lg:col-span-1">
            <FiltersHotelRooms
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
              selectedSort={selectedSort}
              setSelectedSort={setSelectedSort}
              handleFilterChange={handleFilterChange}
              handleSelectedSort={handleSelectedSort}
              clearAllFilters={clearAllFilters}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
