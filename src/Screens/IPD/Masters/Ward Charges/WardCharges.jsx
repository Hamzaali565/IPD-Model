import React from "react";
import PAgeTitle from "../../../../Components/Page Title/PAgeTitle";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import SimpleDropDown from "../../../../Components/SimpleDropdown/SimpleDropDown";

const WardCharges = () => {
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg mt-4 mx-4  p-3 rounded-3xl">
      <CenterHeading title={"Party Wise Ward Charges"} />
      <div className="md:grid md:grid-cols-2">
        <SimpleDropDown />
        <SimpleDropDown />
      </div>
      {/* Charges table */}
      <div className="mt-3 grid grid-cols-3 text-xs justify-items-center ">
        <p>Bed No.</p>
        <p>Charges</p>
        <p>Status</p>
      </div>
      <div className="mt-3 grid grid-cols-3 text-xs justify-items-center ">
        <p>MGW-0001</p>
        <p>
          <input
            type="number"
            className="w-24 rounded-xl p-1"
            placeholder="Charges"
            name=""
            id=""
          />
        </p>
        <p>
          <input type="checkbox" name="" id="" />
        </p>
      </div>
    </div>
  );
};

export default WardCharges;
