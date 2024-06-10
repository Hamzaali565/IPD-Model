import React, { useEffect, useState } from "react";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import LabelledDropInput from "../../../../Components/LabelledDropInput/LabelledDropInput";
import AgeInput from "../../../../Components/Age Input/AgeInput";
import LabelledDropDown from "../../../../Components/LabelledDropDown/LabelledDropDown";
import LabeledInput from "../../../../Components/LabelledInput/LabeledInput";
import SimpleButton from "../../../../Components/Button/SimpleButton";
import { ErrorAlert, SuccessAlert } from "../../../../Components/Alert/Alert";
import axios from "axios";
import { useSelector } from "react-redux";
import InputButton from "../../../../Components/InputButton/InputButton";

const PatientRegistration = () => {
  const [patientName, setPatientName] = useState("");
  const [patientType, setPatientType] = useState([]);
  const [patientStatus, setParientStatus] = useState("");
  const [relativeName, setRelativeName] = useState("");
  const [relativeStatus, setRelativeStatus] = useState("");
  const [fatherType, setFatherType] = useState([]);
  const [maritalStatus, setMaritalStatus] = useState([]);
  const [maritalData, setMaritalData] = useState("");
  const [gender, setGender] = useState([]);
  const [gendarData, setGenderData] = useState("");
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
  const [MrNo, setMrNo] = useState("");
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

  const url = useSelector((item) => item.url);
  const userData = useSelector((item) => item.response);

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
    setParientStatus("");
    setMrNo("");
    setToggle(!toggle);
  };

  const DropDownChange = (name) => {
    setParientStatus(name);
    if (
      name === "Mr." ||
      name === "Dr." ||
      name === "Prof" ||
      name === "Master"
    ) {
      setRelativeStatus("S/o");
      setGenderData("Male");
      setMaritalData("Single");
      return;
    } else if (name === "Mrs.") {
      setRelativeStatus("W/o");
      setGenderData("Female");
      setMaritalData("Married");
      return;
    } else if (name === "Miss") {
      setRelativeStatus("D/o");
      setGenderData("Female");
      setMaritalData("Single");
      return;
    }
  };

  // api
  const submitHandler = async () => {
    try {
      const response = await axios.post(
        `${url}/patientreg`,
        {
          patientType: patientStatus,
          MrNo,
          patientName,
          ageYear: year,
          ageDay: day,
          ageMonth: month,
          relativeType: relativeStatus,
          relativeName,
          gender: gendarData,
          occupation,
          maritalStatus: maritalData,
          email,
          cellNo,
          cnicNo: cnic,
          address,
          kinName,
          kinRelation,
          kinCell,
          kinCnic,
          kinAddress,
          kinOccupation,
          updatedUser: userData[0].userId,
        },
        { withCredentials: true }
      );
      console.log("response of Submit Handler", response);
      Refresh();
      if (response.data.data1) {
        SuccessAlert({ text: "DATA UPDATED SUCCESSFULLY", timer: 2000 });
        return;
      }
      SuccessAlert({
        text: `Data Created Successfully WITH MR NO. ${response.data.data.MrNo} `,
        timer: 2000,
      });
    } catch (error) {
      console.log("Error of submit handler", error);
      ErrorAlert({ text: error.response.data.message });
    }
  };

  const getPatient = async () => {
    try {
      const response = await axios.get(`${url}/patientreg?MrNo=${MrNo}`, {
        withCredentials: true,
      });
      console.log("response of getPatient", response);
    } catch (error) {
      console.log("Error of getPatient", error);
      ErrorAlert({ text: error.response.data.message, timer: 2000 });
    }
  };
  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Patient Registration"} />

        <InputButton
          placeholder={"ENTER MR NO."}
          onChange={(e) => setMrNo(e.target.value)}
          value={MrNo}
          onClick={getPatient}
          type={"number"}
        />
        {/* Patien profile */}
        <div className="container mx-auto">
          <div className="grid gap-y-2 md:grid md:grid-cols-2 md:h-auto md:justify-items-center md:gap-y-3">
            <LabelledDropInput
              label={"Patient Name"}
              data={patientType}
              placeholder={"Patient Name"}
              onChangeDrop={DropDownChange}
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
                    : patientStatus === "Miss"
                    ? [{ name: "D/o" }]
                    : patientStatus === "Mrs."
                    ? [{ name: "W/o" }]
                    : fatherType
                  : fatherType
              }
              onChangeDrop={(name) => setRelativeStatus(name)}
              value={relativeName}
              placeholder={"Relative Name"}
              onChange={(e) => {
                patientNameF(e.target.value, "Relative");
              }}
            />
            <LabelledDropDown
              label={"Gender"}
              data={
                patientStatus !== ""
                  ? patientStatus === "Mr." ||
                    patientStatus === "Dr." ||
                    patientStatus === "Prof" ||
                    patientStatus === "Master"
                    ? [{ name: "Male" }]
                    : patientStatus === "Miss" || patientStatus === "Mrs."
                    ? [{ name: "Female" }]
                    : gender
                  : gender
              }
              onChange={(name) => setGenderData(name)}
            />
            <LabeledInput
              label={"Occupation"}
              placeholder={"Occupation"}
              onChange={(e) => setOccupation(e.target.value)}
              value={occupation}
            />
            <LabelledDropDown
              label={"Marital Status"}
              data={
                patientStatus !== ""
                  ? patientStatus === "Mr." ||
                    patientStatus === "Dr." ||
                    patientStatus === "Prof" ||
                    patientStatus === "Miss" ||
                    patientStatus === "Master" ||
                    patientStatus === "Baby of"
                    ? [{ name: "Single" }]
                    : patientStatus === "Mrs."
                    ? [{ name: "Married" }]
                    : gender
                  : gender
              }
              onChange={(name) => setMaritalData(name)}
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
              placeholder={"0000000000000"}
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
        <SimpleButton title={"Save"} onClick={submitHandler} />
        <SimpleButton title={"Print"} />
        <SimpleButton title={"Refresh"} onClick={Refresh} />
      </div>
    </div>
  );
};

export default PatientRegistration;
