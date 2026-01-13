import React from "react";
import OffersCard from "./OffersCard";
import { exclusiveOffers } from "../assets/assets";

const ExclusiveOffers = () => {
  return (
    <div className="  mt-20">
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3  gap-7 mt-14">
        {exclusiveOffers.map((offer) => (
          <React.Fragment key={offer._id}>
            <OffersCard offer={offer} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ExclusiveOffers;
