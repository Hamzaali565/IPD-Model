import React, { useEffect, useState } from "react";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import SimpleDropDown from "../../../../Components/SimpleDropdown/SimpleDropDown";
import axios from "axios";
import { useSelector } from "react-redux";
import { ErrorAlert, SuccessAlert } from "../../../../Components/Alert/Alert";
import SimpleButton from "../../../../Components/Button/SimpleButton";

const WardCharges = () => {
  const [ward, setWard] = useState([]);
  const [party, setParty] = useState("");
  const [wardName, setwardName] = useState("");
  const [wardCharges, setWardCharges] = useState([]);
  const [wardCharges_id, setWardCharges_id] = useState("");

  useEffect(() => {
    wardNames();
  }, []);
  useEffect(() => {
    realCall();
  }, [wardName]);

  const url = useSelector((item) => item.url);
  const UserData = useSelector((item) => item.response);
  const partyDetails = [{ name: "--" }, { name: "Cash" }];

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
  const handleDropDownChange = (name) => {
    console.log("Selected Name:", name);
    setParty(name);
    // setSelectedName(name);
  };
  const partyCheck = () => {
    if (party === "") {
      ErrorAlert({ text: "PLEASE SELECT PARTY FIRST!!!", timer: 1500 });
      return;
    }
  };
  const callData = async (name) => {
    setwardName(name);
  };
  const realCall = async () => {
    try {
      const response = await axios.get(
        `${url}/ipdwardcharges?party=${party}&wardName=${wardName}`,
        { withCredentials: true }
      );
      console.log("response of ward charges", response.data);
      setWardCharges(response.data.data);
      if (response.data._id) {
        setWardCharges_id(response.data._id);
      }
    } catch (error) {
      console.log("error of ward charges", error);
    }
  };

  const handlerEffect = (value, _id, key, bedId) => {
    try {
      console.log(bedId, _id);
      const newData = wardCharges.map((item, index) => {
        if (item.bedId === bedId) {
          if (key === "charges") {
            return { ...item, bedCharges: +value };
          } else if (key === "status") {
            return { ...item, status: value };
          }
        }

        return item;
      });
      setWardCharges(newData);

      // console.log(newData);
    } catch (error) {}
  };

  const submitHandler = async () => {
    console.log("userData", UserData);
    try {
      const response = await axios.post(
        `${url}/ipdwardcharges`,
        {
          party,
          wardName,
          bedDetails: wardCharges,
          _id: wardCharges_id,
          updateUser: UserData[0].userId,
        },
        { withCredentials: true }
      );
      console.log("response of submit handler", response);
      SuccessAlert({ text: "DATA SAVED SUCCESSFULLY", timer: 1500 });
      setWardCharges([]);
      setWardCharges_id("");
    } catch (error) {
      console.log("Error of submit Handler", error);
      ErrorAlert({ text: error.response.data.message, timer: 1500 });
    }
  };
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
      <CenterHeading title={"Party Wise Ward Charges"} />
      <div className="md:grid md:grid-cols-2">
        <SimpleDropDown
          DropDownLabel={"Party"}
          data={partyDetails}
          onChange={handleDropDownChange}
        />
        <SimpleDropDown
          DropDownLabel={"Ward Name"}
          data={ward.length > 0 ? ward : []}
          onChange={callData}
          onClick={partyCheck}
        />
      </div>
      {/* Charges table */}

      <div className="mt-3 grid grid-cols-3 text-xs justify-items-center ">
        <p>Bed No.</p>
        <p>Charges</p>
        <p>Status</p>
      </div>

      {wardCharges.length > 0 &&
        wardCharges.map((item, index) => (
          <div className="mt-3 grid grid-cols-3 text-xs justify-items-center items-center">
            <p>{item?.bedNumber}</p>
            <p>
              <input
                type="number"
                className="w-24 rounded-xl p-1"
                placeholder="Charges"
                name=""
                value={item?.bedCharges}
                onChange={(e) =>
                  handlerEffect(
                    e.target.value,
                    item._id,
                    "charges",
                    item?.bedId
                  )
                }
                id=""
              />
            </p>
            <p>
              <input
                type="checkbox"
                checked={item?.status}
                name=""
                id=""
                onChange={(e) =>
                  handlerEffect(
                    e.target.checked,
                    item._id,
                    "status",
                    item?.bedId
                  )
                }
              />
            </p>
          </div>
        ))}
      <div className="flex justify-center my-4">
        <SimpleButton title={"Submit"} onClick={submitHandler} />
      </div>
    </div>
  );
};

export default WardCharges;
