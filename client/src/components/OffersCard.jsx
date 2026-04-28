import React from "react";

const OffersCard = ({ offer }) => {
  return (
  <div className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer">

  {/* Image */}
  <img
    src={offer.image}
    alt={offer.title}
    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-all duration-500 group-hover:from-black/90" />

  {/* Content */}
  <div className="absolute bottom-0 p-6 text-white w-full transform transition-all duration-500 group-hover:translate-y-[-6px]">

    {/* Discount */}
    <span className="inline-block mb-3 text-xs font-semibold bg-white/20 backdrop-blur px-3 py-1 rounded-full">
      {offer.priceOff}% OFF
    </span>

    {/* Title */}
    <h3 className="text-2xl font-bold leading-tight">
      {offer.title}
    </h3>

    {/* Description */}
    <p className="text-sm text-white/80 mt-2 line-clamp-2 opacity-0 group-hover:opacity-100 transition duration-500">
      {offer.description}
    </p>

    {/* Extra info (hidden → show on hover) */}
    <div className="mt-3 text-xs text-white/70 opacity-0 group-hover:opacity-100 transition duration-500">
      Expires {offer.expiryDate}
    </div>

  </div>

</div>
  );
};

export default OffersCard;
