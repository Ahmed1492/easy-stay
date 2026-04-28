import React from "react";
import Hero from "../components/Hero";
import FeaturedDestination from "../components/FeaturedDestination";
import HeaderText from "../components/HeaderText";
import ExclusiveOffers from "../components/ExclusiveOffers";
import Testimonials from "../components/Testimonials";
import NewsLetter from "../components/NewsLetter";
import RecommendedHotels from "../components/RecommendedHotels";
import { useAppContext } from "../context/AppContext";
import { GridSkeleton } from "../components/SkeletonLoader";

const Home = () => {
  const { rooms } = useAppContext();
  const isLoading = !rooms || rooms.length === 0;

  const featuredHeader = {
    title: "Featured Destinations",
    desc: "Explore our handpicked selection of stunning destinations and luxury accommodations around the world",
    style: "items-start justify-start text-left",
  };

  const exclusiveOffers = {
    title: "Exclusive Offers",
    desc: "Unlock special deals and limited-time offers on premium hotels and resorts worldwide",
    style: "items-start justify-start text-left",
  };

  const testimonials = {
    title: "What Our Guests Say",
    desc: "Real experiences from travelers who discovered their perfect getaway with us",
    style: "items-start justify-start text-left",
  };

  return (
    <div className="bg-gradient-to-b from-white via-gray-50 to-white">
      <Hero />
      
      <div className="px-6 md:px-16 lg:px-24 xl:px-32">
        {/* Recommended Hotels Section */}
        {isLoading ? (
          <div className="mt-28">
            <div className="flex flex-col items-center justify-center text-center gap-4 mb-12">
              <div className="skeleton skeleton-text w-48 h-8"></div>
              <div className="skeleton skeleton-title w-96 h-12"></div>
              <div className="skeleton skeleton-text w-80 h-6"></div>
            </div>
            <GridSkeleton count={4} />
          </div>
        ) : (
          <RecommendedHotels />
        )}

        {/* Featured Destinations Section */}
        <section className="relative">
          <HeaderText
            title={featuredHeader.title}
            description={featuredHeader.desc}
            style={featuredHeader.style}
          />
          {isLoading ? (
            <GridSkeleton count={4} />
          ) : (
            <FeaturedDestination />
          )}
        </section>

        {/* Exclusive Offers Section */}
        <section className="relative">
          <HeaderText
            title={exclusiveOffers.title}
            description={exclusiveOffers.desc}
            style={exclusiveOffers.style}
          />
          <ExclusiveOffers />
        </section>

        {/* Testimonials Section */}
        <section className="relative">
          <HeaderText
            title={testimonials.title}
            description={testimonials.desc}
            style={testimonials.style}
          />
          <Testimonials />
        </section>

        {/* Newsletter Section */}
        <section className="mb-20">
          <NewsLetter />
        </section>
      </div>
    </div>
  );
};

export default Home;
