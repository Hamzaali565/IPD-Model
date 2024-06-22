import React, { useState } from "react";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import BasicModal from "../../../../Components/Modal/FullScreenModal";
import ConsultantModal from "../../../../Components/Modal/ConsultantModal";
import LabeledInput from "../../../../Components/LabelledInput/LabeledInput";
import ButtonDis from "../../../../Components/Button/ButtonDis";
import AdmissionModal from "../../../../Components/Modal/AdmissionModal";
import { useSelector } from "react-redux";
import axios from "axios";
import { ErrorAlert } from "../../../../Components/Alert/Alert";

const ConsultantVisit = () => {
  const [mrInfo, setMrInfo] = useState(null);
  const [consultant, setConsultant] = useState(null);
  const [visiDetails, setVisistDetails] = useState([]);
  const [date, setDate] = useState("");
  const [remarks, setRemarks] = useState("");

  const url = useSelector((state) => state.url);
  const userId = useSelector((state) => state.response);

  const checkItOut = async (data) => {
    try {
      setConsultant(data);
      if (mrInfo === null) {
        ErrorAlert({
          text: "PLEASE SELECT ADMISSION NUMBER FIRST!!!",
          timer: 1500,
        });
        return;
      }
      console.log("consultant", consultant);
      const response = await axios.get(
        `${url}/admissionconsultant?admissionNo=${mrInfo.admissionNo}&consultantId=${data?._id}`,
        { withCredentials: true }
      );
      console.log(response.data.data);
      setVisistDetails(response.data.data);
    } catch (error) {
      console.log("Error of CheckItOut", error);
    }
  };

  const updateCharges = (value) => {
    const newData = visiDetails.map((item) => {
      return { ...item, charges: +value };
    });
    setVisistDetails(newData);
  };
  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Consultant Visit"} />
        <div className="flex justify-center items-center my-4">
          <AdmissionModal
            title={"Select Admission No."}
            onClick={(e) => setMrInfo(e)}
          />
        </div>
        {mrInfo !== null && (
          <div className="md:flex md:justify-center md:space-x-4">
            <p className="text-center">
              <span className="font-bold">Patient Name:</span>{" "}
              {mrInfo.patientType} {mrInfo.patientName}
              {mrInfo.relativeType} {mrInfo.relativeName}
            </p>
            <p className="text-center">
              {" "}
              <span className="font-bold">Admission No:</span>{" "}
              {mrInfo?.admissionNo}
            </p>
          </div>
        )}
      </div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Consultant Visit Details"} />

        <div className="flex flex-col items-center space-y-2 ">
          <div className="flex items-center">
            <ConsultantModal
              title={"Select Consultant"}
              onClick={(e) => checkItOut(e)}
            />
            {consultant !== null && <p>{consultant?.name}</p>}
          </div>
          <LabeledInput
            label={"Charges"}
            placeholder={"Consultant Charges"}
            type={"Number"}
            value={visiDetails.length > 0 ? visiDetails[0].charges : ""}
            onChange={(e) => updateCharges(e.target.value)}
          />
          <LabeledInput
            label={"Visit Date"}
            type={"date"}
            onChange={(e) => setDate(e.target.value)}
          />
          <LabeledInput
            label={"Remarks"}
            placeholder={"Remarks"}
            onChange={(e) => setRemarks(e.target.value)}
          />
          <ButtonDis title={"Save"} />
        </div>

        <div className="container mx-auto mt-3">
          <div className="mt-3 grid grid-cols-4 text-xs justify-items-center items-center h-16 border border-gray-300">
            <p>Consultant Name</p>
            <p>Charges</p>
            <p>Date</p>
            <p>Delete</p>
          </div>
        </div>
        <div className="container mx-auto mt-3">
          <div className="mt-3 grid grid-cols-4 text-xs justify-items-center items-center h-10 border border-gray-300">
            <p>Dr. Muhammad Ali Memon</p>
            <p>20000</p>
            <p>20/10/2024</p>
            <p>Added</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultantVisit;
