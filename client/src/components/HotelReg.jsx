import { useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";

const HotelReg = () => {
  const { setShowHotelReg, backEndUrl, getToken, setIsOwner } = useAppContext();

  const [inputsData, setInputsData] = useState({
    name: "",
    address: "",
    contact: "",
    city: "",
  });
  const collectData = async (e) => {
    try {
      let keys = e.target.name;
      let values = e.target.value;
      let newObj = { ...inputsData };
      newObj[keys] = values;
      console.log(newObj);
      setInputsData(newObj);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const hotelRegistration = async () => {
    try {
      const myResponse = await axios.post(
        `${backEndUrl}/api/hotels/register`,
        inputsData,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );
      if (myResponse.data.success) {
        toast.success(myResponse.data.message);
        setIsOwner(true);
        setShowHotelReg(false);
      } else {
        toast.success(myResponse.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div
      onClick={() => setShowHotelReg(false)}
      className="fixed left-0 right-0 top-0 bottom-0 bg-black/80 flex items-center justify-center z-40"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex justify-around w-264 z-50 "
      >
        {/* LEFT */}
        <div className="w-[50%] rounded-s-xl flex flex-col justify-between bg-white">
          <img
            className="w-full rounded-xl"
            src={assets.regImage}
            alt="regImage"
          />
        </div>
        {/* RIGHT */}
        <div className="w-[50%] flex flex-col justify-between bg-white rounded-e-xl px-7 py-6  relative ">
          <img
            onClick={() => setShowHotelReg(false)}
            className="w-4 absolute right-4 top-4 cursor-pointer"
            src={assets.closeIcon}
            alt="closeIcon"
          />
          <h2 className="text-2xl text-center font-semibold mt-5 ">
            Register Your Hotel
          </h2>

          {/* Hotel Name */}
          <label className="block mb-2 mt-5 text-gray-600" htmlFor="">
            Hotel Name
          </label>
          <input
            name="name"
            value={inputsData.name}
            onChange={collectData}
            type="text"
            className="border-gray-200 border rounded-lg px-2 py-2 w-[84%]"
            placeholder="Type Here "
          />

          {/* PHONE */}
          <label className="block mb-2 mt-5 text-gray-600" htmlFor="">
            Phone
          </label>
          <input
            type="number"
            name="contact"
            value={inputsData.contact}
            onChange={collectData}
            className="border-gray-200 border rounded-lg px-2 py-2 w-[84%]"
            placeholder="Type Here "
          />

          {/* ADDRESS */}

          <label className="block mb-2 mt-5 text-gray-600" htmlFor="">
            Address
          </label>
          <input
            name="address"
            value={inputsData.address}
            onChange={collectData}
            type="text"
            className="border-gray-200 border rounded-lg px-2 py-2 w-[84%] "
            placeholder="Type Here "
          />

          {/* CITY */}
          <label className="block mb-2 mt-5 text-gray-600" htmlFor="">
            City
          </label>
          <select
            name="city"
            value={inputsData.city}
            onChange={collectData}
            className="border-gray-100 border rounded-lg px-2 py-2 w-[64%]"
          >
            <option value="">Select City</option>
            <option value="option 2">option 2</option>
            <option value="option 3">option 3</option>
            <option value="option 4">option 4</option>
          </select>

          <button
            onClick={hotelRegistration}
            className="bg-emerald-900 hover:bg-emerald-700 dura w-max px-10 block cursor-pointer py-2.5 rounded-lg text-white mt-6"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelReg;
