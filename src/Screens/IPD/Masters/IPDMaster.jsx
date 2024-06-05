import React from "react";
import PAgeTitle from "../../../Components/Page Title/PAgeTitle";
import DropSown from "../../../Components/DropDown/DropDown";
import WardCharges from "./Ward Charges/WardCharges";
import ServiceCharges from "./Service Charges/ServiceCharges";

const IPDMaster = () => {
  return (
    <div>
      <PAgeTitle />
      <DropSown />
      {/* <WardCharges /> */}
      <ServiceCharges />
    </div>
  );
};

export default IPDMaster;
