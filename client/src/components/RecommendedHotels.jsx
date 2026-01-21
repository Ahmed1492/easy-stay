import React, { useEffect, useState } from "react";
import HotelCard from "./HotelCard";
import { roomsDummyData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";
const RecommendedHotels = () => {
  const [recommended, setrecommended] = useState([]);

  const { navigate, backEndUrl, rooms, searchCities, getToken } =
    useAppContext();

  const recommendedHotels = {
    title: "Recommended Hotels",
    desc: "Ladipisicing consectetur adipisicing elit. Nesciunt repellendus dolorum nam! Nobis, corporis.adipisicing adipisicing",
    style: "items-center justify-center text-center",
  };

  const filterRooms = (rooms, arr) => {
    return rooms.filter((room) => arr.includes(room.hotel.city)).slice(0, 4);
  };
  const getRecentSearchCities = async () => {
    try {
      const myResponse = await axios.get(
        `${backEndUrl}/api/user/recent-search`,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            "ngrok-skip-browser-warning": "true",
          },
        },
      );
      console.log(myResponse.data);

      setrecommended(myResponse?.data?.recentSearchedCities || []);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!rooms?.length || !recommended?.length) return;

    filterRooms(rooms, recommended);
    // console.log("filtered rooms:", filtered);
  }, [rooms, recommended]);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getRecentSearchCities();
    // console.log(rooms);
  }, [searchCities]);

  if (filterRooms(rooms, recommended).length === 0) return null;
  return (
    <>
      <div
        className={`flex flex-col gap-4  ${recommendedHotels?.style} mt-28 `}
      >
        <h2 className="text-5xl  font-playfair">{recommendedHotels?.title}</h2>
        <p className="max-w-2xl text-gray-700 ">{recommendedHotels?.desc}</p>
      </div>
      <div className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-7 mt-14">
          {filterRooms(rooms, recommended).map((room, index) => (
            <HotelCard key={room._id} room={room} index={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecommendedHotels;
