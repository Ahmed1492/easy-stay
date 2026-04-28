import { assets } from "../assets/assets";

const HotelCard = ({ room, index, onQuickView }) => {
  const handleCardClick = (e) => {
    // If quick view is available, prevent default navigation
    if (onQuickView) {
      e.preventDefault();
      onQuickView(room);
    } else {
      // Otherwise navigate to detail page
      window.location.href = `/room/${room._id}`;
      scrollTo(0, 0);
    }
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(room);
    }
  };

  const handleBookNowClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = `/room/${room._id}`;
    scrollTo(0, 0);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group flex flex-col rounded-2xl gap-3 shadow-lg hover:shadow-2xl pb-5 relative w-full overflow-hidden bg-white transition-all duration-500 hover:-translate-y-2 cursor-pointer"
    >
      {/* Image Container with Overlay */}
      <div className="relative overflow-hidden rounded-t-2xl">
      
        
        {/* Discount Badge */}
        {/* <span className="absolute bg-green-500 px-3 py-1 rounded-full text-white top-4 right-4 text-xs font-bold z-10 shadow-lg">
          -20%
        </span> */}

        <img
          className="w-full h-[13rem] xl:h-[15rem] object-cover transition-transform duration-700 group-hover:scale-110"
          src={room.images[0]}
          alt={room?.hotel?.name}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Quick View Button */}
        {onQuickView && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
            <button 
              onClick={handleQuickViewClick}
              className="bg-white text-gray-800 px-6 py-2 rounded-full font-semibold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-gray-100"
            >
              Quick View
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-4 space-y-3">
        {/* Hotel Name and Rating */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-playfair text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors line-clamp-1">
            {room?.hotel?.name}
          </h3>
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg flex-shrink-0">
            <img className="w-4" src={assets.starIconFilled} alt="rating" />
            <span className="text-gray-800 font-semibold text-sm">4.5</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <svg className="w-4 h-4 text-gray-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <p className="line-clamp-1">{room?.hotel?.address}</p>
        </div>

        {/* Amenities */}
        <div className="flex items-center gap-3 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span>2 Beds</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span>4 Guests</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>WiFi</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100"></div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Starting from</p>
            <p className="text-gray-600">
              <span className="text-2xl text-gray-900 font-bold">
                ${room.pricePerNight}
              </span>
              <span className="text-sm">/night</span>
            </p>
          </div>
          <button 
            onClick={handleBookNowClick}
            className="group/btn bg-gray-900 hover:bg-gray-800 text-white text-sm px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 hover:shadow-lg hover:scale-105"
          >
            Book Now
            <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
