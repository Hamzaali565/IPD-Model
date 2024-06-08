import React from "react";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import LabelledDropInput from "../../../../Components/LabelledDropInput/LabelledDropInput";
import AgeInput from "../../../../Components/Age Input/AgeInput";
import SimpleDropDown from "../../../../Components/SimpleDropdown/SimpleDropDown";
import LabelledDropDown from "../../../../Components/LabelledDropDown/LabelledDropDown";
import LabeledInput from "../../../../Components/LabelledInput/LabeledInput";

const PatientRegistration = () => {
  const patientType = [
    { name: "--" },
    { name: "Mr." },
    { name: "Mrs." },
    { name: "Miss" },
    { name: "Dr." },
    { name: "Prof" },
    { name: "Master" },
    { name: "Baby of" },
  ];
  const fatherType = [
    { name: "--" },
    { name: "S/o" },
    { name: "D/o" },
    { name: "W/o" },
    { name: "C/o" },
  ];
  const maritalStatus = [
    { name: "--" },
    { name: "Single" },
    { name: "Married" },
    { name: "Widow" },
  ];
  const gender = [{ name: "Male" }, { name: "Female" }];
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
      <CenterHeading title={"Patient Registration"} />
      {/* Patien profile */}
      <div className="container mx-auto">
        <div className="grid gap-y-2 md:grid md:grid-cols-2 md:h-auto md:justify-items-center md:gap-y-3">
          <LabelledDropInput
            label={"Patient Name"}
            data={patientType}
            placeholder={"Patient Name"}
          />
          <AgeInput />
          <LabelledDropInput
            label={"Relative Name"}
            data={fatherType}
            placeholder={"Relative Name"}
          />
          <LabelledDropDown label={"Gender"} data={gender} />
          <LabeledInput label={"Occupation"} placeholder={"Occupation"} />
          <LabelledDropDown label={"Marital Status"} data={maritalStatus} />
          <LabeledInput label={"Email"} type={"email"} placeholder={"Email"} />
          <LabeledInput
            label={"Cell No"}
            type={"number"}
            placeholder={"00000000000"}
            max={"11"}
          />
          <LabeledInput
            label={"CNIC No"}
            type={"number"}
            placeholder={"00000-0000000-0"}
          />
          <LabeledInput label={"Address"} placeholder={"Address"} />
        </div>
      </div>
    </div>
  );
};

export default PatientRegistration;
