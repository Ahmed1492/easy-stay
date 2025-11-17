import React from "react";
import HotelForm from "./HotelBookingForm";

const Hero = () => {
  return (
    <div className="bg-hero h-screen px-6 md:px-16 lg:px-24  xl:px-32 ">
      <div className="flex flex-col gap-4 justify-center h-full ">
        <span className="px-4 py-1.5 bg-[#49B9FF]/50 w-max mt-20 text-white rounded-full">
          The Ultimate Hotel Experience
        </span>

        <h2 className="text-6xl font-bold text-white font-playfari">
          Discover Yours Perfect <br /> Gateway Destination
        </h2>
        <p className="max-w-2xl text-white">
          Unparalleled luxury and comfort await at the world's most exclusive
          hotels and resorts. Start your journey today.
        </p>

        <HotelForm />
      </div>
    </div>
  );
};

export default Hero;
