import React from "react";
import { assets, exclusiveOffers } from "../assets/assets";

const OffersCard = ({ offer }) => {
  return (
    <div className="    relative">
      <img className="w-full rounded-md" src={offer.image} alt="" />
      <div className="flex flex-col justify-around absolute top-0 bottom-0 text-white px-4 py-2">
        <span className="text-gray-800 bg-white px-4 font-medium py-1.5 rounded-full text-sm w-max">
          {offer.priceOff}% OFF
        </span>

        <div className="flex flex-col gap-2  ">
          <h3 className="text-2xl font-playfair">{offer.title}</h3>
          <p>{offer.description}</p>
          <p className="text-sm text-gray-300">Expire {offer.expiryDate}</p>
        </div>
        <button className="flex items-center gap-2.5 cursor-pointer">
          <span className="mb-1">View Offers</span>
          <img
            className="w-5 invert hover:translate-x-2 transition-all duration-300"
            src={assets.arrowIcon}
            alt=""
          />
        </button>
      </div>
    </div>
  );
};

export default OffersCard;
