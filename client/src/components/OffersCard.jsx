import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";

const OffersCard = ({ offer }) => {
  return (
    <Link
      to="/rooms"
      onClick={() => window.scrollTo(0, 0)}
      aria-label={`${offer.title}, ${offer.priceOff}% off`}
      className="group relative block h-96 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
    >
      {/* Image */}
      <img
        src={offer.image}
        alt=""
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-colors duration-500" />

      {/* Discount badge */}
      <div className="absolute top-5 left-5 flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg rotate-[-6deg] group-hover:rotate-0 transition-transform duration-300">
        <span className="text-xl font-extrabold leading-none">{offer.priceOff}%</span>
        <span className="text-[10px] font-bold tracking-widest">OFF</span>
      </div>

      {/* Expiry */}
      <span className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white text-xs font-medium">
        <Clock className="w-3.5 h-3.5 text-amber-300" />
        Ends {offer.expiryDate}
      </span>

      {/* Content */}
      <div className="absolute bottom-0 inset-x-0 p-6 text-white">
        <h3 className="text-2xl font-bold font-playfair leading-tight">{offer.title}</h3>
        <p className="text-sm text-white/80 mt-2 line-clamp-2">{offer.description}</p>
        <span className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-amber-300 group-hover:text-white transition-colors">
          Claim this offer
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
};

export default OffersCard;
