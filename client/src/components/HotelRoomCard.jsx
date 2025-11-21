import React from "react";
import {
  assets,
  facilityIcons,
  hotelDummyData,
  roomsDummyData,
} from "../assets/assets";
import { Link } from "react-router-dom";

const HotelRoomCard = ({ room }) => {
  return (
    <Link to={`/room/${room._id}`} className="mt-10 flex flex-col sm:flex-row flex-wrap sm:flex-nowrap    justify-center items-center   sm:items-start gap-6 border-b border-gray-300/90 pb-10">
      <img
        className=" w-[80vw] sm:w-[50vw] md:w-[40vw]  lg:w-[30vw] xl:w-108 rounded-xl"
        src={room.images[0]}
        alt=""
      />
      <div className="flex flex-col justify-center   sm:justify-between gap-2">
        {/* Title */}
        <span className="text-gray-600/80">New York</span>
        <h3 className="text-3xl font-playfair">{hotelDummyData.name}</h3>

        {/* Reviews */}
        <div className="flex items-center gap-1">
          {Array(4)
            .fill("")
            .map((item, i) => (
              <img
                key={i}
                src={assets.starIconFilled}
                alt="starIconFilled"
                className="w-4"
              />
            ))}
          <img
            src={assets.starIconOutlined}
            alt="starIconOutlined"
            className="w-4"
          />
          <p className="ms-2 text-sm font-bold">200+ reviews</p>
        </div>

        {/* Address */}
        <div className="flex items-center gap-2 text-gray-500 text-sm  ">
          <img className="w-4" src={assets.locationIcon} alt="" />
          <p>{hotelDummyData.address}</p>
        </div>

        {/*amenities  */}
        <div className="flex flex-wrap items-center  max-w-md  gap-4.5">
          {room.amenities.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-gray-500 text-sm  bg-slate-100 w-max py-2 px-4 rounded-lg  "
            >
              <img className="w-4 " src={facilityIcons[item]} alt="" />
              <p className="font-semibold text-black">{item} </p>
            </div>
          ))}
        </div>

        {/*  price per night */}

        <div className="flex items-center justify-between px-4 font-medium mt-7 ">
          <p className="">
            <span className="text-xl text-black font-semibold">
              ${room.pricePerNight}
            </span>
            /night
          </p>
        </div>
      </div>
    </Link>
  );
};

export default HotelRoomCard;
