import React from "react";
import OffersCard from "./OffersCard";
import { exclusiveOffers } from "../assets/assets";

const ExclusiveOffers = () => {
  return (
    <div className="  mt-20">
      <div className="flex items-center flex-wrap gap-y-7 justify-center  sm:justify-between  ">
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
