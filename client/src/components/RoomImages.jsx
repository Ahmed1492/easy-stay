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
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-7 ">
        <div className=" w-full ">
          <img
            className=" w-full  rounded-lg"
            src={room?.images?.[mainImageIndex]}
            alt=""
          />
        </div>
        <div className="w-full  grid grid-cols-2 md:grid-cols-2 gap-3 ">
          {room?.images?.map((img, index) => (
            <img
              onClick={() => setMainImageIndex(index)}
              key={index}
              className={`w-full cursor-pointer ${
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
