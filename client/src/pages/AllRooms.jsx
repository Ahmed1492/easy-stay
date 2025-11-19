import React from "react";
import HetelRooms from "../components/HetelRooms";
import FiltersHotelRooms from "../components/FiltersHotelRooms";

const AllRooms = () => {
  return (
    <div className="mt-20 px-4 md:px-16 lg:px-24 xl:px-32">
      <div className="flex  flex-wrap-reverse lg:flex-wrap-reverse xl:flex-nowrap gap-6 justify-between">
        <HetelRooms />

        <FiltersHotelRooms />
      </div>
    </div>
  );
};

export default AllRooms;
