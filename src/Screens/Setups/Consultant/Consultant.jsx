import React from "react";
import CenterHeading from "../../../Components/Center Heading/CenterHeading";
import SimpleInput from "../../../Components/SimpleInput/SimpleInput";
import LabeledInput from "../../../Components/LabelledInput/LabeledInput";
import ButtonDis from "../../../Components/Button/ButtonDis";

const Consultant = () => {
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
      <CenterHeading title={"Consultant"} />
      <div className="flex flex-col items-center space-y-2 mt-3 md:grid md:grid-cols-2 md:justify-items-center md:gap-y-2">
        <LabeledInput label={"Name"} placeholder={"Please Enter Name"} />
        <LabeledInput label={"Speciality"} placeholder={"Speciality"} />
        <LabeledInput label={"PMDC"} placeholder={"PMDC"} />
        <LabeledInput label={"Address"} placeholder={"Address"} />
        <LabeledInput label={"Email"} placeholder={"Email"} />
        <LabeledInput label={"CNIC"} placeholder={"CNIC"} />
        <LabeledInput label={"Phone"} placeholder={"Phone"} />
      </div>
      <div className="flex flex-col mt-4 items-center space-y-2 md:flex-row md:justify-center md:space-y-0 md:space-x-2">
        <ButtonDis title={"Save"} />
        <ButtonDis title={"Refresh"} />
      </div>
    </div>
  );
};

export default Consultant;
