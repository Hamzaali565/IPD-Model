import React, { useState } from "react";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import MRModel from "../../../../Components/Modal/MRModal";
import BasicModal from "../../../../Components/Modal/FullScreenModal";
import LabeledInput from "../../../../Components/LabelledInput/LabeledInput";

const RadiologyBooking = () => {
  const [mrInfo, setmrInfo] = useState(null);
  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Radiology Booking"} />
        <div className="flex justify-center space-x-2">
          <BasicModal title={"Select Mr No"} onClick={(e) => setmrInfo(e)} />
          <MRModel title={"Create Mr No"} />
        </div>
      </div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Patient Details"} />
        <div className="flex items-center flex-col space-y-2 md:space-y-0 md:grid md:grid-cols-2 md:gap-y-2 md:justify-items-center ">
          <LabeledInput
            disabled={true}
            label={"Patient Name"}
            placeholder={"Patient Name"}
          />
          <LabeledInput disabled={true} label={"Age"} placeholder={"Age"} />
          <LabeledInput
            disabled={true}
            label={"Cell No"}
            placeholder={"Cell No"}
          />
          <LabeledInput
            disabled={true}
            label={"CNIC No"}
            placeholder={"CNIC No"}
          />
          <LabeledInput
            disabled={true}
            label={"Address"}
            placeholder={"Address"}
          />
          <LabeledInput
            disabled={true}
            label={"Gender"}
            placeholder={"Gender"}
          />
        </div>
        {mrInfo !== null && (
          <p className="flex justify-center text-[12px] mt-4 text-blue-700 font-bold">
            This MR No is created/updated by {mrInfo?.updatedUser} on{" "}
            {mrInfo?.updatedOn}{" "}
          </p>
        )}
      </div>
    </div>
  );
};

export default RadiologyBooking;
