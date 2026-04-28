import React, { useState } from "react";
import { assets } from "../assets/assets";
import StarRating from "./StarRating";

const RoomImages = ({ room }) => {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  return (
    <div className="animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-playfair text-gray-900">
              {room?.hotel?.name}
            </h1>
            <span className="px-4 py-1.5 bg-orange-500 text-white rounded-full text-sm font-bold shadow-lg animate-pulse">
              🔥 20% OFF
            </span>
          </div>
          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold">
            {room?.roomType}
          </span>
        </div>
      </div>

      {/* Rating and Location */}
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-yellow-50 px-3 py-2 rounded-lg">
            <StarRating />
          </div>
          <span className="font-semibold text-gray-700">4.5 (200+ reviews)</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <p className="text-lg">{room?.hotel?.address}</p>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[29rem]">
        {/* Main Image */}
        <div className="relative group overflow-hidden rounded-2xl shadow-xl">
          <img
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 cursor-pointer"
            src={room?.images?.[mainImageIndex]}
            alt="Main room view"
            onClick={() => setIsImageModalOpen(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* View All Photos Button */}
          <button
            onClick={() => setIsImageModalOpen(true)}
            className="absolute bottom-4 right-4 bg-white text-gray-800 px-4 py-2 rounded-full font-semibold shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            View All Photos
          </button>

          {/* Image Counter */}
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-semibold">
            {mainImageIndex + 1} / {room?.images?.length}
          </div>
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-2 gap-4">
          {room?.images?.map((img, index) => (
            <div
              key={index}
              onClick={() => setMainImageIndex(index)}
              className={`relative group overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 ${
                index === mainImageIndex
                  ? "ring-4 ring-gray-900 shadow-2xl shadow-sm "
                  : " shadow-lg hover:shadow-xl"
              }`}
            >
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src={img}
                alt={`Room view ${index + 1}`}
              />
              <div className={`absolute inset-0 transition-all duration-500 ${
                index === mainImageIndex
                  ? "bg-transparent"
                  : "bg-black/20 group-hover:bg-black/10"
              }`}></div>
              
              {/* Selected Indicator */}
              {index === mainImageIndex && (
                <div className="absolute top-2 right-2 bg-gray-900 text-white p-1 rounded-full">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Full Screen Image Modal */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsImageModalOpen(false)}
        >
          <button
            onClick={() => setIsImageModalOpen(false)}
            className="absolute top-4 right-4 text-white bg-white/10 backdrop-blur-md hover:bg-white/20 w-12 h-12 rounded-full flex items-center justify-center transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={room?.images?.[mainImageIndex]}
              alt="Full size view"
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
            />
            
            {/* Navigation Arrows */}
            {room?.images?.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setMainImageIndex((prev) => (prev === 0 ? room.images.length - 1 : prev - 1));
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setMainImageIndex((prev) => (prev === room.images.length - 1 ? 0 : prev + 1));
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomImages;
