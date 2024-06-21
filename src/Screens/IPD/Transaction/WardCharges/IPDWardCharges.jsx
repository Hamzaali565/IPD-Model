import React, { useState } from "react";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import BasicModal from "../../../../Components/Modal/FullScreenModal";
import ConsultantModal from "../../../../Components/Modal/ConsultantModal";
import ButtonDis from "../../../../Components/Button/ButtonDis";
import LabeledInput from "../../../../Components/LabelledInput/LabeledInput";

const IPDWardCharges = () => {
  const [mrInfo, setMrInfo] = useState(null);
  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Room Charges"} />
        <div className="flex justify-center items-center my-4">
          <BasicModal
            title={"Select Admission No."}
            onClick={(e) => setMrInfo(e)}
          />
        </div>
        <div className="md:flex md:justify-center md:space-x-4">
          <p className="text-center">
            <span className="font-bold">Patient Name:</span> Mr. FAIZANUDDIN S/o
            WASIUDDIN
          </p>
          <p className="text-center">
            {" "}
            <span className="font-bold">Admission No:</span> 00003
          </p>
        </div>
      </div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Consultant Visit Details"} />

        <div className="flex flex-col items-center space-y-2 ">
          <LabeledInput
            label={"Ward Name"}
            placeholder={"Ward Name"}
            disabled={true}
          />
          <LabeledInput
            label={"Bed No."}
            placeholder={"Bed No."}
            disabled={true}
          />
          <LabeledInput
            label={"Ward Charges"}
            placeholder={"Ward Charges"}
            disabled={true}
          />

          <LabeledInput label={"Date"} type={"date"} />
          <LabeledInput label={"Remarks"} placeholder={"Remarks"} />
          <ButtonDis title={"Add"} />
        </div>

        <div className="container mx-auto mt-3">
          <div className="mt-3 grid grid-cols-4 text-xs justify-items-center items-center h-16 border border-gray-300">
            <p>Ward Name</p>
            <p>Charges</p>
            <p>Date</p>
            <p>Delete</p>
          </div>
        </div>
        <div className="container mx-auto mt-3">
          <div className="mt-3 grid grid-cols-4 text-xs justify-items-center items-center h-10 border border-gray-300">
            <p>Male General Ward</p>
            <p>20000</p>
            <p>20/10/2024</p>
            <p>Added</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IPDWardCharges;
