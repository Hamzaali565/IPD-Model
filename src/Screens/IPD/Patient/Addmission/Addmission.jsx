import React, { useEffect, useState } from "react";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import MRModel from "../../../../Components/Modal/MRModal";
import BasicModal from "../../../../Components/Modal/FullScreenModal";
import SimpleDropDown from "../../../../Components/SimpleDropdown/SimpleDropDown";
import ConsultantModal from "../../../../Components/Modal/ConsultantModal";
import LabeledInput from "../../../../Components/LabelledInput/LabeledInput";
import PartyModal from "../../../../Components/Modal/PartyModal";
import ReservationModal from "../../../../Components/Modal/ReservationModal";
import axios from "axios";
import { useSelector } from "react-redux";
import ButtonDis from "../../../../Components/Button/ButtonDis";

const Addmission = () => {
  const [admissionType, setAdmissionType] = useState("");
  const [ADType, setADType] = useState([]);
  const [ward, setWard] = useState([]);
  const [bed, setBed] = useState([]);
  const [mrInfo, setMrInfo] = useState(null);
  const [party, setParty] = useState(null);
  const [consultant, setConsultant] = useState(null);

  const url = useSelector((state) => state.url);

  const typeData = [
    { name: "--" },
    { name: "Direct" },
    { name: "From Reservation" },
  ];
  useEffect(() => {
    setADType(typeData);
    wardNames();
  }, []);

  // function
  const pickMr = (name) => {
    console.log(name);
    setMrInfo(name);
  };

  const pickParty = (name) => {
    console.log(name);
    setParty(name);
  };
  const pickConsultant = (name) => {
    console.log(name);
    setConsultant(name);
  };
  //   api
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

  const bedName = async (name) => {
    try {
      const response = await axios.get(
        `${url}/ipdadmissionbed?wardName=${name}`,
        { withCredentials: true }
      );
      setBed(response.data.data);
      console.log("response of bedName", response.data.data);
    } catch (error) {
      console.log("Error of bedName", error);
    }
  };
  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Admission"} />

        <div className="flex flex-col items-center ">
          <SimpleDropDown
            DropDownLabel={"Select Admission Type"}
            data={ADType}
            onChange={(e) => setAdmissionType(e)}
          />

          {admissionType === "Direct" ? (
            <div>
              <BasicModal title={"Select MR No."} onClick={pickMr} />
              <MRModel title={"Create MR No."} onClick={pickMr} />
            </div>
          ) : admissionType === "From Reservation" ? (
            <ReservationModal
              title={"Select Reservation No."}
              onClick={pickMr}
            />
          ) : null}
        </div>
      </div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl md:grid md:grid-cols-2">
        {/* ward Detaild */}
        <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
          <CenterHeading title={"Admitted In"} />
          <div className="flex flex-col items-center">
            <PartyModal title={"Select Party"} onClick={pickParty} />
            <SimpleDropDown
              DropDownLabel={"Select Ward"}
              onChange={(e) => bedName(e)}
              data={ward.length > 0 ? ward : ""}
            />
            <SimpleDropDown
              DropDownLabel={"Select Bed"}
              data={bed.length > 0 ? bed : []}
            />
            <ConsultantModal
              title={"Select Consultant"}
              onClick={pickConsultant}
            />
          </div>
        </div>
        {/* Patient Details */}
        <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
          <CenterHeading title={"Patient Info"} />
          <div className="flex flex-col items-center space-y-2">
            <LabeledInput
              label={"Patient Name"}
              disabled={true}
              value={
                mrInfo !== null
                  ? `${mrInfo.patientType} ${mrInfo.patientName}  ${mrInfo.relativeType} ${mrInfo.relativeName}`
                  : ""
              }
            />
            <LabeledInput
              label={"Age"}
              disabled={true}
              value={mrInfo !== null ? `${mrInfo?.ageYear} Y ` : ""}
            />
            <LabeledInput
              label={"Gender"}
              disabled={true}
              value={mrInfo !== null ? mrInfo?.gender : ""}
            />
            <LabeledInput
              label={"Cell No."}
              disabled={true}
              value={mrInfo !== null ? mrInfo?.cellNo : ""}
            />
            <LabeledInput
              label={"Party"}
              disabled={true}
              value={party !== null ? party?.name : ""}
            />
            <LabeledInput
              label={"Consultant"}
              disabled={true}
              value={consultant !== null ? consultant?.name : ""}
            />
          </div>
        </div>
      </div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl flex justify-center space-x-2">
        <ButtonDis title={"Save"} />
        <ButtonDis title={"Refresh"} />
      </div>
    </div>
  );
};

export default Addmission;
