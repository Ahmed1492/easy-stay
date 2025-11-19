import React from "react";
import HotelRoomCard from "./HotelRoomCard";
import { roomsDummyData } from "../assets/assets";

const HetelRooms = () => {
  return (
    <div>
      <h2 className="font-playfair font-medium text-4xl mt-20">Hotel Rooms </h2>
      <p className="max-w-2xl mt-4 text-gray-500">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae,
        laborum cupiditate! Iure dolorem, natus laudantium ipsa debitis quis.
      </p>
      <div className="flex flex-col">
        {roomsDummyData.map((room, index) => (
          <React.Fragment key={index}>
            <HotelRoomCard room={room} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default HetelRooms;
