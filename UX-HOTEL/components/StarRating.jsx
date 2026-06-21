import React from "react";
import { assets, testimonials } from "../assets/assets";

const StarRating = () => {
  return (
    <div className="flex items-center gap-1">
      {Array(4)
        .fill("")
        .map((_, index) => (
          <img key={index} className="w-4" src={assets.starIconFilled} alt="" />
        ))}
      <img className="w-4" src={assets.starIconOutlined} alt="" />
    </div>
  );
};

export default StarRating;
