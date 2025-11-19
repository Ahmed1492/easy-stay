import React from "react";

const FiltersHotelRooms = () => {
  return (
    <div className="">
      <form className=" pb-5 w-[81vw] sm:w-[80vw]    xl:w-[24rem]  border border-gray-300/90 rounded-md mt-17">
        <div className="border-b border-gray-300/90  p-4  flex items-center justify-between">
          <h3 className="text-lg font-medium">FILTERS</h3>
          <span className="text-gray-600/90 text-sm cursor-pointer">CLEAR</span>
        </div>
        <div className="flex justify-between xl:block">
          {/* Popular Filters */}
          <div className="p-4">
            <h3 className="font-semibold mb-4">Popular Filters</h3>

            <div className="mt-2 text-gray-600/80 flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" id="single-bed" />
              <label htmlFor="single-bed">Single Bed</label>
            </div>

            <div className="mt-2 text-gray-600/80 flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" id="double-bed" />
              <label htmlFor="double-bed">Double Bed</label>
            </div>

            <div className="mt-2 text-gray-600/80 flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" id="luxury-room" />
              <label htmlFor="luxury-room">Luxury Room</label>
            </div>

            <div className="mt-2 text-gray-600/80 flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" id="family-suite" />
              <label htmlFor="family-suite">Family Suite</label>
            </div>
          </div>

          {/* Price Range Filters */}
          <div className="p-4">
            <h3 className="font-semibold mb-4">Price Range</h3>

            <div className="mt-3 text-gray-600/80 flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" id="price-0-500" />
              <label className="text-sm" htmlFor="price-0-500">
                $ 0 to 500
              </label>
            </div>

            <div className="mt-3 text-gray-600/80 flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" id="price-500-1000" />
              <label className="text-sm" htmlFor="price-500-1000">
                $ 500 to 1000
              </label>
            </div>

            <div className="mt-3 text-gray-600/80 flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" id="price-1000-2000" />
              <label className="text-sm" htmlFor="price-1000-2000">
                $ 1000 to 2000
              </label>
            </div>

            <div className="mt-3 text-gray-600/80 flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" id="price-2000-3000" />
              <label className="text-sm" htmlFor="price-2000-3000">
                $ 2000 to 3000
              </label>
            </div>
          </div>

          {/* Sort By Filter */}
          <div className="p-4">
            <h3 className="font-semibold mb-4">Sort By</h3>

            <div className="mt-2 text-gray-600/80 flex items-center gap-2.5 cursor-pointer">
              <input type="radio" id="sort-low-high" name="sort" />
              <label htmlFor="sort-low-high">Price Low to High</label>
            </div>

            <div className="mt-2 text-gray-600/80 flex items-center gap-2.5 cursor-pointer">
              <input type="radio" id="sort-high-low" name="sort" />
              <label htmlFor="sort-high-low">Price High to Low</label>
            </div>

            <div className="mt-2 text-gray-600/80 flex items-center gap-2.5 cursor-pointer">
              <input type="radio" id="sort-newest" name="sort" />
              <label htmlFor="sort-newest">Newest First</label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FiltersHotelRooms;
