import React from "react";
import CenterHeading from "../../../Components/Center Heading/CenterHeading";
import LabeledInput from "../../../Components/LabelledInput/LabeledInput";
import ButtonDis from "../../../Components/Button/ButtonDis";

const ParentParty = () => {
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
      <CenterHeading title={"Parent Service Name"} />
      <div className="flex flex-col items-center space-y-2">
        <LabeledInput
          label={"Parent Service Name"}
          placeholder={"Enter Parent Service Name"}
        />
        <div className="flex justify-center space-x-2">
          <ButtonDis title={"Save"} />
          <ButtonDis title={"Refresh"} />
        </div>
      </div>
    </div>
  );
};

export default ParentParty;
