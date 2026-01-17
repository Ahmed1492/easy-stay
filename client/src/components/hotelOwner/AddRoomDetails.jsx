import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";
import axios from "axios";

const AddRoomDetails = () => {
  const amenities = [
    "Free WiFi",
    "Free Breakfast",
    "Room Service",
    "Mountain View",
    "Pool Access",
  ];

  const roomTypes = [
    { id: "single-bed", label: "Single Bed" },
    { id: "double-bed", label: "Double Bed" },
    { id: "luxury-room", label: "Luxury Room" },
    { id: "family-suite", label: "Family Suite" },
  ];

  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });
  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState({
    roomType: "",
    pricePerNight: 0,
    isAvailable: true,
    amenities: {
      "Free WiFi": false,
      "Free Breakfast": false,
      "Room Service": false,
      "Mountain View": false,
      "Pool Access": false,
    },
  });

  const { getToken, backEndUrl } = useAppContext();

  const handleImageChange = (index, file) => {
    setImages((prev) => ({
      ...prev,
      [index]: { file },
    }));
  };

  const createRoom = async () => {
    if (
      !inputs.roomType ||
      !inputs.pricePerNight ||
      !inputs.amenities ||
      //check if there are at least one image in 'images' array
      // if there are at least one image => true else => false
      !Object.values(images).some((image) => image)
    ) {
      toast.error("Please fill All Data");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("roomType", inputs.roomType);
      formData.append("pricePerNight", inputs.pricePerNight);

      // Gets all keys ["Free WiFi" etc]
      let amenities = Object.keys(inputs.amenities);
      // get only keys that are true (selected) “Keep the key only if its value is true.”
      amenities = amenities.filter((key) => inputs.amenities[key]);

      // FormData can only send strings or files It cannot send arrays or objects directly
      // We convert the array to text so FormData can send it correctly.
      formData.append("amenities", JSON.stringify(amenities));

      //“Loop through all image slots → if a slot has an image → send its file.”
      Object.keys(images).forEach((key) => {
        //images[key] →  “give me the value of this key”
        images[key] && formData.append("images", images[key].file);
      });

      const myResponse = await axios.post(
        `${backEndUrl}/api/rooms/create-room`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );
      // console.log(myResponse.data);

      if (myResponse.data.success) {
        toast.success(myResponse.data.message || "room added successfully");
        setInputs({
          roomType: "",
          pricePerNight: 0,
          amenities: {
            "Free WiFi": false,
            "Free Breakfast": false,
            "Room Service": false,
            "Mountain View": false,
            "Pool Access": false,
          },
        });

        setImages({
          1: null,
          2: null,
          3: null,
          4: null,
        });
      } else {
        toast.error(myResponse.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      {/* IMAGES */}
      <div className="flex items-center gap-3.5">
        {Object.keys(images).map((key) => (
          <label key={key} htmlFor={`image-${key}`}>
            <img
              src={
                images[key]?.file
                  ? URL.createObjectURL(images[key].file)
                  : assets.uploadArea
              }
              className="w-35 cursor-pointer rounded-md"
              alt="upload"
            />

            <input
              id={`image-${key}`}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                handleImageChange(key, e.target.files[0]);
                // console.log(key, e.target.files[0]);
              }}
            />
          </label>
        ))}
      </div>

      {/* ROOM TYPE & PRICE/NIGHT */}
      <div className="mt-10 flex items-start gap-7">
        {/* ROOM TYPE */}
        <div className="flex flex-col gap-1.5">
          <label className="text-gray-800 font-medium text-lg" htmlFor="">
            Room Type
          </label>
          <select
            onChange={(e) => setInputs({ ...inputs, roomType: e.target.value })}
            className="border border-gray-300 pe-6 ps-2 py-1.5 outline-0 rounded-sm"
            name=""
            id=""
            value={inputs.roomType}
          >
            <option value="">Select Room Type</option>
            {roomTypes.map((type) => (
              <option key={type.id} value={type.label}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        {/* PRICE/NIGHT */}
        <div className="flex flex-col gap-1.5">
          <label className="text-gray-800 font-medium text-lg" htmlFor="">
            Price/Night
          </label>
          <input
            value={inputs.pricePerNight}
            onChange={(e) =>
              setInputs({ ...inputs, pricePerNight: e.target.value })
            }
            className="border border-gray-300  px-2 py-1.5 outline-0 rounded-sm w-36"
            type="number"
            name=""
            id=""
          />
        </div>
      </div>

      {/* Amenities */}
      <div className="mt-7 flex-col gap-2.5">
        <h2 className="text-gray-800 text-lg mb-1 font-medium">Amenities</h2>

        {Object.keys(inputs.amenities).map((amenity, index) => (
          <div
            key={index}
            className="flex items-center gap-1.5 mt-2 text-gray-700/80"
          >
            <input
              value={inputs.amenities}
              className="cursor-pointer "
              type="checkbox"
              name=""
              id={`amenity-${index + 1}`}
              checked={inputs.amenities[amenity]}
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  amenities: {
                    ...inputs.amenities,
                    [amenity]: !inputs.amenities[amenity],
                  },
                })
              }
            />
            <label className="cursor-pointer" htmlFor={`amenity-${index + 1}`}>
              {amenity}
            </label>
          </div>
        ))}
      </div>

      <button
        disabled={loading}
        onClick={createRoom}
        className="text-white bg-blue-600 rounded-sm px-7 py-2 cursor-pointer mt-7"
      >
        {loading ? "Loading..." : "Add Room"}
      </button>
    </div>
  );
};

export default AddRoomDetails;
