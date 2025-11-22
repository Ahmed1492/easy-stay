import React from "react";
import HeaderText from "../components/HeaderText";
import MyBookingTable from "../components/MyBookingTable";

const MyBookings = () => {
  const myBokkingsHeader = {
    title: "My Bookings",
    desc: "Ladipisicing consectetur adipisicing elit. Nesciunt repellendus dolorum nam! Nobis, corporis.adipisicing adipisicing",
    style: "items-start justify-start text-left",
  };
  return (
    <div className="mt-20 px-6 md:px-16 lg:px-24 mb-20  xl:px-32">
      <HeaderText
        title={myBokkingsHeader.title}
        description={myBokkingsHeader.desc}
        style={myBokkingsHeader.style}
      />
      <MyBookingTable />
    </div>
  );
};

export default MyBookings;
