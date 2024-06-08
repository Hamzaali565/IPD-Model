import React from "react";

const AgeInput = () => {
  return (
    <div className="grid grid-cols-[auto,auto,auto,auto] md:gap-x-2 md:w-80 items-center">
      <p className="text-sm">Age:</p>
      <input
        type="number"
        className="w-14 md:w-24 p-1 pl-2 border-2 border-gray-500 rounded-2xl text-sm"
        placeholder="Year"
        name=""
        id=""
      />
      <input
        type="number"
        className="w-14 md:w-24 p-1 pl-2 border-2 border-gray-500 rounded-2xl text-sm"
        placeholder="Month"
        name=""
        id=""
      />
      <input
        type="number"
        className="w-14 md:w-24 p-1 pl-2 border-2 border-gray-500 rounded-2xl text-sm"
        placeholder="Day"
        name=""
        id=""
      />
    </div>
  );
};

export default AgeInput;
