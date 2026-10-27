import OffersCard from "./OffersCard";
import { exclusiveOffers } from "../assets/assets";

const ExclusiveOffers = () => {
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {exclusiveOffers.map((offer, index) => (
        <div
          key={offer._id}
          className="animate-slide-up"
          style={{ animationDelay: `${index * 100}ms`, animationFillMode: "both" }}
        >
          <OffersCard offer={offer} />
        </div>
      ))}
    </div>
  );
};

export default ExclusiveOffers;
