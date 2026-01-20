import { assets, hotelDummyData, roomsDummyData } from "../assets/assets";
import { Link } from "react-router-dom";
const HotelCard = ({ room, index }) => {
  console.log(room);

  return (
    <Link
      onClick={() => scrollTo(0, 0)}
      to={`/room/${room._id}`}
      className="flex flex-col rounded-md gap-2 shadow pb-5 relative w-full"
    >
      {index % 2 == 0 && (
        <span className="absolute bg-white px-4 py-1.5 rounded-full text-gray-900 top-4 left-4 text-sm font-medium">
          Best Seller
        </span>
      )}
      <img
        className="w-full h-[13rem] xl:h-[15rem] object-cover rounded-t-md"
        src={room.images[0]}
        alt=""
      />
      <div className="flex items-center justify-between px-4">
        <p className="font-playfair text-2xl text-gray-800">
          {room?.hotel?.name}
        </p>
        <div className="flex items-center gap-1">
          <img className="w-4" src={assets.starIconFilled} alt="" />
          <span className="text-gray-600">4.5</span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-gray-500 text-sm px-4 ">
        <img className="w-4" src={assets.locationIcon} alt="" />
        <p>{room?.hotel?.address}</p>
      </div>

      <div className="flex items-center justify-between px-4">
        <p className="text-gray-400">
          <span className="text-xl text-black font-semi-bold">
            ${room.pricePerNight}
          </span>
          /night
        </p>
        <button className="cursor-pointer border border-gray-200 px-5 py-1.5 rounded-md hover:bg-gray-100 transition-all duration-500 text-gray-600 font-medium">
          Book Now
        </button>
      </div>
    </Link>
  );
};

export default HotelCard;
