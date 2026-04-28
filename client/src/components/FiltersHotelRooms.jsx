import React from "react";

const FiltersHotelRooms = ({
  selectedFilters,
  selectedSort,
  handleFilterChange,
  handleSelectedSort,
  clearAllFilters,
}) => {
  const roomTypes = [
    { id: "single-bed", label: "Single Bed" },
    { id: "double-bed", label: "Double Bed" },
    { id: "luxury-room", label: "Luxury Room" },
    { id: "family-suite", label: "Family Suite" },
  ];

  const priceRanges = [
    { id: "0-500", label: "0 to 500" },
    { id: "500-1000", label: "500 to 1000" },
    { id: "1000-2000", label: "1000 to 2000" },
    { id: "2000-3000", label: "2000 to 3000" },
  ];

  const sortOptions = [
    { id: "low-high", label: "Price Low to High" },
    { id: "high-low", label: "Price High to Low" },
    { id: "newest", label: "Newest First" },
  ];

  return (
    <div className="flex justify-end w-full mb-10 lg:mb-0 lg:sticky lg:top-24 h-max">
      <div className="bg-white border border-gray-200 w-full lg:w-[70%] xl:w-[50%] rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-slate-700 p-6 flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">Filters</h3>
          </div>
          <button
            onClick={clearAllFilters}
            className="text-white text-sm font-semibold px-4 py-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all"
          >
            Clear All
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Room Types */}
          <div>
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Room Type
            </h4>
            <div className="space-y-3">
              {roomTypes.map((room) => (
                <label
                  key={room.id}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      id={room.id}
                      checked={selectedFilters.roomType.includes(room.label)}
                      onChange={(e) =>
                        handleFilterChange(e.target.checked, room, "roomType")
                      }
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    />
                  </div>
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                    {room.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Price Range */}
          <div>
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
              Price Range
            </h4>
            <div className="space-y-3">
              {priceRanges.map((price) => (
                <label
                  key={price.id}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      id={price.id}
                      onChange={(e) =>
                        handleFilterChange(e.target.checked, price, "priceRange")
                      }
                      checked={selectedFilters.priceRange.includes(price.label)}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    />
                  </div>
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                    ${price.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Sort By */}
          <div>
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
              </svg>
              Sort By
            </h4>
            <div className="space-y-3">
              {sortOptions.map((sort) => (
                <label
                  key={sort.id}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div className="relative">
                    <input
                      type="radio"
                      id={sort.id}
                      name="sort"
                      checked={selectedSort.includes(sort.label)}
                      onChange={(e) => handleSelectedSort(sort, e.target.value)}
                      className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    />
                  </div>
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                    {sort.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersHotelRooms;
