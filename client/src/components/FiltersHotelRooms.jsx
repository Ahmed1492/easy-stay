import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

const CheckBox = ({ label, selected = false, onChange = () => {} }) => {};

const FiltersHotelRooms = ({
  selectedFilters,
  setSelectedFilters,
  selectedSort,
  setSelectedSort,
  handleFilterChange,
  handleSelectedSort,
  clearAllFilters,
}) => {
  const { navigate, backEndUrl, rooms, fetchRooms } = useAppContext();

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
    <div className="flex  justify-end  w-full  mb-10 lg:mb-0 order-a ">
      <form className="pb-5h-max border w-full lg:w-[70%]  xl:w-[50%] h-max border-gray-300/90 rounded-md mt-17">
        {/* Header */}
        <div className="border-b border-gray-300/90 p-4 flex items-center justify-between">
          <h3 className="text-lg font-medium">FILTERS</h3>
          <span
            onClick={clearAllFilters}
            className="text-gray-600/90 text-sm cursor-pointer border-b-2 border-transparent hover:border-gray-600/90 transition-colors duration-500 hover:font-semibold"
          >
            CLEAR
          </span>
        </div>

        <div className="flex justify-between lg:block">
          {/* Room Types */}
          <div className="p-4">
            <h3 className="font-semibold mb-4">Popular Filters</h3>

            {roomTypes.map((room) => (
              <div
                key={room.id}
                className="mt-2 text-gray-600/80 flex items-center gap-2.5 cursor-pointer"
              >
                <input
                  type="checkbox"
                  id={room.id}
                  checked={selectedFilters.roomType.includes(room.label)}
                  onChange={(e) =>
                    handleFilterChange(e.target.checked, room, "roomType")
                  }
                />
                <label htmlFor={room.id}>{room.label}</label>
              </div>
            ))}
          </div>

          {/* Price Range */}
          <div className="p-4">
            <h3 className="font-semibold mb-4">Price Range</h3>

            {priceRanges.map((price) => (
              <div
                key={price.id}
                className="mt-3 text-gray-600/80 flex items-center gap-2.5 cursor-pointer"
              >
                <input
                  onChange={(e) =>
                    handleFilterChange(e.target.checked, price, "priceRange")
                  }
                  checked={selectedFilters.priceRange.includes(price.label)}
                  type="checkbox"
                  id={price.id}
                />
                <label className="text-sm" htmlFor={price.id}>
                  $ {price.label}
                </label>
              </div>
            ))}
          </div>

          {/* Sort By */}
          <div className="p-4">
            <h3 className="font-semibold mb-4">Sort By</h3>

            {sortOptions.map((sort) => (
              <div
                key={sort.id}
                className="mt-2 text-gray-600/80 flex items-center gap-2.5 cursor-pointer"
              >
                <input
                  checked={selectedSort.includes(sort.label)}
                  type="radio"
                  id={sort.id}
                  name="sort"
                  onChange={(e) => handleSelectedSort(sort, e.target.value)}
                />
                <label htmlFor={sort.id}>{sort.label}</label>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default FiltersHotelRooms;
