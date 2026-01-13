import React, { useEffect } from "react";
import Hero from "../components/Hero";
import FeaturedDestination from "../components/FeaturedDestination";
import HeaderText from "../components/HeaderText";
import ExclusiveOffers from "../components/ExclusiveOffers";
import Testimonials from "../components/Testimonials";
import NewsLetter from "../components/NewsLetter";
import RecommendedHotels from "../components/RecommendedHotels";
import { useAppContext } from "../context/AppContext";

const Home = () => {
  const { searchCities } = useAppContext();
  const fetureHeader = {
    title: "Feaured Destination",
    desc: "Ladipisicing consectetur adipisicing elit. Nesciunt repellendus dolorum nam! Nobis, corporis.adipisicing adipisicing",
    style: "items-center justify-center text-center",
  };

  const exclusiveOffers = {
    title: "Exclusive Offers",
    desc: "Ladipisicing consectetur adipisicing elit. Nesciunt repellendus dolorum nam! Nobis, corporis.adipisicing adipisicing",
    style: "items-start justify-start text-left",
  };
  const testimonials = {
    title: "What Our Guests Say",

    desc: "Ladipisicing consectetur adipisicing elit. Nesciunt repellendus dolorum nam! Nobis, corporis.adipisicing adipisicing",
    style: "items-center justify-center text-center",
  };

  return (
    <>
      <Hero />
      <div className="px-6 md:px-16 lg:px-24  xl:px-32">
        {searchCities?.length > 0 && <RecommendedHotels />}
        <HeaderText
          title={fetureHeader.title}
          description={fetureHeader.desc}
          style={fetureHeader.style}
        />
        <FeaturedDestination />
        <HeaderText
          title={exclusiveOffers.title}
          description={exclusiveOffers.desc}
          style={exclusiveOffers.style}
        />
        <ExclusiveOffers />
        <HeaderText
          title={testimonials.title}
          description={testimonials.desc}
          style={testimonials.style}
        />
        <Testimonials />
        <NewsLetter />
      </div>
    </>
  );
};

export default Home;
