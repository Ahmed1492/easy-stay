import React from "react";
import OffersCard from "./OffersCard";
import { exclusiveOffers } from "../assets/assets";

const ExclusiveOffers = () => {
  return (
    <div className="mt-20 animate-fade-in">
      {/* Section Header */}

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {exclusiveOffers.map((offer, index) => (
          <div
            key={offer._id}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <OffersCard offer={offer} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExclusiveOffers;
