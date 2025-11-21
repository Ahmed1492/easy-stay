import React from "react";
import { facilityIcons, roomCommonData } from "../assets/assets";
import RoomCheckAvailabiltiy from "./RoomCheckAvailabiltiy";

const RoomDescription = ({ room }) => {
  return (
    <div>
      {/*  */}
      <div className="flex items-center justify-between mt-10">
        <h3 className="text-4xl   font-playfair">
          Experience Luxury Like Never Before
        </h3>

        <p className="text-black font-bold">
          <span className="text-xl  ">${room.pricePerNight}</span>
          /night
        </p>
      </div>
      {/* Amenities */}
      <div className="flex flex-wrap items-center mt-4 gap-4.5">
        {room?.amenities?.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 text-gray-500 text-sm  bg-slate-100 w-max py-2 px-4 rounded-lg  "
          >
            <img className="w-4 " src={facilityIcons?.[item]} alt="" />
            <p className="font-semibold text-black">{item} </p>
          </div>
        ))}
      </div>

      {/* Room Check Availabiltiy */}
      <div className="flex justify-center my-20">
        <RoomCheckAvailabiltiy />
      </div>

      {/* roomCommonData */}
      <div className="flex flex-col gap-6 my-10 ">
        {roomCommonData.map((item, index) => (
          <div className="flex items-start gap-2" key={index}>
            <img src={item.icon} className="w-8" alt="icon" />
            <div className="flex flex-col">
              <h3 className="text-black font-bold">{item.title}</h3>
              <p className="text-gray-700/80">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomDescription;
