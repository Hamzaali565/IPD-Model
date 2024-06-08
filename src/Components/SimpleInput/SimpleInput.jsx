import React from "react";

const SimpleInput = ({ max, placeholder, type }) => {
  return (
    <div>
      <input
        type={type}
        className="text-sm w-40 rounded-xl p-1 border-2 border-gray-500 text-black"
        placeholder={placeholder}
        name=""
        maxLength={max}
        id=""
      />
    </div>
  );
};

export default SimpleInput;
