import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";

const AddRoomDetails = () => {
  const amenities = [
    "Free WiFi",
    "Free Breakfast",
    "Room Service",
    "Mountain View",
    "Pool Access",
  ];

  const [images, setImages] = useState([
    {
      id: 1,
      file: null,
    },
    {
      id: 2,
      file: null,
    },
    {
      id: 3,
      file: null,
    },
    {
      id: 4,
      file: null,
    },
  ]);

  const handleImageChange = (index, file) => {
    const updatedImages = [...images];

    updatedImages[index] = {
      ...updatedImages[index],
      file,
    };

    setImages(updatedImages);
  };

  // useEffect(() => {
  //   console.log(images);
  // }, [images]);
  return (
    <div className="mt-10">
      {/* IMAGES */}
      <div className="flex items-center gap-3.5">
        {images.map((img, index) => (
          <label key={img.id} htmlFor={`image-${img.id}`}>
            <img
              src={img.file ? URL.createObjectURL(img.file) : assets.uploadArea}
              className="w-35 cursor-pointer rounded-md"
              alt="upload"
            />

            <input
              id={`image-${img.id}`}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => handleImageChange(index, e.target.files[0])}
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
            className="border border-gray-300 pe-6 ps-2 py-1.5 outline-0 rounded-sm"
            name=""
            id=""
          >
            <option value="">Select Room Type</option>
            <option value="">option 1</option>
            <option value="">option 1</option>
          </select>
        </div>
        {/* PRICE/NIGHT */}
        <div className="flex flex-col gap-1.5">
          <label className="text-gray-800 font-medium text-lg" htmlFor="">
            Price/Night
          </label>
          <input
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

        {amenities.map((amenity, index) => (
          <div
            key={index}
            className="flex items-center gap-1.5 mt-2 text-gray-700/80"
          >
            <input
              className="cursor-pointer "
              type="checkbox"
              name=""
              id={amenity}
            />
            <label className="cursor-pointer" htmlFor={amenity}>
              {amenity}
            </label>
          </div>
        ))}
      </div>

      <button className="text-white bg-blue-600 rounded-sm px-7 py-2 cursor-pointer mt-7">
        Add Room{" "}
      </button>
    </div>
  );
};

export default AddRoomDetails;
