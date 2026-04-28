import React from "react";
import HotelForm from "./HotelBookingForm";

const Hero = () => {
  return (
    <div className="relative bg-hero h-screen px-6 md:px-16 lg:px-24 xl:px-32 overflow-hidden">
      {/* Animated Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-transparent"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative flex flex-col gap-6 justify-center h-full animate-fade-in">
        {/* Badge with animation */}
        <span className="text-sm sm:text-base px-5 py-2 bg-gradient-to-r from-blue-500/80 to-purple-500/80 backdrop-blur-md w-max mt-20 text-white rounded-full font-semibold shadow-lg animate-slide-down flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          The Ultimate Hotel Experience
        </span>

        {/* Main Heading with gradient */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white font-playfair leading-tight animate-slide-up">
          Discover Your Perfect
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Gateway Destination
          </span>
        </h1>

        {/* Description */}
        <p className="max-w-2xl text-white/90 text-lg md:text-xl leading-relaxed animate-slide-up delay-200">
          Unparalleled luxury and comfort await at the world's most exclusive
          hotels and resorts. Start your journey today.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap gap-8 mt-4 animate-slide-up delay-300">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-xl">500+</p>
              <p className="text-white/70 text-sm">Hotels</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-xl">50K+</p>
              <p className="text-white/70 text-sm">Happy Guests</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-xl">100+</p>
              <p className="text-white/70 text-sm">Destinations</p>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="animate-slide-up delay-400">
          <HotelForm />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
