import React from "react";

const SimpleDropDown = () => {
  return (
    <div className="mt-3 flex justify-center items-center space-x-3">
      <label for="cars" className="font-bold underline">
        Choose Page Type:
      </label>

      <select
        name="cars"
        id="cars"
        className="p-2 rounded-2xl bg-gray-800 bg-opacity-5 backdrop-blur-lg border border-white border-opacity-30 shadow-lg"
      >
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
    </div>
  );
};

export default SimpleDropDown;
