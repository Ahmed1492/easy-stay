import React, { useEffect, useMemo, useState } from "react";
import HetelRooms from "../components/HetelRooms";
import FiltersHotelRooms from "../components/FiltersHotelRooms";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const AllRooms = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { navigate, backEndUrl, fetchRooms, rooms } = useAppContext();

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

  // sortRooms is passed to .sort() to order the filtered rooms array
  // It decides which room comes first based on selectedSort (price or newest)
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

  // filter Destionation
  const filterDestination = (room) => {
    const destination = searchParams.get("destination");
    if (!destination) return true;
    return room.hotel.city.toLowerCase().includes(destination.toLowerCase());
  };

  // filter rooms based on selected option (room type , price range , sort by)
  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const filteredRooms = useMemo(() => {
    return rooms
      .filter(
        (room) =>
          matchesRoomType(room) &&
          matchesPriceRnage(room) &&
          filterDestination(room),
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
    <div className="mt-20 px-4 md:px-16 lg:px-24 xl:px-32 min-h-[90vh] w-full">
      <div className="grid grid-1 lg:grid-cols-2   gap-7 w-full">
        <HetelRooms
          matchesRoomType={matchesRoomType}
          matchesPriceRnage={matchesPriceRnage}
          rooms={filteredRooms}
        />

        <FiltersHotelRooms
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
          handleFilterChange={handleFilterChange}
          handleSelectedSort={handleSelectedSort}
          clearAllFilters={clearAllFilters}
          className="order-1 lg:order-1"
        />
      </div>
    </div>
  );
};

export default AllRooms;
