import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  assets,
  facilityIcons,
  hotelDummyData,
  roomsDummyData,
} from "../assets/assets";
import RoomImages from "../components/RoomImages";
import StarRating from "../components/StarRating";
import RoomDescription from "../components/RoomDescription";

const Room = () => {
  const { id } = useParams();
  const [room, setRoom] = useState({});

  const getRoom = async () => {
    let searchedRoom = await roomsDummyData.find((room) => room._id === id);
    console.log("seaerched room ", searchedRoom);

    setRoom(searchedRoom);
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getRoom();
  }, [id]);

  return (
    <div className="mt-30 px-4 md:px-16 lg:px-24 xl:px-32 ">
      <RoomImages room={room} />
      <RoomDescription room={room} />
    </div>
  );
};

export default Room;
