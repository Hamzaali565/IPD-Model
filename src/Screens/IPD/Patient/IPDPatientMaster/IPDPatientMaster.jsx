import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import PAgeTitle from "../../../../Components/Page Title/PAgeTitle";
import DropDown from "../../../../Components/DropDown/DropDown";

const IPDPatientMaster = () => {
  const data = [
    { name: "--" },
    { name: "Patient Registration" },
    { name: "Reservation" },
    { name: "Addmission" },
    { name: "Bed Allocation" },
    { name: "New Born Baby" },
  ];

  let navigate = useNavigate();

  const navigates = (name) => {
    console.log("navi", name);
    let path;
    if (name === "Patient Registration") {
      path = "patientRegistration"; // Relative path
      navigate(path);
    }
    // else if (name === "Service Charges") {
    //   path = "servicecharges"; // Relative path
    //   navigate(path);
    // }
  };

  return (
    <div>
      <DropDown data={data} onChange={navigates} />
      <Outlet />
    </div>
  );
};

export default IPDPatientMaster;
