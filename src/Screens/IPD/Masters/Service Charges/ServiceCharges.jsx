import React, { useEffect, useState } from "react";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import SimpleDropDown from "../../../../Components/SimpleDropdown/SimpleDropDown";
import SimpleButton from "../../../../Components/Button/SimpleButton";
import axios from "axios";
import { useSelector } from "react-redux";
import { ErrorAlert } from "../../../../Components/Alert/Alert";

const ServiceCharges = () => {
  // state variables
  const partyDetails = [{ name: "--" }, { name: "Cash" }];
  const [ward, setWard] = useState([]);
  const [parentServiceName, setParentServiceName] = useState([]);
  const [party, setParty] = useState("");
  const [wardName, setWardName] = useState("");
  const [serviceChargesData, setServiceChargesData] = useState([]);
  const [_id, set_id] = useState("");

  // useEffects
  useEffect(() => {
    wardNames();
    parentService();
  }, []);

  // reducx call
  const url = useSelector((item) => item?.url);

  // api(s)
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

  const parentService = async () => {
    try {
      const response = await axios.get(`${url}/parentservice`, {
        withCredentials: true,
      });
      setParentServiceName(response.data.data);
    } catch (error) {
      console.log("error of parent service", error);
    }
  };

  const callData = async (name) => {
    try {
      const response = await axios.get(
        `${url}/servicecharges?party=${party}&wardName=${wardName}&parentName=${name}`,
        { withCredentials: true }
      );
      console.log("response of call Data", response.data.data);
      console.log("response of call Data", response.data._id);
      setServiceChargesData(response.data.data);
      if (response.data._id) {
        set_id(response.data._id);
        return;
      }
    } catch (error) {
      console.log("error of call data", error);
    }
  };

  // FUNCTIONS
  const handleDropDownParty = (name) => {
    console.log("Selected Name:", name);
    setParty(name);
    // setSelectedName(name);
  };
  const handleDropDownWard = (name) => {
    console.log("Selected Name:", name);
    setWardName(name);
    // setSelectedName(name);
  };
  const checkPrevious = (value) => {
    if (value === "wardName") {
      if (party === "")
        ErrorAlert({ text: "PLEASE SELECT PARTY FIRST", timer: 1500 });
      return;
    }
    if (value === "serviceName") {
      if (wardName === "") {
        ErrorAlert({ text: "PLEASE SELECT WARD NAME FIRST!!!", timer: 1500 });
      }
      return;
    }
  };

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
      <CenterHeading title={"Party Wise Service Charges"} />

      <div className="md:grid md:grid-cols-3">
        <SimpleDropDown
          DropDownLabel={"Party"}
          data={partyDetails}
          onChange={handleDropDownParty}
        />
        <SimpleDropDown
          DropDownLabel={"Ward Name"}
          data={ward.length > 0 ? ward : []}
          onChange={handleDropDownWard}
          onClick={() => {
            checkPrevious("wardName");
          }}
        />
        <SimpleDropDown
          DropDownLabel={"Service Name"}
          data={parentServiceName.length > 0 ? parentServiceName : []}
          onChange={callData}
          onClick={() => {
            checkPrevious("serviceName");
          }}
        />
      </div>
      {serviceChargesData && (
        <div>
          <div className="mt-3 grid grid-cols-4 text-xs justify-items-center ">
            <p>Service No.</p>
            <p>Service Name</p>
            <p>Charges</p>
            <p>Status</p>
          </div>

          {serviceChargesData &&
            serviceChargesData.map((items, index) => (
              <div
                className="mt-3 grid grid-cols-4 text-xs justify-items-center "
                key={index}
              >
                <p>{index + 1}</p>
                <p>{items?.serviceName}</p>
                <p>
                  <input
                    type="number"
                    className="w-24 rounded-xl p-1 border-gray-900 border-2"
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
                    // id=""
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
            ))}
          <div className="flex justify-center my-4">
            <SimpleButton
              title={"Submit"}
              //  onClick={submitHandler}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceCharges;
