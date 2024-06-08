import React, { useEffect, useState } from "react";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import LabelledDropInput from "../../../../Components/LabelledDropInput/LabelledDropInput";
import AgeInput from "../../../../Components/Age Input/AgeInput";
import SimpleDropDown from "../../../../Components/SimpleDropdown/SimpleDropDown";
import LabelledDropDown from "../../../../Components/LabelledDropDown/LabelledDropDown";
import LabeledInput from "../../../../Components/LabelledInput/LabeledInput";
import SimpleButton from "../../../../Components/Button/SimpleButton";

const PatientRegistration = () => {
  const [patientName, setPatientName] = useState("");
  const [patientType, setPatientType] = useState([]);
  const [patientStatus, setParientStatus] = useState("");
  const [relativeName, setRelativeName] = useState("");
  const [fatherType, setFatherType] = useState([]);
  const [maritalStatus, setMaritalStatus] = useState([]);
  const [gender, setGender] = useState([]);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [occupation, setOccupation] = useState("");
  const [email, setEmail] = useState("");
  const [cellNo, setCellNo] = useState("");
  const [cnic, setCnic] = useState("");
  const [address, setAddress] = useState("");
  const [kinName, setKinName] = useState("");
  const [kinRelation, setKinRelation] = useState("");
  const [kinCell, setKinCell] = useState("");
  const [kinCnic, setKinCnic] = useState("");
  const [kinAddress, setKinAddress] = useState("");
  const [kinOccupation, setKinOccupation] = useState("");
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setPatientType([
      { name: "--" },
      { name: "Mr." },
      { name: "Mrs." },
      { name: "Miss" },
      { name: "Dr." },
      { name: "Prof" },
      { name: "Master" },
      { name: "Baby of" },
    ]);

    setFatherType([
      { name: "--" },
      { name: "S/o" },
      { name: "D/o" },
      { name: "W/o" },
      { name: "C/o" },
    ]);
    setMaritalStatus([
      { name: "--" },
      { name: "Single" },
      { name: "Married" },
      { name: "Widow" },
    ]);
    setGender([{ name: "--" }, { name: "Male" }, { name: "Female" }]);
  }, [toggle]);

  //   Functions
  const patientNameF = async (name, key) => {
    if (key === "patientName") {
      setPatientName(name.toUpperCase());
      return;
    }
    if (key === "Relative") {
      setRelativeName(name.toUpperCase());
      return;
    }
    if (key === "y") {
      setYear(name);
      return;
    }
    if (key === "m") {
      setMonth(name);
      return;
    }
    if (key === "d") {
      setDay(name);
      return;
    }
  };

  const Refresh = () => {
    setPatientName("");
    setPatientType([]);
    setRelativeName("");
    setYear("");
    setDay("");
    setMonth("");
    setFatherType([]);
    setMaritalStatus([]);
    setGender([]);
    setOccupation("");
    setEmail("");
    setCellNo("");
    setCnic("");
    setAddress("");
    setKinName("");
    setKinAddress("");
    setKinCell("");
    setKinCnic("");
    setKinOccupation("");
    setKinRelation("");
    setToggle(!toggle);
  };

  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Patient Registration"} />
        {/* Patien profile */}
        <div className="container mx-auto">
          <div className="grid gap-y-2 md:grid md:grid-cols-2 md:h-auto md:justify-items-center md:gap-y-3">
            <LabelledDropInput
              label={"Patient Name"}
              data={patientType}
              placeholder={"Patient Name"}
              onChangeDrop={(name) => setParientStatus(name)}
              value={patientName}
              onChange={(e) => {
                patientNameF(e.target.value, "patientName");
              }}
            />
            <AgeInput
              valueY={year}
              valueM={month}
              valueD={day}
              onChangeY={(e) => {
                patientNameF(e.target.value, "y");
              }}
              onChangeM={(e) => {
                patientNameF(e.target.value, "m");
              }}
              onChangeD={(e) => {
                patientNameF(e.target.value, "d");
              }}
            />
            <LabelledDropInput
              label={"Relative Name"}
              data={
                patientStatus.length !== ""
                  ? patientStatus === "Mr." ||
                    patientStatus === "Dr." ||
                    patientStatus === "Prof" ||
                    patientStatus === "Master"
                    ? [{ name: "S/o" }]
                    : patientStatus === "Miss" || patientStatus === "Baby of"
                    ? [{ name: "D/o" }]
                    : patientStatus === "Mrs."
                    ? [{ name: "W/o" }]
                    : fatherType
                  : fatherType
              }
              onChangeDrop={(name) => console.log(name)}
              value={relativeName}
              placeholder={"Relative Name"}
              onChange={(e) => {
                patientNameF(e.target.value, "Relative");
              }}
            />
            <LabelledDropDown
              label={"Gender"}
              data={gender}
              onChange={(name) => console.log(name)}
            />
            <LabeledInput
              label={"Occupation"}
              placeholder={"Occupation"}
              onChange={(e) => setOccupation(e.target.value)}
              value={occupation}
            />
            <LabelledDropDown
              label={"Marital Status"}
              data={maritalStatus}
              onChange={(name) => console.log(name)}
            />
            <LabeledInput
              label={"Email"}
              type={"email"}
              placeholder={"Email"}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <LabeledInput
              label={"Cell No"}
              type={"number"}
              placeholder={"00000000000"}
              max={"11"}
              onChange={(e) => setCellNo(e.target.value)}
              value={cellNo}
            />
            <LabeledInput
              label={"CNIC No"}
              type={"number"}
              placeholder={"00000-0000000-0"}
              onChange={(e) => setCnic(e.target.value)}
              value={cnic}
            />
            <LabeledInput
              label={"Address"}
              placeholder={"Address"}
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
          </div>
        </div>
      </div>

      {/* kin */}

      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Next of  Kin"} />
        {/* kin profile */}
        <div className="container mx-auto">
          <div className="grid gap-y-2 md:grid md:grid-cols-2 md:h-auto md:justify-items-center md:gap-y-3">
            <LabeledInput
              label={"Name"}
              placeholder={"Next of kin name"}
              onChange={(e) => setKinName(e.target.value)}
              value={kinName}
            />
            <LabeledInput
              label={"Relation with patient"}
              type={"text"}
              placeholder={"Relation with patient"}
              onChange={(e) => setKinRelation(e.target.value)}
              value={kinRelation}
            />
            <LabeledInput
              label={"Cell No"}
              type={"number"}
              placeholder={"00000000000"}
              max={"11"}
              onChange={(e) => setKinCell(e.target.value)}
              value={kinCell}
            />
            <LabeledInput
              label={"CNIC No"}
              type={"number"}
              placeholder={"00000-0000000-0"}
              onChange={(e) => setKinCnic(e.target.value)}
              value={kinCnic}
            />
            <LabeledInput
              label={"Address"}
              placeholder={"Address"}
              onChange={(e) => setKinAddress(e.target.value)}
              value={kinAddress}
            />
            <LabeledInput
              label={"Occupation"}
              type={"text"}
              placeholder={"Occupation"}
              onChange={(e) => setKinOccupation(e.target.value)}
              value={kinOccupation}
            />
          </div>
        </div>
      </div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl grid grid-cols-[5rem,5rem,5rem] justify-center gap-x-2">
        <SimpleButton title={"Save"} onClick={Refresh} />
        <SimpleButton title={"Print"} />
        <SimpleButton title={"Refresh"} />
      </div>
    </div>
  );
};

export default PatientRegistration;
