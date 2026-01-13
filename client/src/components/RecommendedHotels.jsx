import React, { useEffect, useState } from "react";
import HotelCard from "./HotelCard";
import { roomsDummyData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";
const RecommendedHotels = () => {
  const { navigate, backEndUrl, rooms, searchCities } = useAppContext();
  const [recommended, setRecommended] = useState([]);

  const filterHotels = () => {
    const filteredHotels = rooms
      ?.slice()
      ?.filter((room) => searchCities?.includes(room.hotel.city));
    setRecommended(filteredHotels);
  };
  const recommendedHotels = {
    title: "Recommended Hotels",
    desc: "Ladipisicing consectetur adipisicing elit. Nesciunt repellendus dolorum nam! Nobis, corporis.adipisicing adipisicing",
    style: "items-center justify-center text-center",
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    filterHotels();
  }, [searchCities, rooms]);
  return (
    recommended.length > 0 && (
      <>
        <div
          className={`flex flex-col gap-4  ${recommendedHotels?.style} mt-28 `}
        >
          <h2 className="text-5xl  font-playfair">
            {recommendedHotels?.title}
          </h2>
          <p className="max-w-2xl text-gray-700 ">{recommendedHotels?.desc}</p>
        </div>
        <div className="">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-7 mt-14">
            {recommended.map((room, index) => (
              <HotelCard key={room._id} room={room} index={index} />
            ))}
          </div>
        </div>
      </>
    )
  );
};

export default RecommendedHotels;
