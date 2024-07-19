import React, { useEffect, useState } from "react";
import CenterHeading from "../../../Components/Center Heading/CenterHeading";
import LabeledInput from "../../../Components/LabelledInput/LabeledInput";
import ButtonDis from "../../../Components/Button/ButtonDis";
import SimpleDropDown from "../../../Components/SimpleDropdown/SimpleDropDown";
import axios from "axios";
import { ErrorAlert, SuccessAlert } from "../../../Components/Alert/Alert";
import Loader from "../../../Components/Modal/Loader";
import { useSelector } from "react-redux";

const PartyName = () => {
  const [parentData, setParentData] = useState([]);
  const [open, setOpen] = useState(false);
  const [parent, setParent] = useState("");
  const [name, setName] = useState("");

  const url = useSelector((item) => item.url);
  const userData = useSelector((item) => item?.response);

  useEffect(() => {
    getParents();
  }, []);

  const resetData = () => {
    setParent("");
    setName("");
    setParentData([]);
    getParents();
  };

  const getParents = async () => {
    try {
      const response = await axios.get(`${url}/partyparent`, {
        withCredentials: true,
      });
      setParentData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log("Error of getData", error);
    }
  };

  const submitHandler = async () => {
    setOpen(true);
    try {
      if (!parent || parent === "--")
        throw new Error("PLEASE SELECT PARENT NAME!!!");
      const response = await axios.post(
        `${url}/partyname`,
        { name, parent, createdUser: userData[0].userId },
        { withCredentials: true }
      );
      SuccessAlert({ text: "PARTY CREATED SUCCESSFULLY !!!", timer: 2000 });
      setOpen(false);
      resetData();
    } catch (error) {
      console.log("Error of submit handler", error);
      ErrorAlert({ text: error.message });
      setOpen(false);
    }
  };

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
      <CenterHeading title={"Party Name"} />
      <div className="flex flex-col items-center space-y-2">
        <SimpleDropDown
          DropDownLabel={"Select Parent"}
          data={(parentData && parentData) || []}
          onChange={(e) => setParent(e)}
        />
        <LabeledInput
          label={"Party Name"}
          placeholder={"Enter Party Service Name"}
          value={name}
          onChange={(e) => setName(e.target.value.toUpperCase())}
        />
        <div className="flex justify-center space-x-2">
          <ButtonDis title={"Save"} onClick={submitHandler} />
          <ButtonDis title={"Refresh"} onClick={resetData} />
        </div>
      </div>
      <Loader onClick={open} title={"Please Wait..."} />
    </div>
  );
};

export default PartyName;
