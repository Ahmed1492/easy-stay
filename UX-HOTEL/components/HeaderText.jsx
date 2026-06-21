import React from "react";

const HeaderText = ({ title, description, style }) => {
  return (
    <div
      className={`flex flex-col gap-4  ${style} mt-28 px-6 md:px-16 lg:px-24  xl:px-32`}
    >
      <h2 className="text-6xl font-bold  font-playfair">{title}</h2>
      <p className="max-w-2xl text-gray-700 ">{description}</p>
    </div>
  );
};

export default HeaderText;
