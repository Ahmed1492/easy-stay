import React from "react";
import HotelRoomCard from "./HotelRoomCard";
import { roomsDummyData } from "../assets/assets";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const HetelRooms = ({ matchesRoomType, matchesPriceRnage, rooms }) => {
  const { navigate, backEndUrl, fetchRooms } = useAppContext();

  return (
    <div className="order-2 lg:order-0">
      <h2 className="font-playfair font-medium text-4xl mt-20">Hotel Rooms </h2>
      <p className="max-w-2xl mt-4 text-gray-500">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae,
        laborum cupiditate! Iure dolorem, natus laudantium ipsa debitis quis.
      </p>
      <div className="flexa flex-col">
        {rooms.length !== 0 ? (
          rooms.map((room, index) => {
            return (
              <React.Fragment key={index}>
                <HotelRoomCard room={room} />
              </React.Fragment>
            );
          })
        ) : (
          <div className="mt-10">
            <div className="flex flex-col  py-10 ">
              <h3 className="text-2xl font-semibold text-gray-800">
                No rooms match your search
              </h3>

              <p className="mt-3 max-w-md text-sm text-gray-500">
                Try adjusting your filters or changing the date range to see
                more available rooms.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HetelRooms;
