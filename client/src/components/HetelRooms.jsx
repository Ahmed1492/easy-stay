import React from "react";
import HotelRoomCard from "./HotelRoomCard";
import { roomsDummyData } from "../assets/assets";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const HetelRooms = ({ matchesRoomType, matchesPriceRnage  , rooms}) => {
  const { navigate, backEndUrl,  fetchRooms } = useAppContext();

  return (
    <div className="">
      <h2 className="font-playfair font-medium text-4xl mt-20">Hotel Rooms </h2>
      <p className="max-w-2xl mt-4 text-gray-500">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae,
        laborum cupiditate! Iure dolorem, natus laudantium ipsa debitis quis.
      </p>
      <div className="flex flex-col">
        {rooms.map((room, index) => {
            return (
              <React.Fragment key={index}>
                <HotelRoomCard room={room} />
              </React.Fragment>
            );
        })}
      </div>
    </div>
  );
};

export default HetelRooms;
