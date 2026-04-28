import React from "react";

// Card Skeleton for Hotel Cards
export const CardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
      <div className="skeleton skeleton-image h-60"></div>
      <div className="p-4 space-y-3">
        <div className="skeleton skeleton-title w-3/4"></div>
        <div className="skeleton skeleton-text w-full"></div>
        <div className="skeleton skeleton-text w-2/3"></div>
        <div className="flex justify-between items-center mt-4">
          <div className="skeleton skeleton-text w-1/3"></div>
          <div className="skeleton skeleton-text w-1/4 h-10"></div>
        </div>
      </div>
    </div>
  );
};

// Room Card Skeleton
export const RoomCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="skeleton skeleton-image h-80"></div>
        <div className="p-6 space-y-4">
          <div className="skeleton skeleton-text w-1/4"></div>
          <div className="skeleton skeleton-title w-3/4"></div>
          <div className="skeleton skeleton-text w-full"></div>
          <div className="skeleton skeleton-text w-5/6"></div>
          <div className="flex gap-2 mt-4">
            <div className="skeleton skeleton-text w-20 h-10"></div>
            <div className="skeleton skeleton-text w-20 h-10"></div>
            <div className="skeleton skeleton-text w-20 h-10"></div>
          </div>
          <div className="flex justify-between items-center mt-6">
            <div className="skeleton skeleton-text w-1/3 h-12"></div>
            <div className="skeleton skeleton-text w-1/3 h-12"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Hero Skeleton
export const HeroSkeleton = () => {
  return (
    <div className="h-screen bg-gray-200 animate-pulse flex items-center justify-center">
      <div className="text-center space-y-6 px-6">
        <div className="skeleton skeleton-text w-64 h-8 mx-auto"></div>
        <div className="skeleton skeleton-title w-96 h-16 mx-auto"></div>
        <div className="skeleton skeleton-text w-80 h-6 mx-auto"></div>
      </div>
    </div>
  );
};

// Grid Skeleton
export const GridSkeleton = ({ count = 4, type = "card" }) => {
  const SkeletonComponent = type === "room" ? RoomCardSkeleton : CardSkeleton;
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <SkeletonComponent key={index} />
        ))}
    </div>
  );
};

// Room Detail Skeleton
export const RoomDetailSkeleton = () => {
  return (
    <div className="animate-pulse space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="skeleton skeleton-title w-2/3"></div>
        <div className="skeleton skeleton-text w-1/3"></div>
      </div>
      
      {/* Images */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-96">
        <div className="skeleton skeleton-image"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="skeleton skeleton-image"></div>
          <div className="skeleton skeleton-image"></div>
          <div className="skeleton skeleton-image"></div>
          <div className="skeleton skeleton-image"></div>
        </div>
      </div>
      
      {/* Description */}
      <div className="space-y-4">
        <div className="skeleton skeleton-title w-1/2"></div>
        <div className="skeleton skeleton-text w-full"></div>
        <div className="skeleton skeleton-text w-5/6"></div>
        <div className="skeleton skeleton-text w-4/6"></div>
      </div>
    </div>
  );
};

// Page Skeleton
export const PageSkeleton = () => {
  return (
    <div className="min-h-screen">
      <HeroSkeleton />
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-20">
        <div className="space-y-4 mb-12">
          <div className="skeleton skeleton-title w-1/3 mx-auto"></div>
          <div className="skeleton skeleton-text w-1/2 mx-auto"></div>
        </div>
        <GridSkeleton count={8} />
      </div>
    </div>
  );
};

export default CardSkeleton;
