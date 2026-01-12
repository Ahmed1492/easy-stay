import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets.js";
import RecentBookingTable from "../../components/hotelOwner/RecentBookingTable.jsx";
import axios from "axios";
import { useAppContext } from "../../context/AppContext.jsx";
import toast from "react-hot-toast";
const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const { backEndUrl, getToken, user } = useAppContext();

  const getDashboardData = async () => {
    try {
      const myResponse = await axios.get(
        `${backEndUrl}/api/booking/hotel-bookings`,
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );
      console.log(myResponse.data);
      if (myResponse.data.success) {
        setDashboardData(myResponse.data.dashboardData);
      } else {
        toast.error(myResponse.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      getDashboardData();
    }
  }, [user]);
  return (
    <div className="py-4 px-7 mt-20 w-full">
      <div className="mt-9">
        <h3 className="text-3xl font-medium  ">Dashboard</h3>
        <p className="text-gray-500/80 max-w-2xl mt-3">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio
          fuga suscipit blanditiis odio pariatur ab sit quidem explicabo nihil
          fuga suscipit blanditiis odio pariatur ab sit quidem explicabo nihil
          voluptas?
        </p>
      </div>

      <div className="mt-7 flex items-center gap-7">
        {/* TOTAL BOOKING */}
        <div>
          <div className=" w-max bg-gray-50 border border-gray-200 py-4 ps-5 pe-10 flex gap-2.5 items-start font-medium ">
            <img
              className="w-9"
              src={assets.totalBookingIcon}
              alt="totalBookingIcon"
            />
            <div>
              <h3 className="text-blue-400">Total Bookings</h3>
              <p className="text-gray-500/80">{dashboardData?.totalBookings}</p>
            </div>
          </div>
        </div>

        {/* TOTAL REVENUE */}
        <div>
          <div className=" w-max bg-gray-50 border border-gray-200 py-4 ps-5 pe-10 flex gap-2.5 items-start font-medium ">
            <img
              className="w-9"
              src={assets.totalRevenueIcon}
              alt="totalBookingIcon"
            />
            <div>
              <h3 className="text-blue-400">Total Revenue</h3>
              <p className="text-gray-500/80">${dashboardData?.totalRevenue}</p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-2xl mt-9 text-gray-700">Recent Bookings</h3>
      <div className="w-full">
        <RecentBookingTable dashboardData ={dashboardData} />
      </div>
    </div>
  );
};

export default Dashboard;
