import React, { useState } from "react";
import { assets, hotelDummyData } from "../assets/assets";
import StarRating from "./StarRating";

const RoomImages = ({ room }) => {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  return (
    <div>
      <div className="flex items-center gap-1">
        <h3 className="text-4xl   font-playfair">{room?.hotel?.name}</h3>
        <span className="font-medium text-sm self-end">({room?.roomType})</span>
        <span className="font-light ms-1 bg-orange-600 text-white px-2.5 py-1.5 rounded-full text-sm ">
          20% OFF
        </span>
      </div>
      <div className="flex items-center gap-2.5 my-2">
        <StarRating />
        <span className="font-semibold">200+ reviews</span>
      </div>
      <div className="flex items-center gap-2 text-gray-500 text-sm  mb-6 ">
        <img className="w-4" src={assets.locationIcon} alt="" />
        <p>{hotelDummyData?.address}</p>
      </div>
      <div className=" flex flex-col lg:flex-row lg:items-start gap-5 items-center justify-center lg:justify-between ">
        <div className=" w-full lg:w-[50%] xl:w-[50%]">
          <img
            className=" md:w-[99%] lg:w-[94%]  rounded-lg"
            src={room?.images?.[mainImageIndex]}
            alt=""
          />
        </div>
        <div className="w-full lg:w-[50%] xl:w-[50%] flex flex-wrap items-center justify-between gap-5">
          {room?.images?.map((img, index) => (
            <img
              onClick={() => setMainImageIndex(index)}
              key={index}
              className={`w-[44%] cursor-pointer ${
                index === mainImageIndex ? "border-3  border-amber-700" : ""
              } rounded-lg`}
              src={img}
              alt=""
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomImages;
