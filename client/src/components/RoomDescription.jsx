import React from "react";
import { assets, facilityIcons, roomCommonData } from "../assets/assets";
import RoomCheckAvailabiltiy from "./RoomCheckAvailabiltiy";
import StarRating from "./StarRating";

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

      <div className="max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500">
        <p>
          Guests will be allocated on the ground floor according to
          availability. You get a comfortable two bedroom apartment that has a
          true city feeling. The price quoted is for two guests; at the guest
          slot, please mark the number of guests to get the exact price for
          groups. The guests will be allocated ground floor according to
          availability. You get the comfortable two bedroom apartment that has a
          true city feeling.
        </p>
      </div>

      {/* Hosted by */}
      <div className="flex flex-col items-start gap-4 mb-20">
        <div className="flex gap-4">
          <img
            src={assets?.hotelLogo}
            alt="Host"
            className="h-14 w-14 md:h-18 md:w-18 rounded-full"
          />
          <div>
            <p className="text-lg md:text-xl">Hosted by {room?.hotel?.name}</p>
            <div className="flex items-center mt-1">
              <StarRating />
              <p className="ml-2">200+ reviews</p>
            </div>
          </div>
        </div>
        <button className="px-6 py-2.5 mt-4 rounded text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer">
          Contact Now
        </button>
      </div>
    </div>
  );
};

export default RoomDescription;
