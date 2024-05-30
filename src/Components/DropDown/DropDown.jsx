import React from "react";

const DropDown = () => {
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg border items-center border-white border-opacity-30 shadow-lg mt-4 mx-4  p-3 rounded-3xl flex justify-center space-x-4">
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

export default DropDown;
