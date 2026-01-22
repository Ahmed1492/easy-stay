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
import { useAppContext } from "../context/AppContext";

const Room = () => {
  const { id } = useParams();
  const [room, setRoom] = useState({});
  const { rooms, getToken, navigate } = useAppContext();
  const getRoom = async () => {
    let searchedRoom = await rooms.find((room) => room._id === id);
    // console.log("seaerched room ", searchedRoom);

    searchedRoom && setRoom(searchedRoom);
  };

  const [isAvailable, setIsAvailabe] = useState(false);

  const [bookingData, setBookingData] = useState({
    checkInDate: "",
    checkOutDate: "",
    guests: 1,
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getRoom();
  }, [id, rooms]);

  if (!room._id)
    return (
      <div className="min-h-[47vh] px-4 md:px-16 lg:px-24 xl:px-32">
        <h2 className="mt-22 text-4xl"> Room Not Found</h2>
      </div>
    );

  return (
    <div className="mt-30 px-4 md:px-16 lg:px-24 xl:px-32 ">
      <RoomImages room={room} />
      <RoomDescription
        room={room}
        isAvailable={isAvailable}
        setIsAvailabe={setIsAvailabe}
        bookingData={bookingData}
        setBookingData={setBookingData}
        id={id}
      />
    </div>
  );
};

export default Room;
