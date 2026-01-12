import React, { useEffect, useState } from "react";
import HotelCard from "./HotelCard";
import { roomsDummyData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";
const FeaturedDestination = () => {
  const { navigate, backEndUrl } = useAppContext();
  const [rooms, setRooms] = useState([]);
  const FetchFeaturedData = async () => {
    try {
      const myResponse = await axios.get(`${backEndUrl}/api/rooms`);
      if (myResponse.data.success) {
        setRooms(myResponse.data.rooms);
      } else {
        toast.error(myResponse.data.message);
      }
      console.log(myResponse.data);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    FetchFeaturedData();
  }, []);
  return (
    rooms.length > 0 && (
      <div className="">
        <div className="flex items-center flex-wrap  gap-y-7 justify-center  md:justify-between   mt-14">
          {rooms.slice(0, 4).map((room, index) => (
            <React.Fragment key={index}>
              <HotelCard room={room} index={index} />
            </React.Fragment>
          ))}
        </div>
        <div className="flex items-center justify-center mt-20 ">
          <button
            onClick={() => {
              navigate("/rooms");
              scroll(0, 0);
            }}
            className="cursor-pointer border border-gray-200 px-4 py-1.5  rounded-md text-gray-700 font-semibold "
          >
            View All Destinations
          </button>
        </div>
      </div>
    )
  );
};

export default FeaturedDestination;
