import React from "react";
import { assets } from "../../assets/assets";
import RecentBookingTable from "../../components/hotelOwner/RecentBookingTable";
import AllRoomsTable from "../../components/hotelOwner/AllRoomsTable";

const ListRoom = () => {
  return (
    <div className="p-4 mt-20 w-full">
      <div className="mt-9">
        <h3 className="text-3xl font-medium  ">Room Listings</h3>
        <p className="text-gray-500/80 max-w-2xl mt-3">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio
          fuga suscipit blanditiis odio pariatur ab sit quidem explicabo nihil
          fuga suscipit blanditiis odio pariatur ab sit quidem explicabo nihil
          voluptas?
        </p>
      </div>

      <h3 className="text-2xl mt-9 text-gray-700"> All Rooms</h3>
      <div className="w-full">
        <AllRoomsTable />
      </div>
    </div>
  );
};

export default ListRoom;
