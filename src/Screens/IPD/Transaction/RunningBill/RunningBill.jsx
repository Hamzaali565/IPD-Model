import React, { useState } from "react";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import LabeledInput from "../../../../Components/LabelledInput/LabeledInput";
import ButtonDis from "../../../../Components/Button/ButtonDis";
import AdmissionModal from "../../../../Components/Modal/AdmissionModal";
import { useSelector } from "react-redux";
import axios from "axios";

const RunningBill = () => {
  const [runningData, setRunningData] = useState([]);

  const url = useSelector((item) => item?.url);

  const getData = async (e) => {
    try {
      const response = await axios.get(
        `${url}/runningbill?admissionNo=${e?.admissionNo}&mrNo=${e?.mrNo}`,
        { withCredentials: true }
      );
      console.log(response.data);
      setRunningData(response.data.data);
    } catch (error) {
      console.log("Error of Get Data", error);
    }
  };
  const checkArray = () => {
    console.log("setRunningData", runningData);
    console.log("setRunningData", runningData.patientData.length);
  };
  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Running Bill"} />
        <div className="flex justify-center">
          <AdmissionModal title={"Select Admission No"} onClick={getData} />
        </div>
        {runningData?.patientData?.length > 0 && (
          <div className="md:grid md:grid-cols-2">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
              <CenterHeading title={"Patient Details"} />
              <div className="flex flex-col items-center space-y-2 mt-2">
                <LabeledInput
                  label={"Patinet Name"}
                  disabled={true}
                  placeholder={"Patinet Name"}
                  value={`${runningData?.patientData[0]?.patientType} ${runningData?.patientData[0]?.patientName} ${runningData?.patientData[0]?.relativeType} ${runningData?.patientData[0]?.relativeName}`}
                />
                <LabeledInput
                  label={"Age"}
                  disabled={true}
                  placeholder={"Age"}
                  value={`${runningData?.patientData[0]?.ageYear}`}
                />
                <LabeledInput
                  label={"Gender"}
                  disabled={true}
                  placeholder={"Gender"}
                  value={runningData?.patientData[0]?.gender}
                />
                <LabeledInput
                  label={"MrNo"}
                  disabled={true}
                  placeholder={"Mr No"}
                  value={runningData?.patientData[0]?.MrNo}
                />
                <LabeledInput
                  label={"Admission No"}
                  disabled={true}
                  placeholder={"Admission No"}
                  value={runningData?.activeWard[0]?.admissionNo}
                />
                <LabeledInput
                  label={"Party Name"}
                  disabled={true}
                  placeholder={"Party Name"}
                  value={runningData?.activeParty[0]?.party}
                />
              </div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
              <CenterHeading title={"Service Details"} />
              <div className="flex items-center space-y-2 flex-col mt-2">
                <LabeledInput
                  disabled={true}
                  placeholder={"Service Charges"}
                  label={"Service Charges"}
                />
                <LabeledInput
                  disabled={true}
                  placeholder={"Ward Charges"}
                  label={"Ward Charges"}
                />
                <LabeledInput
                  disabled={true}
                  placeholder={"Procedure Charges"}
                  label={"Procedure Charges"}
                />
                <LabeledInput
                  disabled={true}
                  placeholder={"Consultant Visit Charges"}
                  label={"Consultant Visit Charges"}
                />
              </div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
              <CenterHeading title={"Medicine/Labs/Radiology Details"} />
              <div className="flex items-center flex-col space-y-2 mt-2">
                <LabeledInput
                  placeholder={"Medicine Charges"}
                  label={"Medicine Charges"}
                  disabled={true}
                />
                <LabeledInput
                  placeholder={"Laboratory Charges"}
                  label={"Laboratory Charges"}
                  disabled={true}
                />
                <LabeledInput
                  placeholder={"Radiology Charges"}
                  label={"Radiology Charges"}
                  disabled={true}
                />
              </div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
              <CenterHeading title={"Cash Details"} />
              <div className="flex items-center flex-col space-y-2 mt-2">
                <LabeledInput
                  placeholder={"Total Amount"}
                  label={"Total Amount"}
                  disabled={true}
                />
                <LabeledInput
                  placeholder={"Deposit Amount"}
                  label={"Deposit Amount"}
                  disabled={true}
                />
                <LabeledInput
                  placeholder={"Recievable Amount"}
                  label={"Recievable Amount"}
                  disabled={true}
                />
                <LabeledInput
                  placeholder={"Refunded Amount"}
                  label={"Refunded Amount"}
                  disabled={true}
                />
              </div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl md:col-span-2">
              <div className="flex flex-col items-center space-y-2 md:flex-row justify-center space-x-2">
                <ButtonDis title={"Save"} onClick={checkArray} />
                <ButtonDis title={"Print"} />
                <ButtonDis title={"Refresh"} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RunningBill;
