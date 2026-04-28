import React from "react";

const HeaderText = ({ title, description, style }) => {
  return (
    <div className={`flex flex-col gap-4 ${style} mt-28 animate-fade-in`}>
      <div className="inline-block px-4 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 rounded-full text-sm font-semibold w-max mx-autoa">
         Discover More
      </div>
      <h2 className="text-4xl md:text-5xl font-bold font-playfair bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
        {title}
      </h2>
      <p className="max-w-2xl text-gray-600 text-lg leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default HeaderText;
