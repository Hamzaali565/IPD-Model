import React, { useEffect, useState } from "react";
import PAgeTitle from "../../../../Components/Page Title/PAgeTitle";
import SimpleDropDown from "../../../../Components/SimpleDropdown/SimpleDropDown";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import { useSelector } from "react-redux";
import axios from "axios";
import { ErrorAlert } from "../../../../Components/Alert/Alert";

const ConsultantCharges = () => {
  const [ward, setWard] = useState([]);
  const [party, setParty] = useState("");
  const [consultantDetails, setConsultantDetails] = useState([]);

  // redux details
  const data = [{ name: "--" }, { name: "Cash" }];
  const url = useSelector((item) => item.url);
  const userId = useSelector((item) => item.response);

  //   useEffect
  useEffect(() => {
    wardNameResponse();
  }, []);

  // api(s)
  const wardNameResponse = async () => {
    try {
      const response = await axios.get(`${url}/ipdward`, {
        withCredentials: true,
      });
      setWard(response.data.data);
    } catch (error) {
      console.log("error of wardName", error);
    }
  };

  const handleCall = async (name) => {
    try {
      const response = await axios.get(
        `${url}/consultantcharges?party=${party}&wardName=${name}`,
        { withCredentials: true }
      );
      console.log(response);
      setConsultantDetails(response.data.data);
    } catch (error) {
      console.log("Error of handleCall", error);
    }
  };

  // funstions
  const handleDropDownChange = (name) => {
    console.log("Selected Name:", name);
    setParty(name);
    // setSelectedName(name);
  };
  const previousCheck = () => {
    if (party === "") {
      ErrorAlert({ text: "PLEASE SELECT PARTY FIRST !!!" });
      return;
    }
  };
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
      <CenterHeading title={"Consultant Charges"} />
      {/* dropDowns */}
      <div className="md:grid md:grid-cols-2">
        <SimpleDropDown
          DropDownLabel={"Party"}
          data={data}
          onChange={handleDropDownChange}
        />
        <SimpleDropDown
          DropDownLabel={"Ward"}
          data={ward.length > 0 ? ward : []}
          onClick={previousCheck}
          onChange={handleCall}
        />
      </div>
      {/* data */}
      <div>
        {/* header */}
        <div className="container mx-auto mt-3">
          <div className="grid grid-cols-4 text-xs justify-items-center items-center h-16 border border-gray-300">
            <p className="">S. No</p>
            <p className="">Dr. Name</p>
            <p className="">Charges</p>
            <p className="">Status</p>
          </div>
        </div>

        {/* Detail */}
        {consultantDetails.length > 0 &&
          consultantDetails.map((items, index) => (
            <div className="container mx-auto mt-3">
              <div className="grid grid-cols-4 text-xs justify-items-center items-center h-10 border border-gray-300">
                <p>{index + 1}</p>
                <p>{items?.name}</p>
                <p>
                  <input
                    type="number"
                    className="w-24 rounded-xl p-1"
                    placeholder="Charges"
                    name=""
                    value={items?.charges}
                    // onChange={(e) =>
                    //   handlerEffect(
                    //     e.target.value,
                    //     item._id,
                    //     "charges",
                    //     item?.bedId
                    //   )
                    // }
                    id=""
                  />
                </p>
                <p>
                  <input
                    type="checkbox"
                    checked={items?.status}
                    name=""
                    id=""
                    // onChange={(e) =>
                    //   handlerEffect(
                    //     e.target.checked,
                    //     item._id,
                    //     "status",
                    //     item?.bedId
                    //   )
                    // }
                  />
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ConsultantCharges;
