import React, { useState } from "react";
import HetelRooms from "../components/HetelRooms";
import FiltersHotelRooms from "../components/FiltersHotelRooms";

const AllRooms = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    roomType: [],
    priceRange: [],
  });

  const [selectedSort, setSelectedSort] = useState("");

  // store value of selected filters : Room Type , Price Range
  const handleFilterChange = (isChecked, value, type) => {
    // console.log("isChecked ", isChecked);
    // console.log("value ", value);
    // console.log("type ", type);
    // console.log("selectedFilters ", selectedFilters);

    setSelectedFilters((prev) => ({
      ...prev,
      // [type] is how you choose roomType OR priceRange to update
      [type]: isChecked
        ? [...prev[type], value.label]
        : prev[type].filter((item) => item !== value.label),
    }));
  };

  // store value of selected filters :Sort By
  const handleSelectedSort = (sort, value) => {
    // console.log("selectedSort ", selectedSort);
    setSelectedSort(sort.label);
  };

  // check room matches room type
  const matchesRoomType = (room) => {
    return (
      selectedFilters.roomType.length === 0 ||
      selectedFilters.roomType.includes(room.roomType)
    );
  };

  // check room matches price range
  const matchesPriceRnage = (room) => {
    return (
      selectedFilters.priceRange.length === 0 ||
      // some => “Is there at least ONE item that matches?”
      selectedFilters.priceRange.some((range) => {
        const [min, max] = range.split(" to ").map(Number);
        return room.pricePerNight >= min && room.pricePerNight <= max;
      })
    );
  };

  return (
    <div className="mt-20 px-4 md:px-16 lg:px-24 xl:px-32 min-h-[90vh]">
      <div className="flex  flex-wrap-reverse lg:flex-wrap-reverse xl:flex-nowrap gap-6 justify-between">
        <HetelRooms
          matchesRoomType={matchesRoomType}
          matchesPriceRnage={matchesPriceRnage}
        />

        <FiltersHotelRooms
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
          handleFilterChange={handleFilterChange}
          handleSelectedSort={handleSelectedSort}
        />
      </div>
    </div>
  );
};

export default AllRooms;
