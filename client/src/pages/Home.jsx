import React from "react";
import Hero from "../components/Hero";
import FeaturedDestination from "../components/FeaturedDestination";
import HeaderText from "../components/HeaderText";

const Home = () => {
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
  // test
  return (
    <div>
      <Hero />
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
      <br />
    </div>
  );
};

export default Home;
