import { assets, cities } from "../assets/assets";

const HotelForm = () => {
  return (
    <form className="bg-white w-max mt-5 text-gray-500 rounded-lg px-6 py-4  flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto">
      <div>
        <div className="flex items-center gap-2">
          <img src={assets.calenderIcon} alt="" className="h-4" />
          <label htmlFor="destinationInput">Destination</label>
        </div>
        <input
          list="destinations"
          id="destinationInput"
          type="text"
          className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
          placeholder="Type here"
          required
        />
        <datalist id="destinations">
          {cities.map((city, index) => (
            <option value={city} key={index} />
          ))}
        </datalist>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <img src={assets.calenderIcon} alt="calenderIcon" className="h-4" />
          <label htmlFor="checkIn">Check in</label>
        </div>
        <input
          id="checkIn"
          type="date"
          className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
        />
      </div>

      <div>
        <div className="flex items-center gap-2">
          <img src={assets.calenderIcon} alt="calenderIcon" className="h-4" />

          <label htmlFor="checkOut">Check out</label>
        </div>
        <input
          id="checkOut"
          type="date"
          className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
        />
      </div>

      <div className="flex md:flex-col max-md:gap-2 max-md:items-center">
        <label htmlFor="guests">Guests</label>
        <input
          min={1}
          max={4}
          id="guests"
          type="number"
          className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16"
          placeholder="0"
        />
      </div>

      <button className="flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1">
        <img src={assets.searchIcon} alt="calenderIcon" className="h-7" />

        <span>Search</span>
      </button>
    </form>
  );
};

export default HotelForm;
