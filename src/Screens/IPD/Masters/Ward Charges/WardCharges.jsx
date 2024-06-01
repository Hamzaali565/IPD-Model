import React, { useEffect, useState } from "react";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import SimpleDropDown from "../../../../Components/SimpleDropdown/SimpleDropDown";
import axios from "axios";
import { useSelector } from "react-redux";

const WardCharges = () => {
  const [ward, setWard] = useState([]);

  useEffect(() => {
    wardNames();
  }, []);

  const url = useSelector((item) => item.url);
  const partyDetails = [{ name: "--" }, { name: "Cash" }];
  const wardNames = async () => {
    try {
      const response = await axios.get(`${url}/ipdward`, {
        withCredentials: true,
      });
      setWard(response.data.data);
      console.log("response of ward Name", response);
    } catch (error) {
      console.log("error of ward charges", error);
    }
  };
  const handleDropDownChange = (name) => {
    console.log("Selected Name:", name);
    // setSelectedName(name);
  };
  const clicked = () => {
    console.log("i am clicked");
  };
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg mt-4 mx-4  p-3 rounded-3xl">
      <CenterHeading title={"Party Wise Ward Charges"} />
      <div className="md:grid md:grid-cols-2">
        <SimpleDropDown
          DropDownLabel={"Party"}
          data={partyDetails}
          onChange={handleDropDownChange}
          onClick={clicked}
        />
        <SimpleDropDown
          DropDownLabel={"Ward Name"}
          data={ward.length > 0 ? ward : []}
          onChange={handleDropDownChange}
          onClick={clicked}
        />
      </div>
      {/* Charges table */}
      <div className="mt-3 grid grid-cols-3 text-xs justify-items-center ">
        <p>Bed No.</p>
        <p>Charges</p>
        <p>Status</p>
      </div>
      <div className="mt-3 grid grid-cols-3 text-xs justify-items-center items-center">
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
