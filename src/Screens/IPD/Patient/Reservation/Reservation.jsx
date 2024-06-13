import React from "react";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import ReactSelect from "../../../../Components/React Select/ReactSelect";
import FullScreenModal from "../../../../Components/Modal/FullScreenModal";
import LabeledInput from "../../../../Components/LabelledInput/LabeledInput";

const Reservation = () => {
  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Reservation"} />

        <div className="mt-2">
          <div className="flex justify-center">
            <FullScreenModal
              title={"Select MR No."}
              onClick={(e) => {
                console.log(e);
              }}
            />
          </div>

          <div className=" md:flex md:justify-between md:items-center">
            <p className="text-justify">
              Patient Name: Mr. Muhammad Hamza S/o Muhammad Farooq
            </p>
            <p className="text-center">Gender: Male</p>
            <p className="text-center">Cell No.: 03111011484</p>
          </div>
        </div>
      </div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Reservation Period"} />
        <div className=" md:grid md:grid-cols-2 md:justify-items-center">
          <LabeledInput label={"From Date"} type={"date"} />
          <LabeledInput label={"To Date"} type={"date"} />
        </div>
      </div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Advised By"} />
        <div className="flex justify-center">
          <FullScreenModal
            title={"Select Consultant"}
            onClick={(e) => {
              console.log(e);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Reservation;
