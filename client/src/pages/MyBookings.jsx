import React, { useEffect, useState } from "react";
import HeaderText from "../components/HeaderText";
import MyBookingTable from "../components/MyBookingTable";
import toast from "react-hot-toast";
import axios from "axios";
import { useAppContext } from "../context/AppContext";

const MyBookings = () => {
  const { navigate, backEndUrl, getToken, user } = useAppContext();

  const myBokkingsHeader = {
    title: "My Bookings",
    desc: "Ladipisicing consectetur adipisicing elit. Nesciunt repellendus dolorum nam! Nobis, corporis.adipisicing adipisicing",
    style: "items-start justify-start text-left",
  };
  const [bookingData, setBookingData] = useState([]);
  const getUserBookings = async () => {
    try {
      const myResponse = await axios.get(
        `${backEndUrl}/api/booking/user-bookings`,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      );
      // console.log(myResponse.data);
      if (myResponse.data.success) {
        setBookingData(myResponse.data.bookings);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlePayment = async (id) => {
    try {
      const myResponse = await axios.post(
        `${backEndUrl}/api/booking/stripe-payment`,
        { bookingId: id },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      );
      console.log(myResponse.data);
      if (myResponse.data.success) {
        window.location.href = myResponse.data.url;
      } else {
        toast.error(myResponse.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getUserBookings();
  }, [user]);
  return (
    <div className="mt-20 px-6 md:px-16 lg:px-24 mb-20  xl:px-32">
      <HeaderText
        title={myBokkingsHeader.title}
        description={myBokkingsHeader.desc}
        style={myBokkingsHeader.style}
      />
      <MyBookingTable handlePayment={handlePayment} bookingData={bookingData} />
    </div>
  );
};

export default MyBookings;
