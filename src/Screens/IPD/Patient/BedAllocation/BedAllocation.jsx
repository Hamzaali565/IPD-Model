import React, { useEffect, useState } from "react";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import SimpleDropDown from "../../../../Components/SimpleDropdown/SimpleDropDown";
import { useSelector } from "react-redux";
import axios from "axios";

const BedAllocation = () => {
  const [ward, setWard] = useState([]);

  useEffect(() => {
    wardNames();
  }, []);

  const url = useSelector((state) => state.url);
  const userData = useSelector((state) => state.response);

  const wardNames = async () => {
    try {
      const response = await axios.get(`${url}/ipdward`, {
        withCredentials: true,
      });
      setWard(response.data.data);
      console.log("response of ward Name", response);
    } catch (error) {
      console.log("error of ward name", error);
    }
  };

  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Bed Allocation"} />
        <SimpleDropDown
          DropDownLabel={"Select Ward"}
          data={ward.length > 0 ? ward : ""}
        />
      </div>
    </div>
  );
};

export default BedAllocation;
